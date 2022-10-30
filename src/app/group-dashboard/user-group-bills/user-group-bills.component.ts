import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Apollo } from 'apollo-angular'
import * as bootstrap from 'bootstrap'
import { CommonService } from 'src/app/common/common.service'
import { Bill, BillCreateInput } from 'src/gql/gql.inputs'
import { CREATE_BILL, GET_BILLS_FOR_USER_BY_GROUP } from 'src/gql/gql.mutations'

@Component({
	selector: 'app-user-group-bills',
	templateUrl: './user-group-bills.component.html',
	styleUrls: ['./user-group-bills.component.css'],
})
export class UserGroupBillsComponent implements OnInit {
	userBills?: Bill[]
	@Input() currency?: string
	@Output() newBill = new EventEmitter<string>()

	htmAddBilllModal = document.getElementById('addBillModal')
	addBillModal = this.htmAddBilllModal
		? new bootstrap.Modal(this.htmAddBilllModal)
		: null

	bill: BillCreateInput = {
		name: '',
		price: 0,
	}
	constructor(private apollo: Apollo, private Service: CommonService) {}

	getUserBills() {
		this.apollo
			.mutate({
				mutation: GET_BILLS_FOR_USER_BY_GROUP,
			})
			.subscribe(({ data }) => {
				const response = data as { billGetForGroupUser: Bill[] }
				this.userBills = response.billGetForGroupUser
			})
	}

	addNewBill() {
		this.apollo
			.mutate({
				mutation: CREATE_BILL,
				variables: {
					input: this.bill,
				},
			})
			.subscribe(() => {
				window.location.reload()
			})
	}

	ngOnInit(): void {
		this.getUserBills()
	}
}

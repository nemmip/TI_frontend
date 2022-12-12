import { Component, OnInit } from '@angular/core'
import { Apollo } from 'apollo-angular'
import {
	Bill,
	Contact,
	GroupSummary,
	SplitSummary,
	User,
} from 'src/gql/gql.inputs'
import {
	GET_GROUP_SUMMARY,
	GET_USER_CONTACTS,
	SPLIT_GROUP,
} from 'src/gql/gql.mutations'
import * as bootstrap from 'bootstrap'

@Component({
	selector: 'app-group-dashboard',
	templateUrl: './group-dashboard.component.html',
	styleUrls: ['./group-dashboard.component.css'],
})
export class GroupDashboardComponent implements OnInit {
	constructor(private readonly apollo: Apollo) {}
	groupSummary?: GroupSummary
	splitSummary?: SplitSummary[]
	owner?: User
	contacts?: Contact[] = undefined
	membersBills: Bill[] = []
	htmSplitModal = document.getElementById('splitModal')
	splitModal = this.htmSplitModal
		? new bootstrap.Modal(this.htmSplitModal)
		: null

	getUserContacts() {
		this.apollo
			.mutate({
				mutation: GET_USER_CONTACTS,
			})
			.subscribe(({ data }) => {
				const membersUuids = this.groupSummary?.billsSummary.map(
					(bill) => bill.member.uuid
				)

				if (membersUuids) {
					const contactData = data as {
						contactsGetByUser: { savedContacts: Contact[] }
					}
					this.contacts = contactData.contactsGetByUser.savedContacts.filter(
						(contact) => !membersUuids.find((member) => member === contact.uuid)
					)
				}
			})
	}

	getGroupSummary() {
		this.apollo
			.query({
				query: GET_GROUP_SUMMARY,
			})
			.subscribe(({ data }) => {
				const receivedData = data as { partyGroupSummary: GroupSummary }
				this.groupSummary = receivedData.partyGroupSummary
				this.getUserContacts()
			})
	}

	getSplitSummary() {
		this.apollo
			.query({
				query: SPLIT_GROUP,
			})
			.subscribe(({ data }) => {
				const receivedData = data as { splitPartyGroup: SplitSummary[] }
				this.splitSummary = receivedData.splitPartyGroup
				console.log(data)
			})
	}

	makeAbs(num: number) {
		return Math.abs(num).toFixed(2)
	}

	ngOnInit(): void {
		this.getGroupSummary()
		this.getSplitSummary()
	}
}

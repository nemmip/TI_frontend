import { Component, Input } from '@angular/core'
import { BillSummary, GroupSummary } from 'src/gql/gql.inputs'

@Component({
	selector: 'app-group-summary',
	templateUrl: './group-summary.component.html',
	styleUrls: ['./group-summary.component.css'],
})
export class GroupSummaryComponent {
	@Input() groupSummary?: GroupSummary

	getSumOfBills(bills?: BillSummary[]) {
		return bills && bills.length > 0
			? bills.map((bill) => bill.sumOfBills).reduce((prev, next) => prev + next)
			: 0
	}
}

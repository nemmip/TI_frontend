import { Component, Input, OnInit } from '@angular/core'
import { GroupSummary } from 'src/gql/gql.inputs'
import ApexCharts from 'apexcharts'

@Component({
	selector: 'app-group-chart',
	templateUrl: './group-chart.component.html',
	styleUrls: ['./group-chart.component.css'],
})
export class GroupChartComponent implements OnInit {
	@Input() groupSummary?: GroupSummary
	chart?: any

	assignBillsChart() {
		const names = this.groupSummary?.billsSummary?.map(
			(bill) => bill.member.name
		)
		const sums = this.groupSummary?.billsSummary?.map((bill) => bill.sumOfBills)
		console.log(names, sums)
		const options = {
			chart: {
				type: 'pie',
			},
			labels: names,
			series: sums,
		}
		this.chart = new ApexCharts(document.querySelector('#chart'), options)
		this.chart.render()
	}
	ngOnInit(): void {
		this.assignBillsChart()
	}
}

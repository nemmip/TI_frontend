import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupChartComponent } from './group-chart.component'

describe('GroupChartComponent', () => {
	let component: GroupChartComponent
	let fixture: ComponentFixture<GroupChartComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GroupChartComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(GroupChartComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})

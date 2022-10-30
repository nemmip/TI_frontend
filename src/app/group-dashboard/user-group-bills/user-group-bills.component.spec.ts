import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UserGroupBillsComponent } from './user-group-bills.component'

describe('UserGroupBillsComponent', () => {
	let component: UserGroupBillsComponent
	let fixture: ComponentFixture<UserGroupBillsComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserGroupBillsComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(UserGroupBillsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})

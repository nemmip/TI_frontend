import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular'
import * as bootstrap from 'bootstrap'
import { CURRENCY_KEYS } from 'src/gql/gql.enums'
import { Group, GroupLoginInput } from 'src/gql/gql.inputs'
import {
	CREATE_USER_GROUP,
	DELETE_USER_GROUP,
	GET_USER_GROUPS,
	LOGIN_GROUP,
	ME_QUERY,
} from 'src/gql/gql.mutations'

@Component({
	selector: 'app-user-groups',
	templateUrl: './user-groups.component.html',
	styleUrls: ['../login/login.component.css', './user-groups.component.css'],
})
export class UserGroupsComponent implements OnInit {
	userGroups?: Group[] = undefined
	createGroupInput = {
		name: undefined,
		currency: undefined,
	}
	htmlCreateGroupModal = document.getElementById('createNewGroupModal')
	createGroupModal = this.htmlCreateGroupModal
		? new bootstrap.Modal(this.htmlCreateGroupModal)
		: null
	htmlJoinGroupModal = document.getElementById('joinNewGroupModal')
	joinGroupModal = this.htmlJoinGroupModal
		? new bootstrap.Modal(this.htmlJoinGroupModal)
		: null
	currency = CURRENCY_KEYS
	newGroupCode?: string = undefined
	constructor(
		private readonly apollo: Apollo,
		private readonly router: Router
	) {}

	getUserGroups() {
		this.apollo
			.mutate({
				mutation: GET_USER_GROUPS,
			})
			.subscribe(({ data }) => {
				const groups = data as { partyGroupGetForUser: Group[] }
				this.userGroups = groups.partyGroupGetForUser
			})
	}

	createGroup() {
		this.apollo
			.mutate({
				mutation: CREATE_USER_GROUP,
				variables: {
					input: this.createGroupInput,
				},
			})
			.subscribe(() => {
				this.createGroupModal?.hide()
				this.router
					.navigateByUrl('/', { skipLocationChange: true })
					.then(() => {
						this.router.navigate(['/dashboard'])
					})
			})
	}

	deleteGroup(uuid: string) {
		this.apollo
			.mutate({
				mutation: DELETE_USER_GROUP,
				variables: {
					input: uuid,
				},
			})
			.subscribe(() => {
				this.createGroupModal?.hide()
				this.router
					.navigateByUrl('/', { skipLocationChange: true })
					.then(() => {
						this.router.navigate(['/dashboard'])
					})
			})
	}

	joinSavedGroup(code: string) {
		this.apollo
			.query({
				query: ME_QUERY,
			})
			.subscribe(({ data }) => {
				const userData = data as { me: { uuid: string; name: string } }
				const loginGroupInput: GroupLoginInput = {
					uuid: userData.me.uuid,
					name: userData.me.name,
					code,
				}

				this.apollo
					.mutate({
						mutation: LOGIN_GROUP,
						variables: {
							input: loginGroupInput,
						},
					})
					.subscribe(({ data }) => {
						const tokenData = data as { createGroupSession: string }
						localStorage.setItem('authorization', tokenData.createGroupSession)
						setTimeout(() => this.router.navigate(['group-dashboard']), 1000)
					})
			})
	}

	joinNewGroup() {
		this.joinSavedGroup(this.newGroupCode ?? '')
		this.newGroupCode = undefined
	}
	ngOnInit(): void {
		this.getUserGroups()
	}
}

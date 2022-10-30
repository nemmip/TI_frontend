import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular'
import { GroupLoginInput } from 'src/gql/gql.inputs'
import { LOGIN_GROUP } from 'src/gql/gql.mutations'

@Component({
	selector: 'app-join-by-session',
	templateUrl: './join-by-session.component.html',
	styleUrls: ['../login.component.css', './join-by-session.component.css'],
})
export class JoinBySessionComponent {
	constructor(private apollo: Apollo, private router: Router) {}
	loginGroupInput: GroupLoginInput = {
		name: '',
		code: '',
	}
	joinNewGroup() {
		this.apollo
			.mutate({
				mutation: LOGIN_GROUP,
				variables: {
					input: this.loginGroupInput,
				},
			})
			.subscribe(({ data }) => {
				const tokenData = data as { createGroupSession: string }
				localStorage.setItem('authorization', tokenData.createGroupSession)
				setTimeout(() => this.router.navigate(['group-dashboard']), 1000)
			})
	}
}

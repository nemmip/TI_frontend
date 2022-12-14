import { Component } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { AuthLoginInput } from 'src/gql/gql.inputs'
import { LOGIN_WITH_EMAIL_MUTATION } from 'src/gql/gql.mutations'
import { Router } from '@angular/router'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	credentials: AuthLoginInput = {
		email: '',
		password: '',
	}
	token?: string = undefined
	constructor(private apollo: Apollo, private readonly router: Router) {}

	loginWithEmail() {
		this.apollo
			.mutate({
				mutation: LOGIN_WITH_EMAIL_MUTATION,
				variables: {
					input: this.credentials,
				},
			})
			.subscribe(({ data }) => {
				const tokenData = data as { createLoginSession: string }
				localStorage.setItem('authorization', tokenData.createLoginSession)
				setTimeout(() => this.router.navigate(['dashboard']), 2000)
			})
	}
}

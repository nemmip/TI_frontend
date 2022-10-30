import { Component } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { UserCreateInput } from 'src/gql/gql.inputs'
import { CREATE_USER_MUTATION } from 'src/gql/gql.mutations'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['../login/login.component.css', './register.component.css'],
})
export class RegisterComponent {
	isRegistred = false
	registerInput: UserCreateInput = {
		name: '',
		email: '',
		password: '',
	}

	constructor(private apollo: Apollo) {}

	registerUser() {
		this.apollo
			.mutate({
				mutation: CREATE_USER_MUTATION,
				variables: {
					input: this.registerInput,
				},
			})
			.subscribe(({ data }) => console.log(data))
		this.isRegistred = true
	}
}

import { Component, Input } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Contact } from 'src/gql/gql.inputs'
import { ADD_GROUP_MEMBER } from 'src/gql/gql.mutations'
import { Clipboard } from '@angular/cdk/clipboard'
import * as bootstrap from 'bootstrap'

@Component({
	selector: 'app-group-invitation',
	templateUrl: './group-invitation.component.html',
	styleUrls: ['./group-invitation.component.css'],
})
export class GroupInvitationComponent {
	@Input() groupCode?: string
	htmAddContactlModal = document.getElementById('addContactModal')
	addContactModal = this.htmAddContactlModal
		? new bootstrap.Modal(this.htmAddContactlModal)
		: null

	@Input() contacts?: Contact[] = undefined
	contactToAdd?: string = undefined

	constructor(private apollo: Apollo, private clipboard: Clipboard) {}
	copyCode() {
		this.clipboard.copy(this.groupCode ?? '')
	}

	addContact() {
		this.apollo
			.mutate({
				mutation: ADD_GROUP_MEMBER,
				variables: {
					input: { userUuid: this.contactToAdd },
				},
			})
			.subscribe(() => {
				this.contactToAdd = undefined
			})
	}
}

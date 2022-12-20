import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular'
import { Contact } from 'src/gql/gql.inputs'
import {
	ADD_USER_CONTACT,
	DELETE_USER_CONTACT,
	GET_USER_CONTACTS,
} from 'src/gql/gql.mutations'
import * as bootstrap from 'bootstrap'

@Component({
	selector: 'app-saved-contacts',
	templateUrl: './saved-contacts.component.html',
	styleUrls: ['../login/login.component.css', './saved-contacts.component.css'],
})
export class SavedContactsComponent implements OnInit {
	constructor(private apollo: Apollo, private router: Router) {}
	contacts: Contact[] = []
	newContactEmail?: string = undefined
	htmlModal = document.getElementById('addContactModal')
	myModal = this.htmlModal ? new bootstrap.Modal(this.htmlModal) : null
	getContactsForUser() {
		this.apollo
			.mutate({
				mutation: GET_USER_CONTACTS,
			})
			.subscribe(({ data }) => {
				const contactData = data as {
					contactsGetByUser: { savedContacts: Contact[] }
				}
				console.log(contactData)
				this.contacts.push(...contactData.contactsGetByUser.savedContacts)
			})
	}

	removeContact(uuid: string) {
		this.apollo
			.mutate({
				mutation: DELETE_USER_CONTACT,
				variables: {
					input: {
						contactUuid: uuid,
					},
				},
			})
			.subscribe(() => {
				this.getContactsForUser()
				this.router
					.navigateByUrl('/', { skipLocationChange: true })
					.then(() => {
						this.router.navigate(['/dashboard'])
					})
			})
	}

	addContact() {
		this.apollo
			.mutate({
				mutation: ADD_USER_CONTACT,
				variables: {
					input: { contactEmail: this.newContactEmail },
				},
			})
			.subscribe(async () => {
				this.myModal?.hide()
				this.getContactsForUser()
				this.router
					.navigateByUrl('/', { skipLocationChange: true })
					.then(() => {
						this.router.navigate(['/dashboard'])
					})
			})
	}

	ngOnInit(): void {
		this.getContactsForUser()
	}
}

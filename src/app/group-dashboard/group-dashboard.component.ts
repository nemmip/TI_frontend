import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BillCreateInput, Contact, Group, User } from 'src/gql/gql.inputs';
import {
  ADD_GROUP_MEMBER,
  CREATE_BILL,
  GET_GROUP_DETAILS,
  GET_GROUP_MEMBERS,
  GET_USER_CONTACTS,
  ME_QUERY,
} from 'src/gql/gql.mutations';
import { Clipboard } from '@angular/cdk/clipboard';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.css'],
})
export class GroupDashboardComponent implements OnInit {
  constructor(private readonly apollo: Apollo, private clipboard: Clipboard) {}
  owner?: User;
  group?: Group;
  members?: User[] = undefined;
  htmAddContactlModal = document.getElementById('addContactModal');
  addContactModal = this.htmAddContactlModal
    ? new bootstrap.Modal(this.htmAddContactlModal)
    : null;

  contacts?: Contact[] = undefined;
  contactToAdd?: string = undefined;
  htmAddBilllModal = document.getElementById('addBillModal');
  addBillModal = this.htmAddBilllModal
    ? new bootstrap.Modal(this.htmAddBilllModal)
    : null;
  bill: BillCreateInput = {
    name: '',
    price: 0,
  };
  getGroupDetails() {
    this.apollo
      .query({
        query: GET_GROUP_DETAILS,
      })
      .subscribe(({ data }) => {
        const receivedData = data as { partyGroupDetails: Group };
        this.group = receivedData.partyGroupDetails;
      });
  }

  getGroupMembers() {
    this.apollo
      .mutate({
        mutation: GET_GROUP_MEMBERS,
      })
      .subscribe(({ data }) => {
        const received = data as { partyGroupMembers: User[] };
        this.members = received.partyGroupMembers;
        console.log(this.members[0].bills);
      });
  }

  getUserContacts() {
    this.apollo
      .mutate({
        mutation: GET_USER_CONTACTS,
      })
      .subscribe(({ data }) => {
        const membersUuids = this.members?.map((m) => m.uuid);
        const contactData = data as { contactsGetByUser: Contact[] };
        this.contacts = contactData.contactsGetByUser.filter(
          (contact) => !membersUuids?.find((m) => m === contact.uuid)
        );
      });
  }

  copyCode() {
    this.clipboard.copy(this.group?.code ?? '');
  }

  addContact() {
    this.apollo
      .mutate({
        mutation: ADD_GROUP_MEMBER,
        variables: {
          input: this.contactToAdd,
        },
      })
      .subscribe(() => {
        this.contactToAdd = undefined;
        this.ngOnInit();
      });
  }

  addNewBill() {
    this.apollo
      .mutate({
        mutation: CREATE_BILL,
        variables: {
          input: this.bill,
        },
      })
      .subscribe(() => this.ngOnInit());
  }

  resolvePaysOnUser(uuid: string) {
    const member = this.members?.find((m) => m.uuid === uuid);
    const payed = member?.bills
      ?.filter((b) => b.groupUuid === this.group?.uuid)
      .map((b) => b.price);
    return payed?.reduce((a, b) => a + b);
  }

  ngOnInit(): void {
    this.getGroupDetails();
    this.getGroupMembers();
    this.getUserContacts();
  }
}

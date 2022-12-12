import { gql } from 'apollo-angular'

export const LOGIN_WITH_EMAIL_MUTATION = gql`
	mutation createLoginSession($input: AuthLoginInput!) {
		createLoginSession(input: $input)
	}
`

export const REFRESH_USER_SESSION = gql`
	mutation refreshLoginSession($input: String!) {
		refreshLoginSession(input: $input)
	}
`

export const CREATE_USER_MUTATION = gql`
	mutation createRegularUser($input: UserCreateInput!) {
		createRegularUser(input: $input) {
			uuid
		}
	}
`

export const GET_USER_CONTACTS = gql`
	mutation getUserContacts {
		contactsGetByUser {
			savedContacts {
				uuid
				name
			}
		}
	}
`

export const DELETE_USER_CONTACT = gql`
	mutation contactDelete($input: String!) {
		contactDelete(input: $input)
	}
`

export const ADD_USER_CONTACT = gql`
	mutation contactAdd($input: ContactAddInput!) {
		contactAdd(input: $input) {
			uuid
			name
			email
			type
			savedContacts {
				uuid
				contactUuid
			}
		}
	}
`

export const GET_USER_GROUPS = gql`
	mutation getPartyGroupForUser {
		partyGroupGetForUser {
			uuid
			name
			code
		}
	}
`

export const CREATE_USER_GROUP = gql`
	mutation partyGroupCreate($input: PartyGroupCreateInput!) {
		partyGroupCreate(input: $input) {
			uuid
			name
		}
	}
`

export const DELETE_USER_GROUP = gql`
	mutation partyGroupDelete($input: String!) {
		partyGroupDelete(input: $input)
	}
`

export const ME_QUERY = gql`
	query me {
		me {
			uuid
			name
		}
	}
`

export const LOGIN_GROUP = gql`
	mutation createGroupSession($input: GroupLoginInput!) {
		createGroupSession(input: $input)
	}
`

export const GET_GROUP_SUMMARY = gql`
	query partyGroupSummary {
		partyGroupSummary {
			group {
				uuid
				name
				code
				currency
			}
			billsSummary {
				member {
					uuid
					name
				}
				sumOfBills
			}
		}
	}
`

export const ADD_GROUP_MEMBER = gql`
	mutation partyGroupAddUser($input: PartyGroupAddUserInput!) {
		partyGroupAddUser(input: $input) {
			uuid
		}
	}
`

export const CREATE_BILL = gql`
	mutation billCreate($input: BillCreateInput!) {
		billCreate(input: $input) {
			uuid
			name
			price
			payedBy
			groupUuid
		}
	}
`

export const GET_BILLS_FOR_USER_BY_GROUP = gql`
	mutation billGetForGroupUser {
		billGetForGroupUser {
			name
			price
		}
	}
`

export const SPLIT_GROUP = gql`
	query splitPartyGroup {
		splitPartyGroup {
			name
			pay
		}
	}
`

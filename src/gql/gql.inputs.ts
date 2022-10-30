export type AuthLoginInput = {
	email: string
	password: string
}

export type UserCreateInput = {
	email: string
	name: string
	password: string
}

export type Contact = {
	uuid: string
	name: string
}

export type Group = {
	uuid: string
	name: string
	code: string
	currency?: string
}

export type PartyGroupCreateInput = {
	name: string
	currency: string
}

export type GroupLoginInput = {
	uuid?: string
	name: string
	code: string
}

export type User = {
	uuid: string
	name: string
	email: string
	bills?: Bill[]
}

export type BillCreateInput = {
	name: string
	price: number
}

export type Bill = {
	uuid: string
	name: string
	price: number
	payedBy: string
	groupUuid: string
}

export type BillSummary = {
	member: User
	sumOfBills: number
}

export type GroupSummary = {
	group: Group
	billsSummary: BillSummary[]
}

export type SplitSummary = {
	name: string
	pay: number
}

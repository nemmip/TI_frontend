import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { InMemoryCache, ApolloLink } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { setContext } from '@apollo/client/link/context'

const uri = 'http://localhost:3000/graphql' // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink) {
	const basic = setContext((_operation, _context) => ({
		headers: {
			Accept: 'charset=utf-8',
		},
	}))

	const auth = setContext((_operation, _context) => {
		const token = localStorage.getItem('authorization')

		if (token === null) {
			return {}
		} else {
			return {
				headers: {
					authorization: `${token}`,
				},
			}
		}
	})

	const link = ApolloLink.from([basic, auth, httpLink.create({ uri })])
	const cache = new InMemoryCache()

	return {
		link,
		cache,
	}
}

@NgModule({
	exports: [ApolloModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink],
		},
	],
})
export class GraphQLModule {}

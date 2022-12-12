import { ErrorHandler, Injectable, Injector } from '@angular/core'
import { ErrorDisplayComponent } from './error-display/error-display.component'

@Injectable()
export class AppErrorHandler implements ErrorHandler {
	constructor(private readonly injector: Injector) {}

	async handleError(error: any) {
		const errorDisplay = this.injector.get(ErrorDisplayComponent)

		if (error.graphQLErrors) {
			const messages = this.getErrorMessages(error.graphQLErrors)

			messages.forEach((message: any) => {
				errorDisplay.createErrorAlert(message)
			})
		}
	}

	private getErrorMessages(gqlErrors: any) {
		return gqlErrors.flatMap(
			(err: any) => err?.extensions?.response?.message ?? err?.message
		)
	}
}

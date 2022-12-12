import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-error-display',
	templateUrl: './error-display.component.html',
	styleUrls: ['./error-display.component.css'],
})
export class ErrorDisplayComponent implements OnInit {
	// eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
	ngOnInit(): void {}

	createErrorAlert(message: string) {
		const alertPlaceholder = document.getElementById('errorPlaceholder')

		const wrapper = document.createElement('div')
		wrapper.innerHTML = [
			'<div class="fixed-bottom w-25 alert alert-danger alert-dismissible mx-4 fade show" role="alert">',
			`   <div>${message}</div>`,
			'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
			'</div>',
		].join('')

		alertPlaceholder?.append(wrapper)
	}
}

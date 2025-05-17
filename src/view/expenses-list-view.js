import { AbstractComponent } from '../framework/abstract-component.js'

export default class ExpensesListView extends AbstractComponent {
	get template() {
		return `<ul class="expenses-list" id="expenses-list"></ul>`
	}

	get listElement() {
		return this.element
	}
}

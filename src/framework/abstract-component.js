import { createElement } from './render.js'

export class AbstractComponent {
	#element = null

	constructor() {
		if (new.target === AbstractComponent) {
			throw new Error('Ошибка')
		}
	}

	get element() {
		if (!this.#element) {
			this.#element = createElement(this.template)
		}
		return this.#element
	}

	get template() {
		throw new Error('Ошибка')
	}

	removeElement() {
		this.#element = null
	}
}

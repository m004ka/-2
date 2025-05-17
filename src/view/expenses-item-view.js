import { AbstractComponent } from '../framework/abstract-component.js'

export default class ExpenseItemView extends AbstractComponent {
	#expense
	#onDelete
	#onEdit

	constructor(expense, { onDelete, onEdit }) {
		super()
		this.#expense = expense
		this.#onDelete = onDelete
		this.#onEdit = onEdit

		this.element
			.querySelector('.expense-delete-button')
			.addEventListener('click', this.#handleDelete)

		this.element
			.querySelector('.expense-edit-button')
			.addEventListener('click', this.#handleEdit)
	}

	get template() {
		const { place, note, category, amount } = this.#expense

		return `
			<li class="expense-item">
				<h3>${this.#escapeHTML(place)}</h3>
				<p>${this.#escapeHTML(note)}</p>
				<p><strong>Категория:</strong> ${this.#formatCategory(category)}</p>
				<p><strong>Сумма:</strong> ${amount.toFixed(2)} ₽</p>
				<button class="expense-edit-button">Редактировать</button>
				<button class="expense-delete-button">Удалить</button>
			</li>
		`
	}

	#handleDelete = () => {
		this.#onDelete(this.#expense.id)
	}

	#handleEdit = () => {
		this.#onEdit()
	}

	#formatCategory(category) {
		const map = {
			products: 'Продукты',
			transport: 'Транспорт',
			entertainment: 'Развлечения',
			other: 'Прочие расходы',
		}
		return map[category] || 'Не указано'
	}

	#escapeHTML(str) {
		const div = document.createElement('div')
		div.textContent = str
		return div.innerHTML
	}
}

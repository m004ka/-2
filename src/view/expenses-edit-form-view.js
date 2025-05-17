import { AbstractComponent } from '../framework/abstract-component.js'

export default class ExpensesEditFormView extends AbstractComponent {
	#expenses
	#onSubmit

	constructor(expenses, { onSubmit }) {
		super()
		this.#expenses = expenses
		this.#onSubmit = onSubmit
		this.element.addEventListener('submit', this.#handleSubmit)
	}

	get template() {
		const { place, note, category, amount } = this.#expenses

		return `
      <form class="expense-edit-form">
        <input
          type="text"
          name="place"
          value="${place}"
          required
          placeholder="Название"
        />
        <textarea
          name="note"
          rows="2"
          placeholder="Описание"
        >${note || ''}</textarea>

        <input
          type="number"
          name="amount"
          value="${amount}"
          required
          placeholder="Сумма"
          min="0"
          step="0.01"
        />

        <select name="category" required>
          <option value="products" ${category === 'products' ? 'selected' : ''}>Продукты</option>
          <option value="transport" ${category === 'transport' ? 'selected' : ''}>Транспорт</option>
          <option value="entertainment" ${category === 'entertainment' ? 'selected' : ''}>Развлечения</option>
          <option value="other" ${category === 'other' ? 'selected' : ''}>Прочие расходы</option>
        </select>

        <button type="submit">Сохранить</button>
      </form>
    `
	}

	#handleSubmit = (evt) => {
		evt.preventDefault()
		const form = this.element

		const formData = new FormData(form)

		const updatedExpenses = {
			...this.#expenses,
			place: formData.get('place')?.trim() || '',
			note: formData.get('note')?.trim() || '',
			amount: parseFloat(formData.get('amount')) || 0,
			category: formData.get('category') || 'other',
		}

		this.#onSubmit(updatedExpenses)
	}
}

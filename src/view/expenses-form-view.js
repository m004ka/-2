import { AbstractComponent } from '../framework/abstract-component.js'

export default class ExpensesFormView extends AbstractComponent {
	#onSubmit

	constructor({ onSubmit }) {
		super()
		this.#onSubmit = onSubmit

		this.element
			.querySelector('form')
			.addEventListener('submit', this.#handleSubmit)
	}

	get template() {
		return `
      <div class="expense-form">
        <h2>Добавить новую трату</h2>
        <form id="expense-form">
          <label for="expense-place">Место покупки:</label>
          <input type="text" id="expense-place" name="place" placeholder="Название магазина или сервиса" required />

          <label for="expense-note">Описание:</label>
          <textarea id="expense-note" name="note" placeholder="Что куплено / детали" rows="3"></textarea>
          
          <label for="expense-amount">Сумма:</label>
          <input type="number" id="expense-amount" name="amount" required min="0" step="0.01" />

          <fieldset>
            <legend>Категория:</legend>
            <label><input type="radio" name="category" value="products" required /> Продукты</label>
            <label><input type="radio" name="category" value="transport" required /> Транспорт</label>
            <label><input type="radio" name="category" value="entertainment" required /> Развлечения</label>
            <label><input type="radio" name="category" value="other" required /> Прочее</label>
          </fieldset>

          <button type="submit">Добавить трату</button>
        </form>
      </div>
    `
	}

	#handleSubmit = (evt) => {
		evt.preventDefault()

		const form = evt.target

		const expense = {
			id: crypto.randomUUID(),
			place: form.place.value.trim(),
			note: form.note.value.trim(),
			amount: parseFloat(form.amount.value),
			category: form.category.value,
		}

		this.#onSubmit(expense)
		form.reset()
	}
}

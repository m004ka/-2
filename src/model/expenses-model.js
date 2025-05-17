import { expenses as mockExpenses } from '../mock/expenses.js'

export default class ExpenseModel {
	#expenses = [...mockExpenses]
	#filter = { category: '' }

	get expenses() {
		return this.#expenses
	}

	setFilter({ category }) {
		this.#filter = { category }
	}

	getFilteredExpenses() {
		return this.#expenses.filter(expense => {
			const matchCategory = this.#filter.category
				? expense.category === this.#filter.category
				: true

			return matchCategory
		})
	}

	addExpense(expense) {
		this.#expenses.push(expense)
	}

	deleteExpense(id) {
		this.#expenses = this.#expenses.filter(expense => expense.id !== id)
	}

	updateExpense(updatedExpense) {
		this.#expenses = this.#expenses.map(expense =>
			expense.id === updatedExpense.id ? updatedExpense : expense
		)
	}
}

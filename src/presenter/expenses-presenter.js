import ExpenseItemView from '../view/expenses-item-view.js'
import ExpensesListView from '../view/expenses-list-view.js'
import ExpensesFormView from '../view/expenses-form-view.js'
import ExpensesFilterView from '../view/expenses-filter-view.js'
import { render } from '../framework/render.js'
import ExpensesEditFormView from '../view/expenses-edit-form-view.js'

export default class ExpensePresenter {
	#expenseModel
	#container
	#expensesListComponent

	constructor({ container, expenseModel }) {
		this.#expenseModel = expenseModel
		this.#container = container
	}

	init() {
		const formComponent = new ExpensesFormView({
			onSubmit: expense => {
				this.#expenseModel.addExpense(expense)
				this.#renderExpenses()
			},
		})
		render(formComponent, document.querySelector('.expenses-form'))

		const filterComponent = new ExpensesFilterView({
			onFilterChange: filterData => {
				this.#expenseModel.setFilter(filterData)
				this.#renderExpenses()
			},
		})
		render(filterComponent, document.querySelector('.expenses-filter'))

		this.#expensesListComponent = new ExpensesListView()
		render(this.#expensesListComponent, this.#container)

		this.#renderExpenses()
	}

	#renderExpenses() {
		this.#expensesListComponent.listElement.innerHTML = ''

		this.#expenseModel.getFilteredExpenses().forEach(expense => {
			const expenseView = new ExpenseItemView(expense, {
				onDelete: id => {
					this.#expenseModel.deleteExpense(id)
					this.#renderExpenses()
				},
				onEdit: () => {
					const editForm = new ExpensesEditFormView(expense, {
						onSubmit: updatedExpense => {
							this.#expenseModel.updateExpense(updatedExpense)
							this.#renderExpenses()
						},
					})

					this.#expensesListComponent.listElement.replaceChild(
						editForm.element,
						expenseView.element
					)
				},
			})

			render(expenseView, this.#expensesListComponent.listElement)
		})
	}
}

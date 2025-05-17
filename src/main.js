import ExpensePresenter from './presenter/expenses-presenter.js'
import ExpenseModel from './model/expenses-model.js'

const appContainer = document.querySelector('.expenses-list')

if (appContainer) {
	const expenseModel = new ExpenseModel()

	const presenter = new ExpensePresenter({
		container: appContainer,
		expenseModel,
	})

	presenter.init()
} else {
	console.error('Контейнер .expenses-list не найден в DOM.')
}

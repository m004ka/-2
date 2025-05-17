import { AbstractComponent } from '../framework/abstract-component.js'

export default class ExpensesFilterView extends AbstractComponent {
    #onFilterChange

    constructor({ onFilterChange }) {
        super()
        this.#onFilterChange = onFilterChange

        this.element
            .querySelector('#category-filter')
            .addEventListener('change', this.#handleFilterChange)
    }

    get template() {
        return `
      <div class="expense-filter">
        <label for="category-filter">Фильтр по категории:</label>
        <select id="category-filter" name="category">
          <option value="">Все</option>
          <option value="products">Продукты</option>
          <option value="transport">Транспорт</option>
          <option value="entertainment">Развлечения</option>
          <option value="other">Прочие расходы</option>
        </select>
      </div>
    `
    }

    #handleFilterChange = () => {
        const categoryValue = this.element.querySelector('#category-filter').value

        this.#onFilterChange({
            category: categoryValue,
        })
    }
}

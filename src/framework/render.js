const RenderPosition = {
	BEFOREBEGIN: 'beforebegin',
	AFTERBEGIN: 'afterbegin',
	BEFOREEND: 'beforeend',
	AFTEREND: 'afterend',
}

function createElement(template) {
	const newElement = document.createElement('div')
	newElement.innerHTML = template
	return newElement.firstElementChild
}

function render(component, container, place = RenderPosition.BEFOREEND) {
	const element = component instanceof Element ? component : component.element
	container.insertAdjacentElement(place, element)
}

export { RenderPosition, createElement, render }

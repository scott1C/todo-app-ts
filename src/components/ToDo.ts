class ToDo {
    public container: HTMLElement | null
    public form: HTMLElement
    public input: HTMLElement
    public btn: HTMLElement

    constructor(container: HTMLElement | null) {
        this.container = container || document.createElement('div')
        this.form = document.createElement('form')
        this.input = document.createElement('input')
        this.btn = document.createElement('btn')

        this.input.setAttribute('placeholder', 'add details')
        this.btn.textContent = 'Add'

        this.form.className = 'form'
        this.input.className = 'form-input'
        this.btn.className = 'form-btn'

        this.container.innerHTML = ''
        this.form.append(this.input, this.btn)
        this.container.append(this.form)
    }
}

export default ToDo
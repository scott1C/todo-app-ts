import NoteList from "./NoteList";

export interface todoObject {
    id: number,
    value: string,
    done: boolean
}

class ToDo {
    public _noteList: todoObject[]
    public container: HTMLElement | null
    public form: HTMLElement
    public input: HTMLInputElement
    public btn: HTMLElement

    constructor(container: HTMLElement | null, list: todoObject[] = []) {
        this.container = container || document.createElement('div')
        this._noteList = list

        this.form = document.createElement('form')
        this.input = document.createElement('input')
        this.btn = document.createElement('button')

        this.input.setAttribute('placeholder', 'add details')
        this.btn.setAttribute('disabled', 'true')

        this.btn.textContent = 'Add'
        this.form.className = 'form'
        this.input.className = 'form-input'
        this.btn.className = 'form-btn'

        this.container.innerHTML = ''
        this.form.append(this.input, this.btn)
        this.container.append(this.form)

        this.form.addEventListener('submit', event => {
            event.preventDefault()

            if (!this.input.value) {
                return false
            }

            if (!this.hasUniqueValue(this.noteList ,this.input.value)) {
                alert('This task already exists')
                return false
            } else {
                this.addTask(Date.now(), this.input.value, false)
            }
        })
    }

    addTask(id: number, value: string, done: boolean): NoteList {
        this._noteList.push({
            id,
            value,
            done
        })

        return new NoteList(this)
    }

    hasUniqueValue(list: todoObject[] ,value: string): boolean {
        for (let i = 0; i < list.length; i++) {
            if (list[i].value.toLowerCase() === value.toLowerCase()) return false
        }

        return true
    }

    get noteList() : todoObject[] {
        return this._noteList
    }
}

export default ToDo
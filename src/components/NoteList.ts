import ToDo from "./ToDo"
import {todoObject} from "./ToDo";

class NoteList {

    private container: ToDo
    public list: HTMLElement

    constructor(container: ToDo) {
        this.container = container
        this.list = document.querySelector('ul') || document.createElement('ul')

        this.list.innerHTML = ''

        this.container.noteList.forEach((item: todoObject) => {
            this.addHTML(item.value, item.done)
        })
        if (this.container.container) {
            this.container.container.append(this.list)
        }

        this.list.addEventListener('click', event=> {
            const targetElement: HTMLElement = event.target as HTMLElement
            if (targetElement.classList.contains('check-input')) {
                const parentElement = targetElement.parentNode?.parentNode as HTMLElement
                parentElement.classList.toggle('done')
            }
        })
    }

    addHTML(value: string, done: boolean) {
        const html = `
            <li class="list-item ${done ? 'done' : ''}">
                <label class="check">
                    <input class="check-input" type="checkbox">
                    <span class="check-box"></span>
                    ${value}
                </label>
            </li> 
        `
        if (this.list) {
            this.list.innerHTML += html
        }
    }


}

export default NoteList
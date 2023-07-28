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
            this.addHTML(item.id, item.value, item.done)
        })
        if (this.container.container) {
            this.container.container.append(this.list)
        }

        this.list.addEventListener('click', (event: Event) => {
            this.doneTask(event)
        })
    }

    addHTML(id: number,value: string, done: boolean): void {
        const html = `
            <li class="list-item ${done ? 'done' : ''}" data-id="${id}">
                <label class="check">
                    <input class="check-input" type="checkbox" ${done ? 'checked' : ''}>
                    <span class="check-box"></span>
                    ${value}
                </label>
            </li> 
        `
        if (this.list) {
            this.list.innerHTML += html
        }
    }

    doneTask(event: Event): void {
        let targetElement: HTMLElement
        targetElement = event.target as HTMLElement
        if (targetElement.classList.contains('check-input')) {
            let parentElement: HTMLElement
            parentElement = targetElement.parentNode?.parentNode as HTMLElement

            parentElement.classList.toggle('done')

            const id: number = Number(parentElement.getAttribute('data-id'))
            this.modifyList('doneTask', id, this.container.noteList)
        }
    }

    modifyList(type: string, id: number, list: todoObject[]): void {
        if (type === 'doneTask') {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === id) list[i].done = !list[i].done
            }
        }

        this.saveToLocalStorage(this.container.key, list)
    }

    saveToLocalStorage(key: string, list: todoObject[]): void {
        localStorage.setItem(key, JSON.stringify(list)!)
    }
}

export default NoteList
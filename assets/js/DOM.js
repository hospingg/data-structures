'use strict';
// 1. Написати клас для реалізації структури даних Зв’язаний Список (LinkedList) (за прикладом ментора у відео-записах) та виконати на його основі наступну задачу:
class LinkedList {
    constructor(...data){
    this.lenght = 0
    this.head = null
    this.tail = null
    this.prev = null

    data.forEach(item => this.next(item) )

    }
   
    next(value){
        const listItem = new ListItem(value)
        if(this.lenght === 0){
            this.head = listItem
            this.tail = listItem
        }
        else{
            this.tail.next = listItem
            listItem.prev = this.tail
            this.tail = listItem
        }
        this.lenght++
    }
    pop(){
        this.decSize()
        const lastItem = this.tail.prev
        lastItem.next = null;
        delete this.tail
        this.tail = lastItem
        return lastItem
    }
    find(value){
        for(const item of this){
            if(item.data === value){
                return item
            }
            
        }
        return 0
    }
    // - реалізувати у класа метод deleteItem(data), який приймає певне 
    // значення data і видаляє зі зв’язаного списка перший знайдений елемент 
    // з такими даними.

    deleteItem(value){
        for(let item of this){
            if(item.data === value){
                if(item === this.head){
                    this.head = item.next
                    this.decSize()
                }
                else if(item === this.tail){
                    this.pop()
                }
                else {
                    item.prev.next = item.next
                    this.decSize()
                }
                return this
            }
        }
        return
    }
    // - реалізувати метод addNthElement(data, position), який приймає значення 
    // data і порядковий номер елемента position, після якого він має вставити 
    // новий вузел списку з такими самими даними

    addNthElement(data, position){ 
        if(position <= 0 ){
            throw RangeError('This position is out of range')
        }
        if(position > this.lenght){
            this.next(data)
            return this;
        }

        const newList = new ListItem(data)
        let i = 1;
        for(let item of this){
            if(i === position){
                newList.next = item
                item.prev.next = newList
                this.incSize()
                return this;
            }
            i++
        }

    }
    decSize(){
        this.lenght--
    }
    incSize(){
        this.lenght++
    }
    [Symbol.iterator](){
        return new LinkedListIterator(this);
    }

}
class ListItem{
    constructor(data){
    this._data = data
    } 
    get data(){
        return this._data
    }
    set data(v){
        this._data = v
    }
}

class LinkedListIterator{
    constructor(list){
        this.list = list;
        this.currentNode = null
    }
    next(){
        this.currentNode = this.currentNode ? this.currentNode.next : this.list.head
        return{
            value: this.currentNode, 
            done: !this.currentNode
        }
    }

}
const li = new LinkedList(2, 4, 1, 7)

class SpecialList{
    constructor(...arg){
        this.size = 0
        arg.forEach(item => this.addItem(item))
    }
    addItem(value){
        const newItem = new SpecialItem(value) 
        this[`*${++this.size}*`] = newItem
    }
    // До колекції з завдання №2 написати метод [Symbol.iterator], 
    // який реалізує принцип обходу колекції
    [Symbol.iterator](){
        return new SpecialListIterator(this);
    }
}

class SpecialItem{
    constructor(value){
        this._value = value
    }
    get value(){
        return _value
    }
    set value(v){
        this._value = v
    }
}

class SpecialListIterator{
    constructor(list){
        this.list = list
        this.currentNode = null
        this.id = 0
    }
    next(){
        this.currentNode =this.list[`*${++this.id}*`]
        return{
            value: this.currentNode, 
            done: !this.currentNode
        }
    }
}

const li2 = new SpecialList(1, 4, 3)


class Stack {
    constructor(maxsize, ...arg){
        this._lenght = 0
        this._maxsize = maxsize
        arg.forEach(item => this.push(item) )
    }
    get lenght(){
        return this._lenght
    }
    set lenght(l){
        this._lenght = l
    }
    get maxsize(){
        return this._maxsize
    }
    set maxsize(ms){
        this._maxsize = ms
    }
    push(item){
        if(this.lenght>=this.maxsize){
            return
        }
        this[`_${++this.lenght}`] = item
    }
    pop(){
        if(this.lenght != 0){
            delete this[`_${this.lenght--}`]
        }
    }
    pick(){
        return this[`_${this.lenght}`]
    }
    isEmpty(){
        return this.lenght === 0
    }
    
}
const st = new Stack(3, 76, 4, 1)

// 4. Задача про парні дужки. Написати функцію, яка приймає вираз, що містить дужки різних типів - (), [], {}, <>, і перевіряє, чи правильно вони відкриваються і закриваються.

class Brackets{
    constructor(){
        this['('] = ')'
        this['['] = ']'
        this['{'] = '}'
    }
    addBrack(openBrack, closeBrack){
        if(typeof openBrack !== 'string' || typeof openBrack !== 'string'){
            throw TypeError('the symbol must be string')
        }
        if(this[openBrack] || Object.values(this).includes(closeBrack)){
            throw RangeError('this symbol has been taken')
        }
        this[`${openBrack}`] = closeBrack
    }
    deleteBrack(openBrack){
        delete this[openBrack]
    }
}
const brackets = new Brackets()
function isBracketsRight(bracket, bracketList = brackets){
    const st = new Stack(bracket.lenght)
    for (const brac of bracket){
        if(bracketList[brac]){
            st.push(brac)
        }
        if(st.isEmpty()){
            return false
        }
        if(brac === bracketList[st.pick()]){
            st.pop()
        }
    }   
    return st.isEmpty()
}
// isBracketsRight('([{}])')
// isBracketsRight('([{]})')
// isBracketsRight('[{()]}')
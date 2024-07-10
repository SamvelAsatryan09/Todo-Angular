import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {

  }

  getAll(): Todo[] {
    return JSON.parse(localStorage.getItem('todoItems') || '[]')
  }

  setAll(todos: Todo[]): void {
    localStorage.setItem('todoItems', JSON.stringify(todos));
  }

  add(todo: Todo): void {
    let b = JSON.parse(localStorage.getItem('todoItems') || '[]');
    b.unshift(todo);
    localStorage.setItem('todoItems', JSON.stringify(b));
  }

  delete(index: number) {
    let c = JSON.parse(localStorage.getItem('todoItems') || '[]')
    c.splice(index, 1);
    localStorage.setItem('todoItems', JSON.stringify(c));
  }
  save(index: number, todo: Todo) {
    let c = JSON.parse(localStorage.getItem('todoItems') || '[]')
    c[index] = todo
    localStorage.setItem('todoItems', JSON.stringify(c));
  }
  deleteAll() {
    localStorage.setItem('todoItems', JSON.stringify([]));
  }
}

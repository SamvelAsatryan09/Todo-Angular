import {Component, ElementRef, ViewChild} from '@angular/core';
import {Todo} from "../models/todo";
import {FormsModule} from "@angular/forms";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {TodoService} from "../services/todo.service";
import {application} from "express";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos: Todo[] = [];
  inputValue = '';
  isEditing = false;
  isgoingEditing = false;

  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getAll()
  }

  onAdd() {
    if (this.inputValue) {
      let todo: Todo = {
        description: this.inputValue,
        completed: false,
        isEditing: false
      };
      this.isgoingEditing = false;
      // this.todos.unshift(todo)
      this.inputValue = ''
      this.playAudio('audio')
      this.todoService.add(todo)
      this.updateTodos()
    }
  }

  onDelete(index: number) {
    this.isgoingEditing = false;
    const confirmed = confirm("Are you sure you want to delete it?")
    if (confirmed) {
      this.todoService.delete(index)
      this.playAudio('trash')
      this.updateTodos()
    }
    console.log(this.todos)
  }

  onCheckBoxChange(event: any, index: number) {
    this.todoService.save(index, this.todos[index])
    this.updateTodos()
  }

  updateTodos() {
    this.todos = this.todoService.getAll()
  }

  onEdit(index: number, value: string) {
    if (this.isgoingEditing) {
      return
    }
    this.todos[index].isEditing = true;
    this.isgoingEditing = true;
  }

  onSave(index: number, value: string) {
    this.todos[index].description = value;
    this.todos[index].isEditing = false;
    this.isgoingEditing = false;
    this.todoService.save(index, this.todos[index])
    this.updateTodos()
  }

  onBlur(index: number) {
    this.todos[index] = {...this.todos[index]};
    this.todos[index].isEditing = false;
    console.log(this.todos)
    this.isgoingEditing = false;
  }

  playAudio(audioName: string) {
    let audio = new Audio();
    audio.src = '../../assets/audio/' + audioName + '.wav';
    audio.load()
    audio.play().then(() => console.log('audio success'))
  }
  deleteAll() {
    this.isgoingEditing = false;
    const confirmed = confirm("Are you sure you want to delete it?")
    if (confirmed) {
      this.todoService.deleteAll()
    }
    this.updateTodos()
  }
}

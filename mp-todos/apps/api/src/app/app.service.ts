import { Injectable } from '@nestjs/common';
import { Todo } from '@mp-todos/shared-types'

@Injectable()
export class AppService {
  private todos: Todo[] = []

  getData(): Todo[] {
    return this.todos
  }

  add(text: string) {
    this.todos.push({
      id: this.todos.length,
      text,
      done: false
    })
  }

  setDone(id: number, done: boolean): void {
    
    const todoIndex = this.todos.findIndex(todo => todo.id === id)
    console.log(todoIndex)
    console.log(done)
 
      this.todos[todoIndex].done = done
    
    console.table(this.todos)
  }
}

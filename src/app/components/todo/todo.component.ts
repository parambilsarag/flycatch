import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoArray = [];
  todo;
  itemId = 1;
  tests = [[[],1],[{ a: 1 },1],[{ a: 1, b: { c: 1 } },2],[{ a: 1, b: { c: 1 }, c: { d: 1 , e : { g : 1} } },3]]
  testResults=[];

  constructor() {
  }

  printObj(obj){
    return JSON.stringify(obj)
  }

  addTodo(todoForm: any) {
    if (todoForm.value.todo == "" || todoForm.value.todo == null) {
      alert('Field required **');
    } else {
      var value = {
        id: this.itemId++,
        value: todoForm.value.todo,
        isChecked: false
      }
      this.todoArray.push(value);
      todoForm.resetForm();
    }
  }

  // todoSubmit(value: any) {
  //   if (value.value !== "") {
  //     this.todoArray.push(value.todo);
  //   } else {
  //     alert('Field required **');
  //   }
  // }

  calculateDepth(){
   this.testResults = this.tests.map((t) => this.getDepth(t[0])===t[1])
   console.log("result",this.testResults);

  }

  getDepth(input){
      var depthLevel = 1;
      console.log("element",input);
      
      for(var key in input) {
          if (!input.hasOwnProperty(key)) continue;
  
          if(typeof input[key] == 'object'){
              var depth = this.getDepth(input[key]) + 1;
              depthLevel = Math.max(depth, depthLevel);
          }
      }
      return depthLevel;
  }

  deleteTodoItem(todoItem : any) {
    var removeIndex = this.todoArray.map(function(item) { return item.id; }).indexOf(todoItem.id);
    console.log("removeIndex",removeIndex)
    this.todoArray.splice(removeIndex, 1);
    console.log("this.todoArray",this.todoArray);
    
  }

  isChecked(todoItem : any) {
    if(!todoItem.isChecked){
      todoItem.isChecked = true;
    } else {
      todoItem.isChecked = false;
    }
  }

}

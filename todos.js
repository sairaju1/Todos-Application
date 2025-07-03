let todoItemsContainer = document.getElementById("todoItemsContainer");
        let todobutton=document.getElementById("addbutton");
        let savetodobutton=document.getElementById("savetodobutton");

        function gettodoList()
        {
          let stringifiedtodolist=localStorage.getItem("todoList");
          let parsed=JSON.parse(stringifiedtodolist);
          if(parsed===null)
          return []
          else{
            return parsed;
          }
        }

        let todoList=gettodoList();


savetodobutton.onclick=function(){
  localStorage.setItem("todoList",JSON.stringify(todoList));
}


function deleteTodo(todoId){
  todoElements=document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElements);

  let deletedIndex=todoList.findIndex(function(eachTodo){
     eachTodo="todo"+todoList.uniqueNo;
     if(todoId===eachTodo)
     {
      return true;
     }
     else{
      return false;
     }
    });
    todoList.splice(deletedIndex,1);
  }


function onToDoStatus(checkboxId,labelId,todoId){
  let checkboxElement=document.getElementById(checkboxId);
  console.log(checkboxElement.checked);
  let labelElement=document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todoObjectIndex = todoList.findIndex(function(eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;

    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoList[todoObjectIndex];

  if(todoObject.isChecked === true){
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }

}

function createAndAppendTodo(todo) {

  let checkboxId="checkbox"+todo.uniqueNo;
  let labelId="label"+todo.uniqueNo;
  let todoId="todo"+todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id=todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.classList.add("checkbox-input");
  inputElement.checked=todo.isChecked;
  inputElement.onclick=function(){
    onToDoStatus(checkboxId,labelId,todoId);
  }
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id=labelId;
  labelElement.classList.add("checkbox-label");
  if(todo.isChecked===true){
    labelElement.classList.add("checked");
  }
  labelElement.textContent = todo.text;
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick=function(){
    deleteTodo(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}
function onAddTodo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputElementValue = userInputElement.value.trim();

  if(userInputElementValue===""){
    alert("Enter Valid Text");
    return;
  }

  let todoCount = todoList.length + 1;

  let newTodo = {
    text: userInputElementValue,
    uniqueNo: todoCount,
    isChecked:false
  };

  todoList.push(newTodo);

  createAndAppendTodo(newTodo);
  userInputElement.value = ""; 
}


todobutton.onclick=function(){
  onAddTodo()
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
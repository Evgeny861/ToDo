'use strict';


const todoControl = document.querySelector('.todo-control'),
        headerInput = document.querySelector('.header-input'), 
        todoList = document.querySelector('.todo-list'),
        todoCompleted = document.querySelector('.todo-completed');
        
        
        let todoData = [];
        let localStorageData = function(){
            localStorage.Value = JSON.stringify(todoData);
        };
        const render = function() {
            todoList.textContent = '';
            todoCompleted.textContent = '';
            todoData.forEach(function(item){
                const li = document.createElement('li');
                li.classList.add('todo-item');

                li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
                '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' + 
                '<button class="todo-complete"></button>' +
                '</div>';

                if(item.completed){
                    todoCompleted.append(li);
                } else {
                    todoList.append(li);
                }

                const btnTodoCompleted = li.querySelector('.todo-complete');
                
                btnTodoCompleted.addEventListener('click', function(){
                    item.completed = !item.completed;
                    render();
                    localStorageData();
                });
                                
                const btnTodoRemove = li.querySelector('.todo-remove');
                btnTodoRemove.addEventListener('click', function(){
                    
                    todoData.splice(todoData.indexOf(item), 1);
                    render();
                });
                
                
                
                
            });
        };
        
        
        

        document.addEventListener("DOMContentLoaded", function (event){
            
            todoData = JSON.parse(localStorage.Value);
            render();
        });

        todoControl.addEventListener('submit', function(event){
            event.preventDefault();

            const newTodo = {
                value: headerInput.value,
                completed: false,
                
            };

            if(headerInput.value === ''){
                alert('Введи название задачи');
            }else {
                todoData.push(newTodo);
                headerInput.value = '';
            }

            localStorageData();
            
            render();
        });

        render();


        
                
        
        

function showSection(sectionId){
    // alert(sectionId)
 var SectionList =   document.querySelectorAll('.showTask-container,.addTask-container');
    // console.log(SectionList);

    SectionList.forEach(section=>{
        if(section.id==sectionId){
            section.classList.remove('hidden')
        }
        else{
            section.classList.add('hidden')
        }

    })
}

class Task{
    constructor (title,description,dueDate,Assignee){
    this.title=title;
    this.date = new Date(dueDate);
    this.Assignee=Assignee;
    this.description = description ;
    this.completed= false;
    this.today=new Date();
    

}
markComplete(){
    this.completed=true;
}
display(index){
    
    return `<div class="task-item">
        <i onclick="objTaskManager.removeItem(${index})" class="fa fa-times" style="float:inline-end;color: red; cursor: pointer;"></i>
        <span style="color:red">${this.today > this.date? 'Due date has passed': ''}</span>
        <h3>Title: ${this.title}</h3>
        <p>Description: ${this.description}</p>
        <p>Due Date: ${this.date}</p>
        <p>Assigned by: ${this.Assignee}</p>
        <p>Completed: ${this.completed?'<i class="fa fa-check " style="color: green"></i>':'No'}</p>
        ${this.completed?'':`<button onclick="objTaskManager.markComplete(${index})">Mark Completed</button>`}

        </div>`
 }

 
}
class TaskManager {
constructor() {
    this.tasks=[];
    

    
}
clearField(){
    document.getElementById('Task').value=''
     document.getElementById('dueDate').value=''
    document.getElementById('Assigned').value=''
    document.getElementById('description').value=''
 }
addTask(){
    
    let title=document.getElementById('Task').value
    let dueDate=document.getElementById('dueDate').value
    let Assignee =document.getElementById('Assigned').value
    let description=document.getElementById('description').value

    if(title && description && dueDate && Assignee){
        var objTask = new Task(title,description,dueDate,Assignee);
        this.tasks.push(objTask);
        this.displaytasks()
        this.clearField();
    
        alert("Your task has been added Successfully!")

    }
    else{
        alert("Please fill all fields")
    }
    }

    displaytasks(){
        let taskcontainer = document.getElementById('tasklist');
        
        if(this.tasks.length>0){
            // console.log(add(task))
         taskcontainer.innerHTML  = this.tasks.map((task,index)=>task.display(index)).join('');
        }
        else{
            taskcontainer.innerHTML='<h2>No Tasks Added</h2>'
        }

        }
    

markComplete(index){
    if(this.tasks[index]){
        this.tasks[index].markComplete();
        this.displaytasks();

    }
}   
removeItem(index){
    if(this.tasks[index]){
        this.tasks.splice(index,1);

        this.displaytasks();
 
        
        
      }
}
}
var button=document.getElementById('addTaskbtn')

const objTaskManager = new TaskManager()
button.addEventListener('click',()=>{
event.preventDefault();
objTaskManager.addTask();
})
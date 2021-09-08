let section=document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", e=>{
    //prevent form from being submitted
    e.preventDefault();
    //get input value
    let form=e.target.parentElement;
    let todoText=form.children[0].value;
    let todoMonth=form.children[1].value;
    let todoDate=form.children[2].value;

    //prevent null data
    if(todoText==="")
    {
        alert("尚未填寫完整!");
        return;
    }
    if(todoMonth==="")
    {
        alert("尚未填寫完整!");
        return;
    }
    if(todoDate==="")
    {
        alert("尚未填寫完整!");
        return;
    }
    //create a todo
    let todo=document.createElement("div");
    todo.classList.add("todo");
    let text=document.createElement("p");
    text.classList.add("todo-text");
    text.innerText=todoText;
    let time=document.createElement("p");
    time.classList.add("todo-time");
    time.innerText=todoMonth + " / " +todoDate;
    todo.appendChild(text);
    todo.appendChild(time);
    //create check&delete button
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML='<i class="fas fa-check"></i>';
    //completebutton clicklistener
    completeButton.addEventListener("click", e=>{
        let todoItem=e.target.parentElement;
        todoItem.classList.toggle("done");
    })
    

    let trushButton=document.createElement("button");
    trushButton.classList.add("delete");
    trushButton.innerHTML='<i class="fas fa-trash-alt"></i>';
    todo.appendChild(completeButton);
    todo.appendChild(trushButton);
    todo.style.animation="scaleup 0.5s forwards";
    //create trushbutton clicklistener
    trushButton.addEventListener("click", e=>{
        let todoItem=e.target.parentElement;
        todoItem.addEventListener("animationend", ()=>{
            let text=todoItem.children[0].innerText;
            let mylistArray=JSON.parse(localStorage.getItem("list"));
            mylistArray.forEach((item,index)=>{
                if(item.todoText==text){
                    mylistArray.splice(index,1);
                    localStorage.setItem("list",JSON.stringify(mylistArray));
                }
            })
            todoItem.remove();
        })
        todoItem.style.animation="scaledown 0.5s forwards";
    })

    let myTodo={
        todoText:todoText,
        todoMonth:todoMonth,
        todoDate:todoDate
    }


    let mylist=localStorage.getItem("list");
    if(mylist == null)
    {
        localStorage.setItem("list",JSON.stringify([myTodo]));

    }
    else{
        let mylistArray=JSON.parse(mylist);
        mylistArray.push(myTodo);
        localStorage.setItem("list",JSON.stringify(mylistArray));

    }

    form.children[0].value="";//clear data
    form.children[1].value="";
    form.children[2].value="";
    section.appendChild(todo);
})
loadData();
function loadData(){
    let mylist=localStorage.getItem("list");
    if(mylist!=null){
        let mylistArray=JSON.parse(mylist);
        mylistArray.forEach(item => {
            let todo =document.createElement("div");
            todo.classList.add("todo");
            let text=document.createElement("p");
            text.classList.add("todo-text");
            text.innerText=item.todoText;
            let time=document.createElement("p");
            time.classList.add("todo-time");
            time.innerText=item.todoMonth+" / "+item.todoDate;
            todo.appendChild(text);
            todo.appendChild(time);
            let completeButton = document.createElement("button");
            completeButton.classList.add("complete");
            completeButton.innerHTML='<i class="fas fa-check"></i>'; 
    
            completeButton.addEventListener("click", e=>{
                let todoItem=e.target.parentElement;
                todoItem.classList.toggle("done");
            })
            
        
            let trushButton=document.createElement("button");
            trushButton.classList.add("delete");
            trushButton.innerHTML='<i class="fas fa-trash-alt"></i>';
            //create trushbutton clicklistener
            trushButton.addEventListener("click", e=>{
                let todoItem=e.target.parentElement;
                todoItem.addEventListener("animationend", ()=>{
                    let text=todoItem.children[0].innerText;
                    let mylistArray=JSON.parse(localStorage.getItem("list"));
                    mylistArray.forEach((item,index)=>{
                        if(item.todoText==text){
                            mylistArray.splice(index,1);
                            localStorage.setItem("list",JSON.stringify(mylistArray));
                        }
                    })
                    todoItem.remove();
                })
                todoItem.style.animation="scaledown 0.5s forwards";
            })
            todo.appendChild(completeButton);
            todo.appendChild(trushButton);
            section.appendChild(todo);
        })
    }
}
function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
  
    while (i < arr1.length && j < arr2.length) {
      if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
        result.push(arr2[j]);
        j++;
      } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
        result.push(arr1[i]);
        i++;
      } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
        if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
          result.push(arr2[j]);
          j++;
        } else {
          result.push(arr1[i]);
          i++;
        }
      }
    }
  
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }
  
    return result;
  }
  
  function mergeSort(arr) {
    if (arr.length === 1) {
      return arr;
    } else {
      let middle = Math.floor(arr.length / 2);
      let right = arr.slice(0, middle);
      let left = arr.slice(middle, arr.length);
      return mergeTime(mergeSort(right), mergeSort(left));
    }
  }
  
  let sortButton = document.querySelector("div.sort button");
  sortButton.addEventListener("click", () => {
    // sort data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));
  
    // remove data
    let len = section.children.length;
    for (let i = 0; i < len; i++) {
      section.children[0].remove();
    }
  
    // load data
    loadData();
  })
const addButton = document.querySelector(".add-block-button-no-input-msg button");

const tasksArray = [];
addButton.addEventListener("click", function(){
    const textField = document.querySelector(".add-block-text input");
    applyText(textField.value);
    textField.value = "";
})

let applyText = function(textField2){

    const noInputMsg = document.querySelector(".no-input-message");
    const toDOLIstDiv = document.querySelector(".toDOLIstDiv");
    if(textField2 === ""){
        noInputMsg.classList.remove("hidden");
        return;
    }else{
        let toDoDiv = document.createElement("div");
        toDoDiv.className = "toDoDiv";
        let toDODivinput = document.createElement("input");
        toDODivinput.readOnly = "readOnly";
        toDODivinput.className = "toDODivinput";
        toDODivinput.value = `${textField2}`;

        tasksArray.push(textField2);
        localStorage.setItem("task", tasksArray);
        
        let horizontalLines = document.createElement("div");
        horizontalLines.className = "horizontalLines";
        
        let deleteButtonDiv = document.createElement("div");
        deleteButtonDiv.className = "deleteButtonDiv hidden";
        deleteButtonDiv.classList.remove("hidden");
        deleteButtonDiv.innerHTML = "<button class='deleteButton'>Delete</button>";
        
        let cancelButtonDiv = document.createElement("div");
        cancelButtonDiv.className = "cancelButtonDiv hidden";
        cancelButtonDiv.innerHTML = "<button class='cancelButton'>Cancel</button>"
        
        
        deleteButtonDiv.addEventListener("click", function(){
            tasksArray.splice(tasksArray.indexOf(toDODivinput.value), 1);
            localStorage.setItem("task", tasksArray);
            toDoDiv.remove();
        })
        let editButtonDiv = document.createElement("div");
        editButtonDiv.className = "editButtonDiv hidden";
        editButtonDiv.classList.remove("hidden");
        editButtonDiv.innerHTML = "<button class='editButtonDiv'>Edit</button>";
        
        let okButtonDiv = document.createElement("div");
        okButtonDiv.className = "okButtonDiv hidden";
        okButtonDiv.innerHTML = "<button class='cancelButton'>Change</button>"

        let noInput2ndmsgdiv = document.createElement("div");
        noInput2ndmsgdiv.className = "noInput2ndmsgdiv hidden";
        noInput2ndmsgdiv.innerHTML = "<p class = 'noInput2ndmsg'>please write something to add</p>";
        noInput2ndmsgdiv.style.cssText = "color: red; font-size: 12px";

        editButtonDiv.addEventListener("click", function(){
            let inputValue = toDODivinput.value;
            deleteButtonDiv.classList.add("hidden");
            editButtonDiv.classList.add("hidden");
            cancelButtonDiv.classList.remove("hidden");
            okButtonDiv.classList.remove("hidden");
            toDODivinput.readOnly = "";

            okButtonDiv.addEventListener("click", function(){
                if (toDODivinput.value === ""){
                    noInput2ndmsgdiv.classList.remove("hidden");
                    return;
                }else{
                    toDODivinput.readOnly = "readOnly";
                    deleteButtonDiv.classList.remove("hidden");
                    editButtonDiv.classList.remove("hidden");
                    cancelButtonDiv.classList.add("hidden");
                    okButtonDiv.classList.add("hidden");

                    tasksArray[tasksArray.indexOf(inputValue)] =  toDODivinput.value;
                    localStorage.setItem("task", tasksArray);

                }
                noInput2ndmsgdiv.classList.add("hidden");
            })

            cancelButtonDiv.addEventListener("click", function(){
                toDODivinput.value = inputValue;
                toDODivinput.readOnly = "readOnly";
                deleteButtonDiv.classList.remove("hidden");
                editButtonDiv.classList.remove("hidden");
                cancelButtonDiv.classList.add("hidden");
                okButtonDiv.classList.add("hidden");
                noInput2ndmsgdiv.classList.add("hidden");
            })
            
        })

        toDoDiv.appendChild(toDODivinput);
        toDoDiv.appendChild(horizontalLines);
        toDoDiv.appendChild(deleteButtonDiv);
        toDoDiv.appendChild(cancelButtonDiv)
        toDoDiv.appendChild(editButtonDiv);
        toDoDiv.appendChild(okButtonDiv);
        toDoDiv.appendChild(noInput2ndmsgdiv);
        toDOLIstDiv.appendChild(toDoDiv);
    }
    noInputMsg.classList.add("hidden")
}
let tasksString = localStorage.getItem("task", tasksArray);
tasksString = tasksString.split(",");
while(tasksString.length >= 1 ){
    applyText(tasksString.shift());
}
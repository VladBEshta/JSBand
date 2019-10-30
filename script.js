let modal = document.getElementById("modal");
let create = document.getElementById("create");
let cancel = document.getElementById("cancel");
let save = document.getElementById("save");

create.onclick = function() {
    modal.style.display = "block";
};

cancel.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function getLSItems() {
    return JSON.parse(localStorage.getItem('TODOList')) || [];
}

save.onclick = function() {
    const title = document.getElementById("titleValue").value;
    const description = document.getElementById("descriptionValue").value;
    const priority = document.getElementById("priorityValue").value;
    let TODOList = getLSItems();
    let regex = /^[a-zA-Z][a-zA-Z0-9. ,]+$/;
    if (regex.test(title) === true && regex.test(priority) === true) {
        TODOList.push({
            title: title,
            description: description,
            priority: priority,
            status: "open",
            id: new Date().toISOString(),
        })
    }
    localStorage.setItem("TODOList", JSON.stringify(TODOList))
}

function reloadPageWithCards() {

    for(let i=0; i<getLSItems().length; i++){
        const newDiv = document.createElement("div");
        const newTitle = document.createElement("h4");
        const newDescription = document.createElement("h4");
		const newPriority = document.createElement("h4");
        const bottomWrapDiv = document.createElement("div");
        const dotButton = document.createElement("button");
        const dropdown = document.createElement("div");
        const doneCard = document.createElement("a");
        const editCard = document.createElement("a");
        const deleteCard = document.createElement("a");
        

        let list = getLSItems()

        newTitle.innerHTML = list[i].title;
        newDescription.innerHTML = list[i].description || "";
        newPriority.innerHTML = list[i].priority;

        newDiv.appendChild(newTitle);
        newDiv.appendChild(newDescription);        
        newDiv.appendChild(bottomWrapDiv);
        bottomWrapDiv.appendChild(newPriority);
        bottomWrapDiv.appendChild(dotButton);
        bottomWrapDiv.appendChild(dropdown);
        dropdown.appendChild(doneCard);
        dropdown.appendChild(editCard);
        dropdown.appendChild(deleteCard);
        doneCard.innerHTML = "done";
        editCard.innerHTML = "edit";
        deleteCard.innerHTML= "delete";

        newDiv.setAttribute("class", "card")
        newDiv.setAttribute("id", list[i].id)
        dropdown.setAttribute("id", "dropdownWrap")
        dropdown.setAttribute("class", "dropdown-content")

		cardsDiv = document.getElementById("cards");
		cardsDiv.appendChild(newDiv);
		dotButton.setAttribute("class", "dotButton")

     //    newDiv.style.width = "65%";
     //    newDiv.style.height = "auto";
     //    newDiv.style.background = "#41b3a3";
     //    newDiv.style.color = "white";
     //    newDiv.style.margin = "40px";
     //    newDiv.style.padding = "20px";
     //    newDiv.style["box-shadow"] = " 0 4px 8px 0 rgba(0,0,0,0.5)";
     //    newDiv.style.display = "flex";
    	// newDiv.style["flex-direction"] = "column";
    	// newDiv.style["justify-content"] = "space-between";

    	newPriority.setAttribute("class", "priority");

    	// newPriotity.style.border = "1px dashed #000";
    	// newPriotity.style.display = "inline";

        cardsDiv.setAttribute("class", "cards")
        // cardsDiv.style.display = "grid";
        // cardsDiv.style["grid-template-columns"] = "1fr 1fr 1fr";
        
        
        bottomWrapDiv.setAttribute("class", "bottomWrap")

        // bottomWrapDiv.style["padding-right"] = "20px";
        // bottomWrapDiv.style["padding-left"] = "10px";

        // dotButton.style.float = "right";
        // dotButton.style.background = "inherit";
        // dotButton.style.border = "1px dashed #000";
        // dotButton.style["border-radius"] = "5px";
        // dotButton.style.outline = "none";


        dotButton.innerHTML = "...";
    }
}

reloadPageWithCards()
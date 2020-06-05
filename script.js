let modal = document.getElementById("modal");
let create = document.getElementById("create");
let cancel = document.getElementById("cancel");
let save = document.getElementById("save");
let status = document.getElementById("status");
let priority = document.getElementById("priority");
let titleFilter = document.getElementById("titleFilter");

create.onclick = openModalWindow;

function openModalWindow() {
  modal.style.display = "block";
}
cancel.onclick = function () {
  modal.style.display = "none";
};

function getLSItems() {
  return JSON.parse(localStorage.getItem("TODOList")) || [];
}

save.onclick = SaveCard;

function SaveCard() {
  if (document.getElementById("titleValue").value != "") {
    const title = document.getElementById("titleValue").value;
    const description = document.getElementById("descriptionValue").value;
    const priority = document.getElementById("priorityValue").value;
    let list = getLSItems();
    let regex = /^[a-zA-Z][a-zA-Z0-9. ,]+$/;
    if (regex.test(title) === true && regex.test(priority) === true) {
      list.push({
        title: title,
        description: description,
        priority: priority,
        status: "open",
        id: new Date().toISOString(),
      });
    }
    localStorage.setItem("TODOList", JSON.stringify(list));
    let id = JSON.parse(localStorage.getItem("editing"));
    localStorage.setItem(
      "TODOList",
      JSON.stringify(list.filter((item) => item.id != id))
    );
  } else {
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
      });
    }
    localStorage.setItem("TODOList", JSON.stringify(TODOList));
  }
}

function reloadPageWithCards() {
  for (let i = 0; i < getLSItems().length; i++) {
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

    let list = getLSItems();

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
    doneCard.setAttribute("id", "done" + list[i].id);
    editCard.innerHTML = "edit";
    editCard.setAttribute("id", "edit" + list[i].id);
    deleteCard.innerHTML = "delete";
    deleteCard.setAttribute("id", "delete" + list[i].id);

    newDiv.setAttribute("class", "card");
    newDiv.setAttribute("id", list[i].id);
    dropdown.setAttribute("id", "dropdown" + list[i].id);
    dropdown.setAttribute("class", "dropdown-content");

    cardsDiv = document.getElementById("cards");
    cardsDiv.appendChild(newDiv);
    dotButton.setAttribute("class", "dotButton");
    dotButton.setAttribute("id", "button" + list[i].id);

    newPriority.setAttribute("class", "priority");

    cardsDiv.setAttribute("class", "cards");

    bottomWrapDiv.setAttribute("class", "bottomWrap");

    dotButton.innerHTML = "...";
    if (list[i].status == "done") {
      document.getElementById(list[i].id).classList.add("done_icon");
      document.getElementById(list[i].id).style["order"] = list.length;
      document.getElementById("done" + list[i].id).innerHTML = "open";
    }
  }
}

reloadPageWithCards();

cards.onclick = function (event) {
  let buttonId = event.target.id;
  let parhId = event.path[0].id;
  if (parhId.includes("done")) {
    let id = parhId.slice(4);
    document.getElementById(parhId).innerHTML == "done"
      ? (document.getElementById(parhId).innerHTML = "open")
      : (document.getElementById(parhId).innerHTML = "done");
    markAsDoneCard(id);
  }
  if (parhId.includes("edit")) {
    let id = parhId.slice(4);
    editCard(id);
  }
  if (parhId.includes("delete")) {
    let id = parhId.slice(6);
    deleteCard(id);
  }
  let dropdownId = "dropdown" + buttonId.slice(6);
  if (buttonId.includes("button")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (
        openDropdown.classList.contains("show") &&
        openDropdown.id != dropdownId
      ) {
        openDropdown.classList.remove("show");
      }
    }

    document.getElementById(dropdownId).classList.toggle("show");
  }
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (!event.target.matches(".dotButton")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function deleteCard(id) {
  let list = getLSItems();
  list.forEach((item) => {
    if (item.id == id) {
      document.getElementById(item.id).style.display = "none";
    }
  });
  localStorage.setItem(
    "TODOList",
    JSON.stringify(list.filter((item) => item.id != id))
  );
}

function editCard(id) {
  openModalWindow();
  let list = getLSItems();
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      document.getElementById("titleValue").value = list[i].title;
      document.getElementById("descriptionValue").value = list[i].description;
      document.getElementById("priorityValue").value = list[i].priority;
    }
  }
  localStorage.setItem("editing", JSON.stringify(id));
}

// let byStatusFilter = function filterByStatus() {
//   let statusValue = status.value;
//   // let todos = document.querySelectorAll(".card");
//   // for (let i = 0; i < todos.length; i++) {
//   //   switch (statusValue) {
//   //     case "all":
//   //       todos[i].style.display = "flex";
//   //       break;
//   //     case "open":
//   //       if (!todos[i].classList.contains("done_icon")) {
//   //         todos[i].style.display = "flex";
//   //       } else if (todos[i].classList.contains("done_icon")) {
//   //         todos[i].style.display = "none";
//   //       }
//   //       break;
//   //     case "done":
//   //       if (todos[i].classList.contains("done_icon")) {
//   //         todos[i].style.display = "flex";
//   //       } else if (!todos[i].classList.contains("done_icon")) {
//   //         todos[i].style.display = "none";
//   //       }
//   //       break;
//   //   }
//   // }
//   let list = getLSItems();
//   for (let i = 0; i < list.length; i++) {
//     if (statusValue == list[i].status) {
//       document.getElementById(list[i].id).style.display = "flex";
//     } else if (statusValue == "all") {
//       document.getElementById(list[i].id).style.display = "flex";
//     } else {
//       document.getElementById(list[i].id).style.display = "none";
//     }
//   }
// };
// status.onchange = byStatusFilter;

function markAsDoneCard(id) {
  let list = getLSItems();
  list = list.map((item) => {
    if (item.id == id && item.status == "open") {
      item.status = "done";
      document.getElementById(item.id).classList.add("done_icon");
      document.getElementById(item.id).style["order"] = list.length;
    } else if (item.id == id) {
      item.status = "open";
      document.getElementById(item.id).classList.remove("done_icon");
      document.getElementById(item.id).style["order"] = 0;
    }
    return item;
  });
  localStorage.setItem("TODOList", JSON.stringify(list));
}

// priority.onchange = function filterByPriotity() {
//   let priorityValue = priority.value;
//   let list = getLSItems();

//   for (let i = 0; i < list.length; i++) {
//     if (priorityValue == list[i].priority) {
//       document.getElementById(list[i].id).style.display = "";
//     } else if (priorityValue == "") {
//       document.getElementById(list[i].id).style.display = "";
//     } else {
//       document.getElementById(list[i].id).style.display = "none";
//     }
//   }
// };

// titleFilter.onkeyup = function myFunction() {
//   let list = getLSItems();
//   cards = document.getElementById("cards");
//   for (i = 0; i < list.length; i++) {
//     let check = document.getElementById(list[i].id).firstChild;
//     let txtValue = check.textContent || check.innerText;
//     if (txtValue.indexOf(titleFilter.value) > -1) {
//       document.getElementById(list[i].id).style.display = "";
//     } else {
//       document.getElementById(list[i].id).style.display = "none";
//     }
//   }
// };

function filterAll() {
  document.querySelectorAll(".card").forEach((e) => e.remove());
  let list = getLSItems();
  let filteredList = list.filter(
    (item) =>
      item.title.includes(titleFilter.value) &&
      item.priority.includes(priority.value) &&
      item.status.includes(status.value)
  );
  for (let i = 0; i < filteredList.length; i++) {
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

    newTitle.innerHTML = filteredList[i].title;
    newDescription.innerHTML = filteredList[i].description || "";
    newPriority.innerHTML = filteredList[i].priority;

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
    doneCard.setAttribute("id", "done" + list[i].id);
    editCard.innerHTML = "edit";
    editCard.setAttribute("id", "edit" + list[i].id);
    deleteCard.innerHTML = "delete";
    deleteCard.setAttribute("id", "delete" + list[i].id);

    newDiv.setAttribute("class", "card");
    newDiv.setAttribute("id", filteredList[i].id);
    dropdown.setAttribute("id", "dropdown" + filteredList[i].id);
    dropdown.setAttribute("class", "dropdown-content");

    cardsDiv = document.getElementById("cards");
    cardsDiv.appendChild(newDiv);
    dotButton.setAttribute("class", "dotButton");
    dotButton.setAttribute("id", "button" + filteredList[i].id);

    newPriority.setAttribute("class", "priority");

    cardsDiv.setAttribute("class", "cards");

    bottomWrapDiv.setAttribute("class", "bottomWrap");

    dotButton.innerHTML = "...";
    if (filteredList[i].status == "done") {
      document.getElementById(filteredList[i].id).classList.add("done_icon");
      document.getElementById(filteredList[i].id).style["order"] =
        filteredList.length;
      document.getElementById("done" + list[i].id).innerHTML = "open";
    }
  }

  console.log(filteredList);
}
status.onchange = filterAll;
priority.onchange = filterAll;
titleFilter.onkeyup = filterAll;

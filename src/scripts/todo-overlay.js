import * as Projectmanager from "./project-manager";
import { currentProjectID } from "./dom-manager";
import { format } from "date-fns";

//generates the overlay view/card when a todo item is clicked
export default function generateOverlay(todo) {
    document.getElementById("overlay").style.display = "block";
    const card = document.getElementById("overlay-item");

    const cardHeader = generateHeader(todo.descr);
    const cardPriority = generatePriority(todo);
    const cardDue = generateDueDate(todo);
    const checklist = generateChecklist(todo);
    const notesSection = generateNotes(todo);

    card.appendChild(cardHeader);
    card.appendChild(cardPriority);
    card.appendChild(cardDue);
    card.appendChild(checklist);
    card.appendChild(notesSection);
}

/* ------------------- Header ----------------------- */

function generateHeader(header) {
    const cardHeader = document.createElement("h2");
    cardHeader.setAttribute("id", "cardHeader");
    cardHeader.innerHTML = header;
    return cardHeader;
}

/* ------------------- Priority ----------------------- */

function generatePriority(todo) {
    //container for the priority selector in the card display of a todo item
    const cardPriority = document.createElement("div");
    cardPriority.setAttribute("id", "cardPriorityDiv");
    //"Select a priority" text
    const cardPriorityText = document.createElement("p");
    cardPriorityText.innerHTML = "Select a priority:";
    cardPriorityText.setAttribute("id", "cardPriorityText");
    //Container for the three priority options (green, yellow, red or 1, 2, 3)
    const priorityContainer = document.createElement("div");
    priorityContainer.setAttribute("id", "priorityContainer");
    //Priority option 1 (green)
    const cardPriorityOne = document.createElement("p");
    cardPriorityOne.innerHTML = "!";
    cardPriorityOne.classList.add("cardPriority");
    cardPriorityOne.classList.add("cardPriorityOne");
    cardPriorityOne.setAttribute("id", "cardPriorityOne");
    cardPriorityOne.setAttribute("data-priority", "1");
    //Priority option 2 (yellow)
    const cardPriorityTwo = document.createElement("p");
    cardPriorityTwo.innerHTML = "!";
    cardPriorityTwo.classList.add("cardPriority");
    cardPriorityTwo.classList.add("cardPriorityTwo");
    cardPriorityTwo.setAttribute("id", "cardPriorityTwo");
    cardPriorityTwo.setAttribute("data-priority", "2");
    //priority option 3 (red)
    const cardPriorityThree = document.createElement("p");
    cardPriorityThree.innerHTML = "!";
    cardPriorityThree.classList.add("cardPriority");
    cardPriorityThree.classList.add("cardPriorityThree");
    cardPriorityThree.setAttribute("id", "cardPriorityThree");
    cardPriorityThree.setAttribute("data-priority", "3");

    //This checks the todos current priority and styles one of the three options accordingly, if the priority has been set already
    managePriority(
        cardPriorityOne,
        cardPriorityTwo,
        cardPriorityThree,
        todo.priority,
        todo.id
    );

    priorityContainer.addEventListener("click", (e) => {
        if (e.target.dataset.priority !== undefined) {
            managePriority(
                cardPriorityOne,
                cardPriorityTwo,
                cardPriorityThree,
                e.target.dataset.priority,
                todo.id
            );
        }
    });

    //Add all elements to the priority div
    cardPriority.appendChild(cardPriorityText);
    priorityContainer.appendChild(cardPriorityOne);
    priorityContainer.appendChild(cardPriorityTwo);
    priorityContainer.appendChild(cardPriorityThree);
    cardPriority.appendChild(priorityContainer);

    return cardPriority; //Returns final priority element to add to the card
}

function managePriority(one, two, three, prio, id) {
    const priority = parseInt(prio); //converts prio input into a number (string possible)
    //Removes "selected" Styling from all 3 difficulty selectors (exclamation marks) in the card view
    one.classList.remove("cardPrioritySelected");
    two.classList.remove("cardPrioritySelected");
    three.classList.remove("cardPrioritySelected");

    //removes styling of the priority exclamation mark in list view
    document
        .querySelector(`[data-priorityid = "${id}"]`)
        .classList.remove("cardPriorityOne");
    document
        .querySelector(`[data-priorityid = "${id}"]`)
        .classList.remove("cardPriorityTwo");
    document
        .querySelector(`[data-priorityid = "${id}"]`)
        .classList.remove("cardPriorityThree");

    switch (priority) {
        case 1:
            one.classList.add("cardPrioritySelected"); //Marks priority one as selected
            document
                .querySelector(`[data-priorityid = "${id}"]`)
                .classList.add("cardPriorityOne"); //Marks relevant exclamation mark in the list view as corresponding priority
            break;
        case 2:
            two.classList.add("cardPrioritySelected"); //Marks priority two as selected
            document
                .querySelector(`[data-priorityid = "${id}"]`)
                .classList.add("cardPriorityTwo"); //Marks relevant exclamation mark in the list view as corresponding priority
            break;
        case 3:
            three.classList.add("cardPrioritySelected"); //Marks priority three as selected
            document
                .querySelector(`[data-priorityid = "${id}"]`)
                .classList.add("cardPriorityThree"); //Marks relevant exclamation mark in the list view as corresponding priority
            break;
    }

    //This changes the priority attribute of the todo object
    Projectmanager.getProjectById(currentProjectID).changePriority(
        id,
        priority
    );
}

/* ------------------- Due Date ----------------------- */

function generateDueDate(todo) {
    //Add Due Date
    const cardDue = document.createElement("div");
    cardDue.setAttribute("id", "cardDueDiv");

    const cardDueText = document.createElement("p");
    cardDueText.innerHTML = "Select a due date:";
    cardDueText.setAttribute("id", "cardDueText");

    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("name", "dueDate");
    dateInput.setAttribute("id", "dueDate");
    if (todo.due) {
        //displays due date in date input field if it has already been set
        dateInput.setAttribute("value", `${format(todo.due, "yyyy-MM-dd")}`);
    }

    //When the date is input/changed, it saves the date in the todo object and adds it to the todo item in the list view
    dateInput.addEventListener("input", () => {
        const date = new Date(dateInput.valueAsDate);
        Projectmanager.getProjectById(currentProjectID).changeDue(
            todo.id,
            format(date, "do MMM yyyy")
        ); //change due date in todo object array
        document.querySelector(`[data-dateindex = "${todo.id}"]`).innerHTML =
            todo.due;
    });

    cardDue.appendChild(cardDueText);
    cardDue.appendChild(dateInput);

    return cardDue;
}

/* ------------------- Notes ----------------------- */

function generateNotes(todo) {
    const notesSection = document.createElement("div");
    const notesLabel = document.createElement("label");
    const notesText = document.createElement("textarea");
    notesLabel.setAttribute("for", "notes");
    notesLabel.innerHTML = "Notes";
    notesText.setAttribute("id", "notes");
    notesText.setAttribute("placeholder", "Add notes..");
    notesSection.classList.add("notesDiv");
    notesSection.appendChild(notesLabel);
    notesSection.appendChild(notesText);

    if (todo.note) {
        //if note for todo has been defined already, display the note in the textarea
        notesText.innerHTML = todo.note;
    }

    notesText.addEventListener("input", () => {
        Projectmanager.getProjectById(currentProjectID).changeNote(
            todo.id,
            notesText.value
        ); //if note is input then save note in todo element
    });

    return notesSection;
}

/* ------------------- Checklist ----------------------- */

function generateChecklist(todo) {
    const checklist = document.createElement("div");
    checklist.classList.add("checklistDiv");

    const header = document.createElement("p");
    header.classList.add("checklistHeader");
    header.innerHTML = "Checklist";

    const list = document.createElement("ul");
    list.classList.add("list");

    const newItem = document.createElement("input");
    newItem.classList.add("newItem");
    newItem.setAttribute("placeholder", "+");
    newItem.setAttribute("type", "text");

    //Loads the existing checklist
    todo.checklist.forEach((item) => {
        const newLi = document.createElement("li");
        newLi.classList.add("checklistItem");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkboxChecklist");

        //This removes the DOM Item and the actual item from the checklist array in the todo object
        checkbox.addEventListener("click", () => {
            checkbox.parentElement.remove();
            Projectmanager.getProjectById(currentProjectID).removeCheckListItem(
                todo.id,
                checkbox.nextElementSibling.innerHTML
            );
        });

        const label = document.createElement("p");
        label.classList.add("checkboxLabel");
        label.innerHTML = item;

        newLi.appendChild(checkbox);
        newLi.appendChild(label);
        list.appendChild(newLi);
    });

    //logic when a new checklist item is added
    newItem.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            Projectmanager.getProjectById(currentProjectID).addChecklistItem(
                todo.id,
                newItem.value
            );

            const newLi = document.createElement("li");
            newLi.classList.add("checklistItem");

            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.classList.add("checkboxChecklist");

            //This removes the DOM Item and the actual item from the checklist array in the todo object
            checkbox.addEventListener("click", () => {
                checkbox.parentElement.remove();
                Projectmanager.getProjectById(
                    currentProjectID
                ).removeCheckListItem(
                    todo.id,
                    checkbox.nextElementSibling.innerHTML
                );
            });

            const label = document.createElement("p");
            label.classList.add("checkboxLabel");
            label.innerHTML = newItem.value;

            newLi.appendChild(checkbox);
            newLi.appendChild(label);
            list.insertBefore(newLi, newItem);

            newItem.value = "";
        }
    });

    checklist.appendChild(header);
    list.appendChild(newItem);
    checklist.appendChild(list);

    return checklist;
}

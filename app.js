//caricamento della lista in local storage
function loadList() {
    if (localStorage.listItems) return JSON.parse(localStorage.listItems);

    return [
        { text: 'Buy coffee', completed: true },
        { text: 'Buy milk', completed: false },
        { text: 'Disco dance', completed: false }
    ];
}

var listItems = loadList();

//contatore elementi completati
function updateCounters(){
    var completedCount = 0;
    
    listItems = listItems.filter(item => {
        if(item.completed){
            completedCount++;
            console.log(completedCount);
        } 
        return !item.completed;
    });

    document.querySelector('.filter-all').dataset.count = listItems.length;
    document.querySelector('.filter-active').dataset.count = listItems.length - completedCount;
    document.querySelector('.filter-completed').dataset.count = completedCount;
    
}

//render del template 
function renderItem(item) {
    var template = document.getElementById("item-template").innerHTML;
    return template.replace('_TEXT_', item.text);
}

//caricamento della lista   
function updateList(items, save) {
    var listElement = document.getElementById("task-list");
    listElement.innerHTML = '';

    items.forEach(function (item) {
        listElement.innerHTML += renderItem(item)
    });

   
    if (save) {
        localStorage.listItems = JSON.stringify(items)
    }

    updateCounters();
}

//creazione di un nuovo item
function createNew(event) {
    event.preventDefault();

    var newItemElement = document.getElementById("new-item");
    var newItemValue = newItemElement.value.trim();

    if (!newItemValue) return;
    listItems.push({ text: newItemValue, completed: false });
    newItemElement.value = '';

    updateList(listItems, true);
}

//rimozione di un elemento della lista
function removeItem(event) {
    var clickedItemText = event.target.previousElementSibling.innerHTML;

    listItems = listItems.filter(item => {
        return clickedItemText != item.text;
    });

    updateList(listItems, true);
}

//visione stato della lista
function toggleStatus(event) {
    var clickedItemText = event.target.innerHTML;

    listItems.forEach(item => {
        if (clickedItemText == item.text) {
            item.completed = !item.completed;
        }
    });

    updateList(listItems, true);
}

//filtro elementi della lista
function filterItems(status) {
    var itemToShow = [];

    if (status == 'completed') {
        itemToShow = listItems.filter(item => {
            return item.completed;
        });
    } else if (status == 'active') {
        itemToShow = listItems.filter(item => {
            return !item.completed;
        });
    } else {
        itemToShow = listItems;
    }

    updateList(itemToShow);
}

//pulizia lista completata
function clearCompleted(){
    listItems = listItems.filter(item =>{
        return !item.completed;
    });

    updateList(listItems, true);
}

updateList(listItems);




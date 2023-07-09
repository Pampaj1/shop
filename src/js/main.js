/*

myFunction() {

}
myFunction()

// Expresia
( function() {} )()

(() => {

})();

//Arrow function
const myFunction = () => {

} 

//annonymous function
function(){

}

//annonymous arrow function
() => {

}


Zobacz se co to recurrsion functions (reoccuring function)

*/


/*
function onButtonClick() {
    saveItemToItems(newItem());
}

btn_submit.addEventListener('click', onButtonClick);
btn_submit.removeEventListener('click', onButtonClick);





i to sie nazywa 'index'
    i++ or ++i   to i += 1   lub i = i + 1
    i-- or --i   to i -= 1   lub i = i - 1

    * Big O diagram 
*/



let btn_submit = document.querySelector("#menu button[type='button']");

btn_submit.addEventListener('click', () => {
    saveItemToItems(newItem());
});



function newItem() {
    
    let obj_title = document.querySelector("#menu input[name='objectTitle']");
    let obj_price = document.querySelector("#menu input[name='objectPrice']");

    let title_value = obj_title.value;
    let price_value = obj_price.value;

    // If no price nor title length, "early-return"
    // Jeżeli długość ceny lub tytułu jest pusta, to przerwij dalsze akcje
    if (price_value.length <= 0
    ||  title_value.lenght <= 0) return;

    // ustawia id pustej listy na 0 zamiast undefined
    let id = getItemWithBiggestIDFromItemsList();
        id = (id === undefined) ? 0 : id;

    // Construct new item
    let item  = { id, title_value, price_value }


    console.table({
        "id":[item.id, item.id.length],
        "title":[item.title_value, item.title_value.length],
        "value":[item.price_value, item.price_value.length]

    });


    return item;
}



function getItemWithBiggestIDFromItemsList() {
    
    let list = getOrCreateEmptyItemsList();
    if (!list.length) return; // early-return

    let biggest_id = -1;
 
    // Zapetl (iteruj po instancjach listy)
    for (let i = 0; i < list.length; i++) {
        let item = list[i];

        
        if (item.id > biggest_id) {
            biggest_id = item.id;
        }
    }

    return biggest_id;
}



function getOrCreateEmptyItemsList() {
    let items = undefined;

    try {
        items = JSON.parse(localStorage.getItem("items") || "");
    }
    catch (error) {
        items = [];
        console.error(error);
    }

    return items;
}



function saveItemToItems(item) {
    // item  = { title_value, price_value } from newItem();
    console.log(item);
    if (!item) return; // early-return if item is 'empty' or 'undefined' or 'false'


    // undefined - null - false
    localStorage.getItem("items");

    let items = getOrCreateEmptyItemsList();

    // Zapisz nowy item do localStorage 'items' listy
    items.push(item);

    // Zapisz liste itemów jako text w formie JSON
    localStorage.setItem("items", JSON.stringify(items)); 
}

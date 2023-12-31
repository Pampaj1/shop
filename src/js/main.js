/*

// funkcja / function
myFunction() {}
myFunction()


function myFunction() {
    return; (return 'undefined' by default)
    // dalej kod nie będzie działać po 'return'
}


// Recursive function / funkcja ktura się sama powtaża
function myFunction() {
    myFunction();
}


//Annonymous function / Anonimowa funkcja, czyli bez nazwy
function(){ ... }

//Arrow function
const myFunction = () => { ... } 

//Annonymous arrow function
() => { ... }




// Expresia ()

// Self invoking function / Funkcja ktura się sama włancza po deklaracji
( function() {
    console.log('Hello World!');
} )()

// To samo co na góże ale z annonymous arrow function
(() => {
    console.log('Hello World!');
})();


// Asynchroniczna funkcja (zaawansowane, wszystkie funkcje są synchroniczne z defaultu)
// Głównie je używamy kiedy na coś czekamy. Zajebistę do API, Promises, Fetch itd.
async myFunction() { ... }
const myFunction = async () => { ... }

function onButtonClick() {
    saveItemToItems(newItem());
}

btn_submit.addEventListener('click', onButtonClick);
btn_submit.removeEventListener('click', onButtonClick);





'i' się nazywa 'index', więc
'j' to 'jndex'

// Integracja
i++ or ++i   to i += 1   lub i = i + 1
i-- or --i   to i -= 1   lub i = i - 1

// Big-O Diagram na rozważanie wydajności oprogramowania na dużej skali






// Iteracja list i objektów (hashmapów w js)
    
let arr = [
    {},
    {},
    { item_price: 543545 },
    {}
]

arr[2].item_price
    

let arr = [ {},{}, { item_price: "543545" } ] or []




// Powtóż 5 razy
for (let i = 0; i < 5; i++) {

}



*/



// Nowy item
function newItem() {
    
    // Weź uzyskaj dostęp do DOM elementu <input>:
    let obj_title = document.querySelector("#menu input[name='objectTitle']");
    let obj_price = document.querySelector("#menu input[name='objectPrice']");

    // Weź uzyskaj walutę z <inputów>
    let title_value = obj_title.value;
    let price_value = obj_price.value;

    /* If no price nor title length, then "early-return" with error message
       Jeżeli długość ceny lub tytułu jest pusta, to przerwij dalsze akcje
    
      .replaceAll(/\s/g, "")
      .replaceAll(zaznacz_text, wymień_zaznaczone_na)

      https://regexr.com/ (Regularne Wyrażenie | RegExp)
      RegExp: /\s/g       (Ten RegExp kod zaznacza białą/pustą przestrzeń)

    */
    if (title_value.replaceAll(/\s/g, "").length <= 0
    ||  price_value.replaceAll(/\s/g, "").length <= 0)
        return console.error('Uzupełnij formę');

    // Weź największy ID 'itemu' z listy 'items' (localStorage)
    // Kiedy nie ma itemów, daj 'false' (return 'false')
    let biggest_id = getItemWithBiggestIDFromItemsList();

    // Jeżeli największe 'id' nie jest z identifikowane, to ustaw je na -1
    if (biggest_id === false) biggest_id = -1;

    ++biggest_id; // Zwiększ zawartość 'biggest_id' o 1 (inkrementacja)

    // Stwóż nowy object 'item'
    let item = {
        id: biggest_id,
        title_value,
        price_value
    }
    
    // Wydrukuj dane nowego itema w konsoli, i podaj 'item' dalej / return 'item'.
    console.table({ "new item" : item });
    return item;
}



// Weź itema z największym ID z listy itemów
function getItemWithBiggestIDFromItemsList() {
    
    let list = getOrCreateEmptyItemsList();
    let biggest_id = -1;
 
    // Zapetl (iteruj po instancjach listy)
    for (let i = 0; i < list.length; i++)
    {
        let item = list[i];
        
        // Updejtuj 'biggest_id' na największy ID itemu z listy itemów
        if (item.id > biggest_id) {
            biggest_id = item.id;
        }
    }

    // Return 'false' or 'biggest_id'
    if (biggest_id < 0) {
        console.error('Niema elementów w liscie z kluczem "id" do porównania \'biggest_id\'');
        return false;
    }
    else {
        return biggest_id;
    }
}



// Weź lub stwóż pustą listę itemów
function getOrCreateEmptyItemsList() {
    let items = undefined;

    // Sprópuj wykonać następującą komende
    try {
        // Weź uzyskaj itemy z localStorage i zamień itemów strukture JSON w JavaScript object.
        items = JSON.parse(localStorage.getItem("items") || "");
    }
    // Jeżeli nastąpił błąd, zgłoś problem w konsoli i ustaw 'items' na pustą listę.
    catch (error) {
        items = [];
        console.error(error);
    }

    return items;
}



// Zapisz itema do itemów
function saveItemToItems(item) {
    // item  = { id, title_value, price_value } from newItem();
    // item.id is a WholeNumber

    /* early-return If 'item' is empty: [undefined, null, 0 or false].
     
       (0) = false
       (1) = true

       Więc (!0) = true;
    */
    if (!item) return;

    let items = getOrCreateEmptyItemsList();
        items.push(item); // dodaj 'item' do listy 'items'

    // Zapisz liste itemów jako text w formie JSON w localStorage
    localStorage.setItem("items", JSON.stringify(items)); 
    
}



function deleteItemFromItems(item_id) {
    // item  = { id, title_value, price_value } from newItem();
    // item.id is a WholeNumber

    // early-return: If item_id is not a number, then stop the script.
    if (isNaN(item_id)) return;

    let items = getOrCreateEmptyItemsList();
    // items = [ { id: 0 }. { id: 1 }, { id: 2} ];

    for (let i = 0; i < items.length; i++) {
        if ( item_id === items[i].id) {
            items.splice(i, 1)
            break;
        }
    }

    // Zapisz liste itemów jako text w formie JSON w localStorage
    localStorage.setItem("items", JSON.stringify(items));
    
    
}


function appendItemToDisplay(item) {
    // item  = { id, title_value, price_value } from newItem();

    let id = item.id;
    let title = item.title_value;
    let price = item.price_value;

    // Kiedy klikne przycisk 'X' to usuń mi itemka z display i localStorage
    const deleteItem = (btn) => {
        let parentElement = btn.parentElement;
        parentElement.remove();
        deleteItemFromItems(id);
    }

    // Skonstuuj guzika 'X'
    let btn = document.createElement('button');
        btn.innerHTML = "<i class=\"gg-remove-r\"></i>";
        btn.className = "btn btn-outline-dark border-0 p-1 border-rounded-1";
        btn.style = "position: absolute; top: 3px; right: 3px;";  
        btn.onclick = () => { deleteItem(btn) }

    // Skonstruuj itemka dla display
    let div = document.createElement('div');
        div.className = "item box";
        div.innerHTML = `
            <img class="photo" src="#" alt="item image"></img>
            <p class="title">${title}</p>
            <p class="price">${price}</p>
        `;

    // Weź contyner itemów, i wyczyść go
    let container = document.getElementById('container-items');

    div.append(btn);
    container.append(div);

    
}



// Wyświetl zapisane itemy
function displaySavedItems() {
    
    let items = getOrCreateEmptyItemsList();
    if (!items) return; // early-return

    // Skonstruuj wszystkie parametry dla przedmiotu (itemka)
    for (let i = 0; i < items.length; i++) {
        let item = items[i];

        // Dodaj itemka do display
        appendItemToDisplay(item);
    }
}



// ----------------------- MAIN CODE ---------------------------------------------------------------------------------------------------



displaySavedItems();


// Weź uzyskaj dostęp do DOM elementu <button>:
let btn_submit = document.querySelector("#menu button[type='button']");

// Dodaj 'klik' event do przycisku <button>
btn_submit.addEventListener('click', () => {
    let item = newItem();
    if (!item) return; // early-return

    // Sapisz nowy item do listy itemów i umieść go na display
    saveItemToItems(item);
    appendItemToDisplay(item);
});







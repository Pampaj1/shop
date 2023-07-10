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




// Weź uzyskaj dostęp do DOM elementu <button>:
let btn_submit = document.querySelector("#menu button[type='button']");

// Dodaj 'klik' event do przycisku <button>
btn_submit.addEventListener('click', () => {
    // Sapisz nowy item do listy itemów
    saveItemToItems(newItem());
    displaySavedItems();
});

displaySavedItems();




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

    /* early-return If 'item' is empty: [undefined, null, 0 or false].
     
       (0) = false
       (1) = true

       Więc (!0) = true;
    */
    if (!item) return;

    let items = getOrCreateEmptyItemsList();
        items.push(item); // dodaj 'item' do listy 'items'

    // Zapisz liste itemów jako text w formie JSON
    localStorage.setItem("items", JSON.stringify(items)); 
}


// Wyświetl zapisane itemy
function displaySavedItems() {
    
    let items = getOrCreateEmptyItemsList();
    if (!items) return; // early-return

    // Weź contyner itemów, i wyczyść go
    let container = document.getElementById('container-items');
        container.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        let title = items[i].title_value;
        let price = items[i].price_value;
    
        let btn = document.createElement('button');
            btn.className = "btn btn-dark px-2 pb-1";
            btn.style = "position: absolute; top: 5px; right: 10px;";
            btn.innerText = "x";
            btn.onclick = (event) => {
                let parentElement = event.target.parentElement;
                parentElement.remove();
            }

        let div = document.createElement('div');
        div.className = "item box";
        div.innerHTML = `
            <img class="photo" src="#" alt="item image"></img>
            <div class="title">${title}</div>
            <div class="price">${price}</div>
        `;
        div.append(btn);
        container.append(div);
    }
}

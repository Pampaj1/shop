let btn_submit = document.querySelector("#menu button[type='button']");

btn_submit.addEventListener('click', newItem);

function newItem() {
    
    let obj_title = document.querySelector("#menu input[name='objectTitle']");
    let obj_price = document.querySelector("#menu input[name='objectPrice']");

    let title_value = obj_title.value;
    let price_value = obj_price.value;

    // If no price nor title length, "early-return"
    // Jeżeli długość ceny lub tytułu jest pusta, to przerwij dalsze akcje
    if (price_value.length === 0
    ||  title_value.lenght === 0) return;

    console.table({
        "title_length" : [title_value, title_value.length],
        "price_length" : [price_value, price_value.length]
    });


    // Zapisz nowy item do localStorage 'items' listy
    let items = JSON.parse(localStorage.getItem("items"));
    if (!Array.isArray(items)) throw new Error('localStorage "items" is not a list!');
        

    let item  = { title_value, price_value }
        items.push(item);

    // Zapisz liste itemów jako text w formie JSON

    localStorage.setItem("items",JSON.stringify(items)); 
}
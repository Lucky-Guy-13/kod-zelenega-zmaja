// Окно входа в аккаунт


let loginButton = document.querySelector(".button_symbol.login");
let loginBackground = document.getElementById("loginBackground");
let loginClose = document.getElementById("loginClose");

loginButton.addEventListener("click", function() {
    loginBackground.classList.add("active");
})

loginClose.addEventListener("click", function() {
    loginBackground.classList.remove("active");
})

loginBackground.addEventListener("click", function(event) {
    if (event.target === loginBackground) {
        loginBackground.classList.remove("active");
    }
})


// Окно корзины


let basketButton = document.querySelector(".head_basket_button");
let basketWindow = document.getElementById("basketWindow");

basketButton.addEventListener("click", function() {
    basketWindow.classList.toggle("visible");
})


// Работа корзины


let products_array = [
    {name: "Эспрессо классический", price: 200, count: 0},
    {name: "Круассан ванильный", price: 120, count: 0},
    {name: "Растительное молоко", price: 100, count: 0},
    {name: "Чай травяной", price: 270, count: 0},
    {name: "Чизкейк шоколадный", price: 260, count: 0}
]

function updateBasket() {
    let total = 0;
    products_array.forEach(function(product) {
        total = total + (product.count*product.price);
    });
    let emptyBasket = document.getElementById("basketEmpty");
    let basketWindowButtons = document.querySelectorAll(".basket_window_button");
    if (total === 0) {
        document.querySelector(".head_basket_button").innerHTML = `<img class = "symbol" src = "https://images.icon-icons.com/1796/PNG/512/shoppingbasket2_114884.png">|&emsp;${total} ₽`;
        emptyBasket.style.display = "block";
        for (let i = 0; i < basketWindowButtons.length; i++) {
            basketWindowButtons[i].style.display = "none";
        }
    } else {
        document.querySelector(".head_basket_button").innerHTML = `<img class = "symbol" src = "https://images.icon-icons.com/1796/PNG/512/shoppingbasket2_114884.png">| ${total} ₽`;
        emptyBasket.style.display = "none";
        for (let i = 0; i < basketWindowButtons.length; i++) {
            basketWindowButtons[i].style.display = "block";
        }
    }
}

function updateBasketWindow(index) {
    let product = products_array[index];
    let menuitem = document.getElementById("menuitem-" + index);
    if (product.count > 0) {
        menuitem.innerHTML = `
            <p class = "basket_object">${product.name}, ${product.count} шт.</p>
            <p class = "basket_price">${product.count*product.price} ₽</p>
        `;
    } else if (product.count === 0) {
        menuitem.innerHTML = `
            <div class = "row_divider"></div>
        `;
    };
}

function updateCardButton(index) {
    let product = products_array[index];
    let row = document.getElementById("row-" + index);

    if (product.count === 0) {
        row.innerHTML = `
            <div class = "page_card_price">${product.price} ₽</div>
            <button class = "page_card_basket_button" product-index = "${index}">В корзину</button>
        `;
    } else {
        row.innerHTML = `
            <div class = "page_card_price">${product.price} ₽</div>
            <div>
                <button class = "page_card_counter_button minus" product-index = "${index}">-</button>
                <span class = "counter_value">${product.count}</span>
                <button class = "page_card_counter_button plus" product-index = "${index}">+</button>
            </div>
        `;
    }
    attachRowEvents(index);
}

function attachRowEvents(index) {
    let row = document.getElementById("row-" + index);
    let addButton = row.querySelector(".page_card_basket_button");
    if (addButton) {
        addButton.addEventListener("click", function() {
            products_array[index].count++;
            updateCardButton(index);
            updateBasket();
            updateBasketWindow(index);
        });
    }
    let plusButton = row.querySelector(".plus");
    if (plusButton) {
        plusButton.addEventListener("click", function() {
            products_array[index].count++;
            updateCardButton(index);
            updateBasket();
            updateBasketWindow(index);
        });
    }
    let minusButton = row.querySelector(".minus");
    if (minusButton) {
        minusButton.addEventListener("click", function() {
            if (products_array[index].count > 0) {
                products_array[index].count--;
                updateCardButton(index);
                updateBasket();
                updateBasketWindow(index);
            }
        });
    }
}

let PurifierButton = document.getElementById("PurifierButton");
PurifierButton.addEventListener("click", function () {
    for (let i = 0; i < products_array.length; i++) {
        products_array[i].count = 0;
    }
    for (let i = 0; i < products_array.length; i++) {
        updateCardButton(i);
        updateBasketWindow(i);
    }
    updateBasket();
})


for (let i = 0; i < products_array.length; i++) {
    attachRowEvents(i);
}
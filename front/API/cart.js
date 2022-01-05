//------------fonction qui récupere les données du LocalStorage--------------


let dataStorage = JSON.parse(localStorage.getItem("panierStorage"));


//------------fonction qui calcul la quantité total--------------


function totalQuantity() {
    let totalQuantity = document.querySelector("#totalQuantity");
    let quantityProduct = document.querySelector('.itemQuantity');
    let totalQuantities = 0;
    quantityProduct.forEach(quantity =>{
    totalQuantities += Number(quantity.value);
    })
}


//------------fonction qui calcul le prix total--------------


function totalPrice() {
    let totalPrice = document.querySelector("#totalPrice");
    let priceItem = document.querySelector(".priceItem")
    let total = 0;
    priceItem.forEach(price => {
        total += Number(price.textContent);
    })
}

// faire un DOM pour placer dans html

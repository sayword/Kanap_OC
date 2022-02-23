//------------fonction qui récupere les données du LocalStorage--------------


//------------- FONCTION AJOUT PANIER-----------------------------
function add2Cart(id, color, qty) {
  let productInCart = localStorage.getItem('productInCart');

  let find = productInCart.find(
    (data) => data.id === id && data.color === color);

  // si il n'y a rien dans le panier
  if (productInCart === null) {
    let tabPanier = [
      [id, color, parseInt(qty)]
    ];
    let tabPanierStr = JSON.stringify(tabPanier)
    localStorage.setItem('productInCart', tabPanierStr)
  }
  // sinon, si il a trouver le meme produit dans le panier, alors j'ajoute juste la quantité 
  else if (find) {
    let tabPanier = [
      [id, color, parseInt(qty)]
    ];
    let newQty =
    parseInt(tabPanier.qty) + parseInt(find.qty);
    find.qty = newQty;
    let tabPanierStr = JSON.stringify(tabPanier)
    localStorage.setItem('productInCart', tabPanierStr)
  } 
  // ou sinon tu ajoute l'élément au panier en gardant les éléments qui sont déjà dans le panier
  else {
    let tabPanier = [
      [id, color, parseInt(qty)]
    ];
    productInCart.push(tabPanier);
    let tabPanierStr = JSON.stringify(tabPanier)
    localStorage.setItem('productInCart', tabPanierStr)
  }
}

//-------fonction qui calcul la quantité total-----

function totalQuantity() {
  let totalQuantity = document.querySelector("#totalQuantity");
  let quantityProduct = document.querySelector('.itemQuantity');
  let totalQuantities = 0;
  quantityProduct.forEach(quantity =>{
  totalQuantities += Number(quantity.value);
  })
}

//----------fonction qui calcul le prix total---------

function totalPrice() {
  let totalPrice = document.querySelector("#totalPrice");
  let priceItem = document.querySelector(".priceItem")
  total = 0;
  priceItem.forEach(price => {
      total += Number(price.textContent);
  })
}

// faire un DOM pour placer dans html
// j'essaye de faire avec la méthode find mais je crois que c'est pas du tout bon
let produitId = productInCart.find(element => {
  return element.id
})
let produitColor = productInCart.find(element => {
  return element.color
})
function showProduct(produitId, produitColor, quantity){
  return `
         <article class="cart__item" data-id="${produitId}" data-color="${produitColor}">
                 <div class="cart__item__img">
                   <img src=${.imageUrl} alt="${.altTxt}">
                 </div>
                 <div class="cart__item__content">
                   <div class="cart__item__content__titlePrice">
                     <h2>${.name}</h2>
                     <p>${produitColor}</p>
                     <p id="price">${.price}.00 €</p>
                   </div>
                   <div class="cart__item__content__settings">
                     <div class="cart__item__content__settings__quantity">
                       <p>Qté : </p>
                       <input id="qty_${produitId}_${produitColor}" onchange="changeQuantity('${produitId}','${produitColor}')" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
                     </div>
                     <div class="cart__item__content__settings__delete">
                       <button class="deleteItem" onclick="deleteProduct('${produitId}','${produitColor}')">Supprimer</button>
                     </div>
                   </div>
                 </div>
               </article>`;
}


// -------------FORMULAIRE--------------
// Recuperation des éléments + regex  

let firstName = document.getElementById('firstName');
let regexName = /^[a-z ,.'-]+$/i;
let errorFirstName = document.getElementById('firstNameErrorMsg');

let lastName = document.getElementById('lastName');
let errorLastName = document.getElementById('lastNameErrorMsg');

let address = document.getElementById('address');
let regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
let errorAddress = document.getElementById('addressErrorMsg');

let city = document.getElementById('city');
let regexCity=/^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
let errorCity = document.getElementById('cityErrorMsg');

let email = document.getElementById('email');
let regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let errorEmail = document.getElementById('emailErrorMsg');

let order = document.getElementById('order');

//--------------------------------
//Erreur en cas de non respect du regex

firstName.addEventListener('input',(e)=>{
  e.preventDefault();
  if (regexName.test(firstName.value)==false) {
      errorFirstName.innerHTML = "Veuillez saisir votre prénom";
  }else{
      errorFirstName.innerHTML = "";
  }
});

lastName.addEventListener('input',(e)=>{
  e.preventDefault();
  if (regexName.test(lastName.value)==false) {
      errorLastName.innerHTML = "Veuillez saisir votre nom";
  }else{
      errorLastName.innerHTML = "";
  }
});

address.addEventListener('input',(e)=>{
  e.preventDefault();
  if (regexAddress.test(address.value)==false) {
      errorAddress.innerHTML = "Veuillez saisir une vraie adresse";
  }else{
      errorAddress.innerHTML = "";
  }
});

city.addEventListener('input',(e)=>{
  e.preventDefault();
  if (regexCity.test(city.value)==false) {
      errorCity.innerHTML = "Veuillez saisir une vraie ville";
  }else{
      errorCity.innerHTML = "";
  }
});

email.addEventListener('input',(e)=>{
  e.preventDefault();
  if (regexEmail.test(email.value)==false) {
      errorEmail.innerHTML = "Email incorrect";
  }else{
      errorEmail.innerHTML = "";
  }
});

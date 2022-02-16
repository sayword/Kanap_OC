//------------fonction qui récupere les données du LocalStorage--------------

function add2Cart(id, color, qty) {
    let productInCart = localStorage.getItem('productInCart');

		// je créer un tableau pour recup l'id du produit, sa couleur et sa quantité
		if (productInCart === null) {
			let tabPanier = [
				[productId, productColor, parseInt(productQuantity)]
			];
			//conversion valeur en json
			let tabPanierStr = JSON.stringify(tabPanier)
			localStorage.setItem('productInCart', tabPanierStr)
		}
		// si le panier n'est pas vide, alors on push entre l'ancien et le nouveau pour les melanger 
		else {
			let tabPanier = JSON.parse(productInCart);
			tabPanier.push ([productId, productColor, productQuantity])
			let tabPanierStr = JSON.stringify(tabPanier) 
			localStorage.setItem('productInCart', tabPanierStr)
			// faire un autre else si l'id et color est deja dans le panier
			// et ensuite rediriger l'utilisateur directement vers la page panier une fois qu'il a appuyer sur le btn ?
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

function showProduct(data, color, quantity){

    return `
           <article class="cart__item" data-id="${data._id}" data-color="${color}">
                   <div class="cart__item__img">
                     <img src=${data.imageUrl} alt="${data.altTxt}">
                   </div>
                   <div class="cart__item__content">
                     <div class="cart__item__content__titlePrice">
                       <h2>${data.name}</h2>
                       <p>${color}</p>
                       <p id="price">${data.price}.00 €</p>
                     </div>
                     <div class="cart__item__content__settings">
                       <div class="cart__item__content__settings__quantity">
                         <p>Qté : </p>
                         <input id="qty_${data._id}_${color}" onchange="changeQuantity('${data._id}','${color}')" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
                       </div>
                       <div class="cart__item__content__settings__delete">
                         <button class="deleteItem" onclick="deleteProduct('${data._id}','${color}')">Supprimer</button>
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


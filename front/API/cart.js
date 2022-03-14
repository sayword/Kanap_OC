//------------fonction qui récupere les données du LocalStorage--------------

//recup avec un fetch les données du produit

//------------- FONCTION AJOUT PANIER-----------------------------

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
// j'essaye de faire avec la méthode forEach
productInCart.forEach(item => {
        
  let cartArticles = document.getElementById("cart__items")

  let article = document.createElement("article");
      article.classList.add("cart__item");
      article.setAttribute("data-id", item.id)
      cartArticles.appendChild(article);
  
  let cartImg = document.createElement("div");
      cartImg.classList.add("cart__item__img");
      article.appendChild(cartImg);

  let imgItem = document.createElement("img");
      cartImg.appendChild(imgItem);
      imgItem.src = item.image;      
      
  // calcul qty total + prix total
  totalPrice()
  totalQuantity()

});


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

//je recup l'id du bouton pour faire un event
let order = document.getElementById('order');
order.addEventListener('click',(event)=>{
  event.preventDefault();
  let contact = {
      firstName : firstName.value,
      lastName : lastName.value,
      address : address.value,
      city : city.value,
      email : email.value,
  }


  // si le client n'a pas bien rempli les champs alors on affiche un message d'erreur
  if (firstName.value === ""|| lastName.value === ""|| address.value === "" || city.value === "" || email.value === "") {
      alert("Vous n'avez pas bien rempli le formulaire")
        // sinon, j'envoi mon tableau     
  }else{
      fetch(('http://localhost:3000/api/products/order'),{
          method: "POST",
          headers :{'Accept':'application/json','Content-type':'application/json'},
          body : JSON.stringify(contact)
      })}
});

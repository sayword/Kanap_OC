//------------fonction qui récupere les données du LocalStorage-----------
let produitLocalStorage = JSON.parse(localStorage.getItem("productInCart"));
//------------- FONCTION AJOUT PANIER-----------------------------
function add2Cart(id, color, qty) {
  let productInCart = localStorage.getItem('productInCart');
  // si il n'y a rien dans le panier
  if (productInCart === null) {
  let tabPanier = 
    {
      'id' : id,
      'couleur' : color,
      'quantité' : qty
    };
    // je met le tabpanier dans un tableau ici
    let u = [tabPanier]
  let tabPanierStr = JSON.stringify(u)
  localStorage.setItem('productInCart', tabPanierStr)

  }
  else {
  //parse ici
  let produitLocalStorage = JSON.parse(localStorage.getItem("productInCart"));
  //
  let p = []
  p.push(produitLocalStorage)

  const resFind = p[0].find(
    (el) => el.id === id && el.couleur === color);
  // sinon, si il a trouver le meme produit dans le panier, alors j'ajoute juste la quantité 
  if (resFind) { //
    let newQty = parseInt(qty) + parseInt(resFind.quantité);
    resFind.quantité = newQty;
    p.push(newQty);
    let tabPanierStr = JSON.stringify(produitLocalStorage) // ici j'ai remplacer le tabpanier productInCart
    localStorage.setItem('productInCart', tabPanierStr)
  } 

  // ou sinon tu ajoute l'élément au panier en gardant les éléments qui sont déjà dans le panier
  else {

    let tabPanier = 
    {
      'id' : id,
      'couleur' : color,
      'quantité' : qty
    };
    produitLocalStorage.push(tabPanier);
    let tabPanierStr = JSON.stringify(produitLocalStorage)
    localStorage.setItem('productInCart', tabPanierStr)

    
  }
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
  let priceItem = document.querySelector("#price")
  total = 0;
  priceItem.forEach(price => {
      total += Number(price.textContent);
  })
}

function formulaire() {
// faire un DOM pour placer dans html
// j'essaye de faire avec la méthode for
  let productCart = JSON.parse(localStorage.getItem("productInCart"));

  if (productCart === null) {
  
  }
  else{
    //      let tab = p[0];
    let prixTotal = 0
    let p = []
    let r = -1
    p.push(productCart)
    let articles = document.getElementById("cart__items")
    let aValue = localStorage.getItem('productInCart');
    for ( i = 0; i < p.length; i++) {
      p[0].forEach(object =>{
      let tab = p[0];
      fetch("http://localhost:3000/api/products/" + object.id)
        .then((res) => res.json())
        .then((data) => {
            let div = document.createElement('div');
            div.innerHTML = `
            <article class="cart__item" data-id="${object.id}" data-color="${object.couleur}">
                    <div class="cart__item__img">
                      <img src=${data.imageUrl} alt="${data.altTxt}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__titlePrice">
                        <h2>${data.name}</h2>
                        <p>${object.couleur}</p>
                        <p id="price">${data.price} €</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : ${object.quantité} </p>
                          <input id="qty_${data._id}_${object.couleur}" onchange="changeQuantity('${data._id}','${object.couleur}')" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${tab.quantité}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <button class="deleteItem"  id="${data._id}" ">Supprimer</button>
                        </div>
                      </div>
                    </div>
                  </article>`
            articles.appendChild(div)
            let ele = document.getElementById('totalPrice');
            prixTotal =  (data.price * object.quantité) + prixTotal
            document.querySelector("#totalPrice").innerHTML = prixTotal;
            r = r + 1



            function deleteProduct() {

              let boutonSupr = document.querySelectorAll(".deleteItem");
              console.log(boutonSupr)
                  console.log(r)
                  boutonSupr[r].addEventListener("click" , (event) => {
                      event.preventDefault();
                      let elemDelete = object.id;
                      console.log(elemDelete)
                      produitLocalStorage = produitLocalStorage.filter( elem => elem.id !== elemDelete);
                      localStorage.setItem("productInCart", JSON.stringify(produitLocalStorage));
                      alert("Ce produit a bien été supprimé du panier");
                      location.reload()
                  })              
          }
          
          
          deleteProduct();

          

          


            
        })
      })
    }
  }









// expected output: "012345678"
if (productCart != null){

    let qt = 0
    let length = produitLocalStorage.length
    for (var i = 0; i < length; i++) { 

      qt = parseInt(produitLocalStorage[i].quantité) + qt
      az = parseInt(produitLocalStorage[i].quantité)
      //le total quantité tout les produits
    }
    let elem = document.getElementById('totalQuantity');
    elem.append(qt)

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

 let order = document.getElementById('order');
 
 //je recup l'id du bouton pour faire un event
 order.addEventListener('click',(event)=>{
   event.preventDefault();
   // si le client n'a pas bien rempli les champs alors on affiche un message d'erreur
   if (firstName.value === ""|| lastName.value === ""|| address.value === "" || city.value === "" || email.value === "") {
       alert("Vous n'avez pas bien rempli le formulaire")
         // sinon, j'envoi mon tableau     
   }else{
    let contact = {
      firstName : firstName.value,
      lastName : lastName.value,
      address : address.value,
      city : city.value,
      email : email.value,
  };
  let data = contact;
  fetch(('http://localhost:3000/api/products/order'),{
    method: "POST",
    headers :{'Accept':'application/json','Content-type':'application/json'
    },
    body : JSON.stringify(data)
})
.then(res =>{
    return res.json();
})
.then((data)=>{
//window.location.href =`confirmation.html?orderId=${data.orderId}`;
})  
}
 });
}

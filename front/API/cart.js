//------------récupere les données du LocalStorage-----------
let produitLocalStorage = JSON.parse(localStorage.getItem("productInCart"));
//------------FONCTION AJOUT PANIER--------------------------

function add2Cart(id, color, qty) {
  let productInCart = localStorage.getItem('productInCart');
  // si il n'y a rien dans le panier, je créer un nouveau tableau d'objet
  if (productInCart === null) {
    let tabPanier = {
      'id': id,
      'couleur': color,
      'quantite': qty
    };
    let tabPanier2 = [tabPanier]
    let tabPanierStr = JSON.stringify(tabPanier2)
    localStorage.setItem('productInCart', tabPanierStr)
  }
  else {
    let produitLocalStorage = JSON.parse(localStorage.getItem("productInCart"));
    let tableauProduit = []
    tableauProduit.push(produitLocalStorage)
    const resFind = tableauProduit[0].find((el) => el.id === id && el.couleur === color);
    // sinon, si il a trouver le meme produit dans le panier, alors j'ajoute juste la quantité 
    if (resFind) {
      let newQty = parseInt(qty) + parseInt(resFind.quantite);
      resFind.quantite = newQty;
      tableauProduit.push(newQty);
      let tabPanierStr = JSON.stringify(produitLocalStorage)
      localStorage.setItem('productInCart', tabPanierStr)
    }
    // ou sinon tu ajoute l'élément au panier en gardant les éléments qui sont déjà dans le panier
    else {
      let tabPanier = {
        'id': id,
        'couleur': color,
        'quantite': qty
      };
      produitLocalStorage.push(tabPanier);
      let tabPanierStr = JSON.stringify(produitLocalStorage)
      localStorage.setItem('productInCart', tabPanierStr)
    }
  }
}
//Fonction formulaire() que j'appelle juste dans le cart.html
function formulaire() {
  let productCart = JSON.parse(localStorage.getItem("productInCart"));
  let boucle1 = 0
  let prixTotal = 0
  let tableauProduit = []
  let boucle2 = -1
  tableauProduit.push(productCart)
  let articles = document.getElementById("cart__items")
  for (i = 0; i < tableauProduit.length; i++) {
    tableauProduit[0].forEach(object => {
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
                          <p>Quantité :  </p>
                          <input id="qty_${data._id}_${object.couleur}" onchange="changeQuantity('${data._id}','${object.couleur}')" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${object.quantite}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <button class="deleteItem"">Supprimer</button>
                        </div>
                      </div>
                    </div>
                  </article>`

          articles.appendChild(div)
          prixTotal = (data.price * object.quantite) + prixTotal
          document.querySelector("#totalPrice").innerHTML = prixTotal;
          boucle2 = boucle2 + 1

          function deleteProduct() {
            let boutonSupr = document.querySelectorAll(".deleteItem");
            boutonSupr[boucle2].addEventListener("click", (event) => {
              event.preventDefault();
              let elDelete = object.id;
              let elColor = object.couleur;
              produitLocalStorage = produitLocalStorage.filter(elem => elem.id !== elDelete || elem.couleur !== elColor);
              localStorage.setItem("productInCart", JSON.stringify(produitLocalStorage));
              alert("Ce produit a bien été supprimé du panier");
              location.reload()
            })
          }

          deleteProduct();
          let objectId = object.id
          let objectCouleur = object.couleur

          function changeQuantity() {
            const choixQuantite = document.querySelectorAll(".itemQuantity");
            choixQuantite.forEach((choixQuantite) => {
              choixQuantite.addEventListener("change", (event) => {

                if (boucle1 === 1) {
                  location.reload();
                  return;
                }

                event.preventDefault();
                const value = event.target.value;
                const resFind = tableauProduit[0].find((el) => el.id === objectId && el.couleur === objectCouleur);

                if (resFind) {
                  boucle1 = boucle1 + 1
                  resFind.quantite = value
                  let produitString = JSON.stringify(tableauProduit[0]);
                  localStorage.setItem("productInCart", produitString);
                  //location.reload()
                }
                location.reload();
              });
            });
          }
          changeQuantity();
        })
    })
  }
  
  //le total de la quantité de tout les produits
  if (productCart != null) {
    let totalQuantity = 0
    let length = produitLocalStorage.length
    for (var i = 0; i < length; i++) {
      totalQuantity = parseInt(produitLocalStorage[i].quantite) + totalQuantity
    }
    let elem = document.getElementById('totalQuantity');
    elem.append(totalQuantity)
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
  let regexCity = /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
  let errorCity = document.getElementById('cityErrorMsg');

  let email = document.getElementById('email');
  let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let errorEmail = document.getElementById('emailErrorMsg');

    //Erreur en cas de non respect du regex

    firstName.addEventListener('input', (e) => {
        e.preventDefault();
        if (regexName.test(firstName.value) == false || firstName.value == "") {
            errorFirstName.innerHTML = "Veuillez saisir votre prenom";
            return false;
        } else {
            errorFirstName.innerHTML = "";
            return true;
        }
    });

    lastName.addEventListener('input', (e) => {
        e.preventDefault();
        if (regexName.test(lastName.value) == false || lastName.value == "") {
            errorLastName.innerHTML = "Veuillez saisir votre nom";
            return false;
        } else {
            errorLastName.innerHTML = "";
            return true;
        }
    });

    address.addEventListener('input', (e) => {
        e.preventDefault();
        if (regexAddress.test(address.value) == false || address.value == "") {
            errorAddress.innerHTML = "Veuillez saisir une vraie adresse";
            return false;
        } else {
            errorAddress.innerHTML = "";
            return true;
        }
    });

    city.addEventListener('input', (e) => {
        e.preventDefault();
        if (regexCity.test(city.value) == false || city.value == "") {
            errorCity.innerHTML = "Veuillez saisir une vraie ville";
            return false;
        } else {
            errorCity.innerHTML = "";
            return true;
        }
    });

    email.addEventListener('input', (e) => {
        e.preventDefault();
        if (regexEmail.test(email.value) == false || email.value == "") {
            errorEmail.innerHTML = "Email incorrect";
            return false;
        } else {
            errorEmail.innerHTML = "";
            return true;
        }
    });


  
  let order = document.getElementById('order');
  //je recup l'id du bouton pour faire un event

  order.addEventListener('click', (event) => {
    event.preventDefault();
    // si le client n'a pas bien rempli les champs alors on affiche un message d'erreur
    if (firstName.value === "" ||
        lastName.value === "" ||
        address.value === "" ||
        city.value === "" ||
        email.value === "" ||
        regexName.test(firstName.value) == false ||
        regexName.test(lastName.value) == false ||
        regexAddress.test(address.value) == false ||
        regexCity.test(city.value) == false ||
        regexEmail.test(email.value) == false) {
      alert("Vous n'avez pas bien rempli le formulaire")
      // sinon, j'envoi mon tableau     
        } else {
          let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
          };
          let products = [];
          produitLocalStorage.forEach((order) => {
            products.push(order.id);
          });
          let data = {
            contact,
            products
          };
          fetch(('http://localhost:3000/api/products/order'), {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(res => {
            return res.json();
          })
          .then((data) => {
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
          })
        }
  });
}

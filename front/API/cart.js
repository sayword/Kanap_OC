//------------récupere les données du LocalStorage-----------

let produitLocalStorage = JSON.parse(localStorage.getItem("productInCart"));

//------------- FONCTION AJOUT PANIER-----------------------------

function add2Cart(id, color, qty) {
  let productInCart = localStorage.getItem('productInCart');
  // si il n'y a rien dans le panier
  if (productInCart === null) {
    let tabPanier = {
      'id': id,
      'couleur': color,
      'quantite': qty
    };
    let u = [tabPanier]
    let tabPanierStr = JSON.stringify(u)
    localStorage.setItem('productInCart', tabPanierStr)
  }
  else {
    let produitLocalStorage = JSON.parse(localStorage.getItem("productInCart"));
    let p = []
    p.push(produitLocalStorage)
    const resFind = p[0].find((el) => el.id === id && el.couleur === color);
    // sinon, si il a trouver le meme produit dans le panier, alors j'ajoute juste la quantité 
    if (resFind) {
      let newQty = parseInt(qty) + parseInt(resFind.quantite);
      resFind.quantite = newQty;
      p.push(newQty);
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

function formulaire() {
  let productCart = JSON.parse(localStorage.getItem("productInCart"));
  let gogo = 0
  let prixTotal = 0
  let p = []
  let r = -1
  p.push(productCart)
  let articles = document.getElementById("cart__items")
  for (i = 0; i < p.length; i++) {
    p[0].forEach(object => {
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
                          <p>Qté : ${object.quantite} </p>
                          <input id="qty_${data._id}_${object.couleur}" onchange="changeQuantity('${data._id}','${object.couleur}')" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${object.quantite}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <button class="deleteItem"  id="${data._id}" ">Supprimer</button>
                        </div>
                      </div>
                    </div>
                  </article>`

          articles.appendChild(div)
          prixTotal = (data.price * object.quantite) + prixTotal
          document.querySelector("#totalPrice").innerHTML = prixTotal;
          r = r + 1

          function deleteProduct() {
            let boutonSupr = document.querySelectorAll(".deleteItem");
            console.log(boutonSupr)
            console.log(r)
            boutonSupr[r].addEventListener("click", (event) => {
              event.preventDefault();
              let elDelete = object.id;
              let elColor = object.couleur;
              console.log(elDelete)
              produitLocalStorage = produitLocalStorage.filter(elem => elem.id !== elDelete || elem.couleur !== elColor);
              localStorage.setItem("productInCart", JSON.stringify(produitLocalStorage));
              alert("Ce produit a bien été supprimé du panier");
              location.reload()
            })
          }

          deleteProduct();
          console.log(p[0])
          let ra = object.id
          let ro = object.couleur
          console.log(ra)
          console.log(ro)

          function changeQuantity() {
            const choixQuantite = document.querySelectorAll(".itemQuantity");
            console.log(choixQuantite)
            choixQuantite.forEach((choixQuantite) => {
              choixQuantite.addEventListener("change", (event) => {

                if (gogo === 1) {
                  console.log(gogo)
                  location.reload();
                  return;
                }

                event.preventDefault();
                const value = event.target.value;
                console.log(value)
                const resFind = p[0].find((el) => el.id === ra && el.couleur === ro);

                if (resFind) {
                  gogo = gogo + 1
                  resFind.quantite = value
                  console.log(resFind)
                  let produitString = JSON.stringify(p[0]);
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

  if (productCart != null) {
    let qt = 0
    let length = produitLocalStorage.length
    for (var i = 0; i < length; i++) {
      qt = parseInt(produitLocalStorage[i].quantite) + qt
      az = parseInt(produitLocalStorage[i].quantite)
      //le total quantité tout les produits
    }
    let elem = document.getElementById('totalQuantity');
    elem.append(qt)
  }


  let str = -1;
  op = []

  for (let i = 0; i < produitLocalStorage.length; i++) {
    str = str + 1;
    console.log(op);
    op.push(produitLocalStorage[str])
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
        if (regexName.test(firstName.value) == false) {
            errorFirstName.innerHTML = "Veuillez saisir votre prénom";
        } else {
            errorFirstName.innerHTML = "";
        }
    });

    lastName.addEventListener('input', (e) => {
        e.preventDefault();
        if (regexName.test(lastName.value) == false) {
            errorLastName.innerHTML = "Veuillez saisir votre nom";
        } else {
            errorLastName.innerHTML = "";
        }
    });

    address.addEventListener('input', (e) => {
        e.preventDefault();
        if (regexAddress.test(address.value) == false) {
            errorAddress.innerHTML = "Veuillez saisir une vraie adresse";
        } else {
            errorAddress.innerHTML = "";
        }
    });

    city.addEventListener('input', (e) => {
        e.preventDefault();
        if (regexCity.test(city.value) == false) {
            errorCity.innerHTML = "Veuillez saisir une vraie ville";
        } else {
            errorCity.innerHTML = "";
        }
    });

    email.addEventListener('input', (e) => {
        e.preventDefault();
        if (regexEmail.test(email.value) == false) {
            errorEmail.innerHTML = "Email incorrect";
        } else {
            errorEmail.innerHTML = "";
        }
    });

  let order = document.getElementById('order');
  //je recup l'id du bouton pour faire un event

  order.addEventListener('click', (event) => {
    event.preventDefault();
    // si le client n'a pas bien rempli les champs alors on affiche un message d'erreur
    if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
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
          console.log(productCart)
          let products = [];
          produitLocalStorage.forEach((order) => {
            products.push(order.id);
          });
          console.log(products)
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

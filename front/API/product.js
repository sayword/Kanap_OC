//Récupération de l'id dans l'url
let param = window.location.href;
let url = new URL(param);
let productId = url.searchParams.get("id");

console.log(productId)

fetch("http://localhost:3000/api/products/" + productId)
.then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
// recuperation du titre etc..
  .then(data => {
    document.querySelector("#title").innerHTML = data.name;
    document.querySelector("#description").innerHTML = data.description;
    document.querySelector("#price").innerHTML = data.price;
    let img = document.querySelector(".item__img");
    let image = document.createElement('img');
    image.src = data.imageUrl;
    img.appendChild(image);
// choix des couleurs du canapé
    for (let colors of data.colors){
      console.log(colors);
      let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
   }
    });
// recup le btn
    const addToCart = document.querySelector("#addToCart");
// creation d'un evenement au click du btn
    addToCart.addEventListener("click", () => {
        let productColor = document.querySelector("#colors").value;
        let productQuantity = document.querySelector("#quantity").value;
// au click du btn on verifie les elements suivant : si l'utilisateur a bien choisit une couleur et une quantité
        if (productColor == "") {
             alert("Veuillez choisir une couleur");
         } else if (productQuantity == 0 || productQuantity >= 101) {
            alert("Choisissez la quantité compris entre 1 et 100 merci");
         } 
   });

   //Ensuite 2 possibilités :
   //  si le panier est vide alors je rajoute les elements
   // si dans le panier il y a deja des elements alors je rajoute les nouveaux elements aux anciens

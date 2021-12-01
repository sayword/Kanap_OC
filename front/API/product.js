const parametre = window.location.href;
const kanapUrl = new URL(parametre);
const id = kanapUrl.searchParams.get("id");

fetch("http://localhost:3000/api/products/" + id)
.then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(data => {
    document.querySelector("#title").innerHTML = data.name;
    document.querySelector("#description").innerHTML = data.description;
    document.querySelector("#price").innerHTML = data.price;
    let img = document.querySelector(".item__img");
    let image = document.createElement('img');
    image.src = data.imageUrl;
    img.appendChild(image);

    for (let colors of data.colors){
      console.log(colors);
      let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
   }
    });

    //Fonction pour le panier 

    function addToCart() {

      let quantity = Number(document.querySelector("input").value);
      let color = document.querySelector("#colors").value;

      if ( ((quantity < 1) || (quantity > 100)) || (quantity == null) || (selectedColor == "")) {
        alert("Veuillez choisir une couleur et ajouter une quantité comprise entre 1 et 100 s'il vous plait.");
      } else { 
        
        alert("Vous avez sélectionner " + quantity + " en quantité et " + color + " en couleur.")
        let panierStorage = localStorage.getItem("cart"); 

        if (panierStorage === null) {
          let cart = []; // je mets les données a recup dans un tableau
          cart.push({
            "idKanap": idKanap,
            "color": color,
            "quantity": quantity
          });}
        else {
          // si il y a deja des trucs dans le panier alors += avec le nouveau produit 
          }
        }
      }
    
    

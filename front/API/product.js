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
  
    

    //1. je créer la fonction pour le panier
    //2. Je fais une condition if pour que le client choisisse au moins la couleur et que la quantité ne soit pas 0
    //3. Ensuite, si la condition est respecter je recup les informations du canapé ansi que la quantité et la couleur
    //4. Je fais un alert comme quoi ça a été ajouter au panier 
    //5. Je créer un stockage
    //6. Le stockage je le met sous forme de tableau js avec les informations du produit 

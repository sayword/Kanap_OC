//Je recupere l'API via un fetch
fetch("http://localhost:3000/api/products/")
.then(reponse => reponse.json())
.then(data => {
  //tant qu'il y a des produits à afficher de l'API, tu boucle 
    for(product of data) {
        let a = document.createElement('a');
        document.querySelector("#items").appendChild(a);
        a.setAttribute("href",`./product.html?id=${product._id}`)
        a.innerHTML =
        `
            <article>
              <img src="${product.imageUrl}" alt="${product.atlTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>`
        items.appendChild(a)
    }
})

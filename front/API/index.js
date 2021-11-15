fetch("http://localhost:3000/api/products/")
.then(reponse => reponse.json())
.then(data => {
    for(product of data) {
        console.log(product)
        let div = document.createElement('div');
        div.innerHTML =
        `<a href="./product.html?id=${ product._id }">
            <article>
              <img src="${ product.imageUrl }" alt="${ product.atlTxt}">
              <h4 class="name">${ product.name }</h4>
              <p class="description">${ product.description }</p>
              <h3 class="productPrice">${product.price} €</h3>
            </article>
          </a>`
        items.appendChild(div)
    }
})

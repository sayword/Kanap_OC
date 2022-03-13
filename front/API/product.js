//Récupération de l'id dans l'url
let param = window.location.href;
let url = new URL(param);
let id = url.searchParams.get("id");

console.log(id)

fetch("http://localhost:3000/api/products/" + id)
	.then(function(res) {
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
		for (let colors of data.colors) {
			console.log(colors);
			let productColors = document.createElement("option");
			document.querySelector("#colors").appendChild(productColors);
			productColors.value = colors;
			productColors.innerHTML = colors;
		}
	});
//je créer le tableau à envoyer au panier
let registerItem = [];
// recup le btn
const addToCart = document.querySelector("#addToCart");
// creation d'un evenement au click du btn
addToCart.addEventListener("click", () => {
	let color = document.querySelector("#colors").value;
	let qty = document.querySelector("#quantity").value;
	// au click du btn on verifie les elements suivant : si l'utilisateur a bien choisit une couleur et une quantité
	if (color == "") {
		alert("Veuillez choisir une couleur");
	} else if (qty <= 0 || qty >= 101) {
		alert("Choisissez la quantité compris entre 1 et 100 merci");
	} else {
		alert("Votre element s'ajoute au panier")
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
			let tabPanierStr = JSON.stringify(tabPanier)
			localStorage.setItem('productInCart', tabPanierStr)
			}
			else {
			//parse ici

			productInCart = JSON.parse(productInCart);
			let find = productInCart.find(
			  (data) => data.id === id && data.color === color);
			// sinon, si il a trouver le meme produit dans le panier, alors j'ajoute juste la quantité 
			if (find) {

			  let newQty = parseInt(qty) + parseInt(find.qty);
			  find.qty = newQty;
			  productInCart.push(find);
			  let tabPanierStr = JSON.stringify(productInCart) // ici j'ai remplacer le tabpanier productInCart
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
			  productInCart.push(tabPanier);
			  let tabPanierStr = JSON.stringify(productInCart)
			  localStorage.setItem('productInCart', tabPanierStr)
			}
			}
			}
		add2Cart(id, color, qty)
	}
});

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
		add2Cart(id, color, qty)
	}
});

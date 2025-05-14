const cartKey = "carrito";

function getcart(){
    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function save(carrito){
    console.log(carrito);
    localStorage.setItem(cartKey, JSON.stringify(carrito));
}

function add(id, name, price, vari){
    price = parseFloat(price) || 0;

    console.log(price);

    let carrito = getcart();
    
    let existence = carrito.find(p => p.id === id && vari === vari);

    if(existence){
        existence.qty++;
    } else {
        carrito.push({id, name, price, qty: 1, vari});
    }

    console.log(carrito);
    save(carrito);
}

function deleteItm(id, vari = null){
    let carrito = getcart();
    carrito = carrito.filter(p => !(p.id === id && p.vari === vari));
    save(carrito);
}

function show(){
    return getcart();
}

document.addEventListener("DOMContentLoaded",function (){
    document.querySelectorAll(".add").forEach(buttom => {
        buttom.addEventListener("click", function () {
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            console.log(price);
            const selectvari = document.querySelector(".tintSelector");
            const vari = selectvari ? selectvari.value : null;

            console.log(price);

            add(id, name, price, vari);

            alert("producto agregado al carrito");
        })
    })
})

document.addEventListener("DOMContentLoaded", function () {
    showOnPage();

    document.getElementById("empty-cart").addEventListener("click", function () {
        localStorage.removeItem("carrito");
        showOnPage();
    });
});

function showOnPage() {
    const carrito = getcart();
    const list = document.getElementById("listCart");
    const totalElm = document.getElementById("total");

    list.innerHTML = "";
    let total = 0;

    carrito.forEach((product, index) => {
        const tble = document.createElement("tr");

        console.log(product);
        tble.innerHTML = `
        <td> ${product.name} </td>
        <td class="setvar"> ${product.vari || "N/a"} </td>
        <td class="setvar"> ${product.price ? product.price.toFixed(2) : "0.00"} </td>
        <td class="setvar"> ${product.qty} </td>
        <td class="setvar"><button class="deleteItm" data-index="${index}">Eliminar</button></td>
        `;

        list.appendChild(tble);
        total += product.price * product.qty;
    });

    totalElm.textContent = total.toFixed(2);

    document.querySelectorAll(".deleteItm").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.dataset.index;
            eraseindx(index);
            showOnPage();
        });
    });
}

function eraseindx(index) {
    let carrito = getcart();
    carrito.splice(index, 1);
    save(carrito);
}


console.log(document.getElementById("form-mail"))
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-mail").addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Formulario enviado");

    const userMail = document.getElementById("userMail").value;
    const cart = getcart();

    if(!userMail || cart.length === 0){
        alert("Por favor ingresa un correo válido y asegúrate de tener productos en tu carrito.");
        return;
    }

    const details = getsum(cart);

    fetch("http://localhost:5000/send-cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cart: details,
            userMail: userMail,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("orden enviada con exito");
        }else{
            alert("Hubo un error, Intente nuevamente");
        }
    })
    .catch(error => {
        console.error("Error al enviar el carrito:", error);
        alert("Hubo un error al enviar el carrito.");
    });
    });
});

function getsum(carrito){
    return carrito.map(product => {
        return `${product.name} (${product.vari || "N/a"}) - $${product.price} x ${product.qty}`;
    }).join("\n");
}
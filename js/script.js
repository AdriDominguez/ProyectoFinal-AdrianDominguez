
let carrito = cargarCarrito();


let sectionPaquetes = document.getElementById("section-paquetes");
let sectionCarrito = document.getElementById("section-carrito");


let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total: $</h2>";
sectionCarrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("h2");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let cantidadPaquetes = document.createElement("div");
cantidadPaquetes.innerHTML = "<h3>Cantidad: </h3>";
sectionCarrito.appendChild(cantidadPaquetes);

let cantPaquetes = document.createElement("h3");
cantPaquetes.innerText = "0";
cantidadPaquetes.appendChild(cantPaquetes);

let botonFinalizar = document.createElement("button");
botonFinalizar.innerText = "Finalizar compra";
sectionCarrito.appendChild(botonFinalizar);
botonFinalizar.setAttribute("class", "boton");



botonFinalizar.onclick = () => {
    const precioFinal = montoTotalCompra.innerText;
    // USO DE SWEET //
    Swal.fire({
        title: '¿Deseas finalizar tu compra?',
        text: `Total a pagar: $${precioFinal}`,
        showCancelButton: true,
        confirmButtonColor: '#008f39',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Compra confirmada',
                '¡Que disfrutes!',
                'success'
            )
            vaciarCarrito();
        }
    })
}



for (const paquete of paquetes) {
    let container = document.createElement("div");
    container.setAttribute("class", "card-paquete");
    container.innerHTML = ` <div class="img-container">
                            <img src="${paquete.foto}" alt="${paquete.nombre}" class="img-paquete"/>
                            </div>
                            <div class="info-paquete">
                            <p class="font">${paquete.nombre}</p>
                            <strong class="font">$${paquete.precio}</strong>
                            <button class="boton" id="btn${paquete.id}"> Agregar al carrito </button>
                            </div>`;
    sectionPaquetes.appendChild(container);
    
    document.getElementById(`btn${paquete.id}`).onclick = () => agregarAlCarrito(`${paquete.id}`);
}




function agregarAlCarrito(id) {
    carrito.push(paquetes.find(p => p.id == id));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotalCarrito();
}

function calcularTotalCarrito() {
    let total = 0;
    for (const paquete of carrito) {
        total += paquete.precio;
    }
    montoTotalCompra.innerText = total;
    cantPaquetes.innerText = carrito.length;
}

function vaciarCarrito() {
    montoTotalCompra.innerText = "0";
    cantPaquetes.innerText = "0";
    localStorage.clear();
    carrito = [];
}


function cargarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito == null) {
        return [];
    } else {
        return carrito;
    }
}


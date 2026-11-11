
// 1. Buscar elementos del DOM
const tarjeta = document.querySelector("#tarjeta");

const botonAzul = document.querySelector("#azul");
const botonVerde = document.querySelector("#verde");
const botonRojo = document.querySelector("#rojo");
const botonRestablecer = document.querySelector("#restablecer");

// 2. Cambiar el color a AZUL
botonAzul.addEventListener("click", () => {

    tarjeta.style.backgroundColor = "#007bff";

});

// 3. Cambiar el color a VERDE
botonVerde.addEventListener("click", () => {

    tarjeta.style.backgroundColor = "#28a745";

});

// 4. Cambiar el color a ROJO
botonRojo.addEventListener("click", () => {

    tarjeta.style.backgroundColor = "#dc3545";

});

// 5. Restablecer el color original
botonRestablecer.addEventListener("click", () => {

    tarjeta.style.backgroundColor = "#ffffff";

});

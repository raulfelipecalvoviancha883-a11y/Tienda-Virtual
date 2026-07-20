// ===============================
// Dashboard Administrador
// Iron Rebel Garage
// ===============================

// Tarjetas
const motos = document.getElementById("motos");
const clientes = document.getElementById("clientes");
const ventas = document.getElementById("ventas");
const mensajes = document.getElementById("mensajes");

// Botones
const btnMoto = document.getElementById("btnMoto");
const btnClientes = document.getElementById("btnClientes");
const btnVentas = document.getElementById("btnVentas");
const btnMensajes = document.getElementById("btnMensajes");

// Valores iniciales
let totalMotos = 25;
let totalClientes = 84;
let totalVentas = 42;
let totalMensajes = 17;

// Mostrar datos
function cargarDashboard() {

    motos.textContent = totalMotos;
    clientes.textContent = totalClientes;
    ventas.textContent = totalVentas;
    mensajes.textContent = totalMensajes;

}

cargarDashboard();

// ===============================
// Eventos botones
// ===============================

btnMoto.addEventListener("click", function () {

    alert("Aquí podrás administrar las motocicletas.");

});

btnClientes.addEventListener("click", function () {

    alert("Aquí podrás administrar los clientes.");

});

btnVentas.addEventListener("click", function () {

    alert("Aquí podrás consultar las ventas.");

});

btnMensajes.addEventListener("click", function () {

    alert("Aquí podrás revisar los mensajes.");

});

// ===============================
// Animación de las tarjetas
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", function () {

        card.style.transform = "translateY(0px)";

    });

});

// ===============================
// Fecha actual
// ===============================

const fecha = new Date();

console.log(
    "Dashboard cargado el:",
    fecha.toLocaleDateString(),
    fecha.toLocaleTimeString()
);

// ===============================
// Mensaje de bienvenida
// ===============================

window.addEventListener("load", function () {

    console.log("Bienvenido al panel de administración de Iron Rebel Garage.");

});
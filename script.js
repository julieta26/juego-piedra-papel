let puntosJugador = 0;
let puntosMaquina = 0;

const botones = document.querySelectorAll(".opcion");
const mensaje = document.getElementById("estado");
const marcadorJugador = document.getElementById("puntosJugador");
const marcadorMaquina = document.getElementById("puntosMaquina");
const eleccionJugador = document.getElementById("eleccionJugador");
const eleccionMaquina = document.getElementById("eleccionMaquina");
const botonReinicio = document.getElementById("botonReinicio");


// Se ejecuta cuando el jugador toca una opción
botones.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const jugada = boton.dataset.jugada;

        // Si alguien ya ganó, no se puede continuar
        if (puntosJugador === 3 || puntosMaquina === 3) {
            return;
        }

        jugarRonda(jugada);
    });

});


// Genera una jugada aleatoria para la máquina
function obtenerJugadaMaquina() {

    const opciones = ["piedra", "papel", "tijera"];

    const posicion = Math.floor(Math.random() * opciones.length);

    return opciones[posicion];
}


// Determina quién ganó la ronda
function ganadorDeRonda(jugador, maquina) {

    if (jugador === maquina) {
        return "empate";
    }

    if (
        (jugador === "piedra" && maquina === "tijera") ||
        (jugador === "papel" && maquina === "piedra") ||
        (jugador === "tijera" && maquina === "papel")
    ) {
        return "jugador";
    }

    return "maquina";
}


// Ejecuta una ronda completa
function jugarRonda(jugadaJugador) {

    const jugadaMaquina = obtenerJugadaMaquina();

    eleccionJugador.textContent =
        "Tu elección: " + jugadaJugador;

    eleccionMaquina.textContent =
        "Elección de la máquina: " + jugadaMaquina;


    const resultado = ganadorDeRonda(
        jugadaJugador,
        jugadaMaquina
    );


    if (resultado === "empate") {

        mensaje.textContent = "🤝 ¡Empate!";

    } else if (resultado === "jugador") {

        puntosJugador++;
        mensaje.textContent = "🎉 ¡Ganaste la ronda!";

    } else {

        puntosMaquina++;
        mensaje.textContent = "🤖 La máquina ganó la ronda.";
    }


    actualizarMarcador();


    // Comprobar si terminó la partida
    if (puntosJugador === 3) {

        mensaje.textContent = "🏆 ¡Ganaste el torneo!";

    } else if (puntosMaquina === 3) {

        mensaje.textContent = "🤖 ¡La máquina ganó el torneo!";
    }
}


// Actualiza los números del marcador
function actualizarMarcador() {

    marcadorJugador.textContent = puntosJugador;
    marcadorMaquina.textContent = puntosMaquina;
}


// Reinicia todos los valores
botonReinicio.addEventListener("click", function() {

    puntosJugador = 0;
    puntosMaquina = 0;

    actualizarMarcador();

    mensaje.textContent = "Elegí una jugada";

    eleccionJugador.textContent = "Tu elección: -";
    eleccionMaquina.textContent = "Elección de la máquina: -";

});

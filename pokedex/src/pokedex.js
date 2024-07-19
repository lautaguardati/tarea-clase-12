document.querySelector("#boton-ver-lista").onclick = obtenerListaDePokemons;
const $pokemonSeleccionado = document.querySelector("#pokemon-seleccionado");

let respuestaListaDePokemones;
function obtenerListaDePokemons() {
    deshabilitarBotonMostrarLista();
    mostrarBarraDeNavegacion();

    fetch("https://pokeapi.co/api/v2/pokemon/")
        .then(respuesta => respuesta.json())
        .then((respuesta) => {
            respuestaListaDePokemones = respuesta
            let nombreDePokemones = obtenerNombreDePokemones(respuesta.results);
            mostrarListaDePokemones(nombreDePokemones);
        })
}

function deshabilitarBotonMostrarLista() {
    document.querySelector("#boton-ver-lista").setAttribute("disabled", "true")
}

function mostrarBarraDeNavegacion() {
    document.querySelector('#barra-de-navegacion').removeAttribute('hidden')
}

let linkDePokemones = [];
function obtenerNombreDePokemones(pokemones) {
    let coleccionDePokemones = [];
    linkDePokemones = [];

    pokemones.forEach((pokemon, index) => {
        coleccionDePokemones.push(index + pokemon.name);
        linkDePokemones.push(pokemon.url)
    })
    return coleccionDePokemones;
}

function mostrarListaDePokemones(nombreDePokemones) {
    document.querySelector("#lista-de-pokemons").textContent = ''
    nombreDePokemones.forEach((pokemon) => {
        const $itemPokemon = document.createElement("div");
        $itemPokemon.id = pokemon;
        $itemPokemon.textContent = pokemon.replace(/[0-9]+/, "");

        document.querySelector("#lista-de-pokemons").appendChild($itemPokemon);
    })
}



document.querySelector('#pagina-siguiente').onclick = pasarAPaginaSiguiente;
document.querySelector('#pagina-anterior').onclick = pasarAPaginaAnterior;

function pasarAPaginaSiguiente(e) {
    fetch(respuestaListaDePokemones.next)
        .then(respuesta => respuesta.json())
        .then((respuesta) => {
            respuestaListaDePokemones = respuesta
            let nombreDePokemones = obtenerNombreDePokemones(respuesta.results);
            mostrarListaDePokemones(nombreDePokemones);
        })
}

function pasarAPaginaAnterior() {
    fetch(respuestaListaDePokemones.previous)
        .then(respuesta => respuesta.json())
        .then((respuesta) => {
            respuestaListaDePokemones = respuesta
            let nombreDePokemones = obtenerNombreDePokemones(respuesta.results);
            mostrarListaDePokemones(nombreDePokemones);
        })
}

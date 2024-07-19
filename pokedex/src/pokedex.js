document.querySelector("#boton-ver-lista").onclick = obtenerListaDePokemons;

let respuestaListaDePokemones;
function obtenerListaDePokemons() {
    deshabilitarBotonMostrarLista();
    mostrarBarraDeNavegacion();

    fetch("https://pokeapi.co/api/v2/pokemon/")
        .then(respuesta => respuesta.json())
        .then((respuesta) => {
            respuestaListaDePokemones = respuesta
            let nombreDePokemones = obtenerNombreDePokemones(respuesta.results);
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


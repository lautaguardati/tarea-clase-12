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
    permitirEleccionPokemon();
}

function permitirEleccionPokemon() {
    document.querySelectorAll('#lista-de-pokemons div').forEach(($pokemon) => {
        $pokemon.onclick = buscarInformacionDePokemon;
    })
}

function buscarInformacionDePokemon(e) {
    limpiarPokemonSeleccionado();

    const idPokemonSeleccionado = e.target.id.replace(/[a-z]i+/, "");
    const PokemonSeleccionado = (parseFloat(idPokemonSeleccionado));

    fetch(linkDePokemones[PokemonSeleccionado])
        .then(respuesta => respuesta.json())
        .then((respuesta) => {
            mostrarCaracteristicas(respuesta);
        })
}

function limpiarPokemonSeleccionado() {
    $pokemonSeleccionado.textContent = "";
}


function mostrarCaracteristicas(caracteristicas) {
    mostrarNombre(caracteristicas.name);
    mostrarHabilidades(caracteristicas.abilities);
    mostrarExperiencia(caracteristicas.base_experience);
    mostrarAltura(caracteristicas.height);
    mostrarPeso(caracteristicas.weight);
    mostrarTipos(caracteristicas.types);
}

function mostrarNombre(nombre) {
    const $nombrePokemon = document.createElement("div");
    $nombrePokemon.id = "nombre-pokemon";
    $nombrePokemon.textContent = nombre + " ";
    $pokemonSeleccionado.appendChild($nombrePokemon);
    $nombrePokemon.appendChild(document.createElement('br'));
}


function mostrarHabilidades(habilidades) {
    const $nodoHabilidades = document.createElement('p');
    $nodoHabilidades.textContent = "Habilidades:";

    for (i = 0; i < habilidades.length; i++) {
        if (i === habilidades.length - 1) {
            $nodoHabilidades.textContent = $nodoHabilidades.textContent + " " + habilidades[i].ability.name + ".";
        } else {
            $nodoHabilidades.textContent = $nodoHabilidades.textContent + " " + habilidades[i].ability.name + ",";
        }
    }
    $pokemonSeleccionado.appendChild($nodoHabilidades);
}

function mostrarExperiencia(experiencia) {
    const $nodoExperiencia = document.createElement('p');
    $nodoExperiencia.textContent = `Experiencia: ${experiencia}`;
    $pokemonSeleccionado.appendChild($nodoExperiencia);
}

function mostrarAltura(altura) {
    const $nodoAltura = document.createElement('p');
    $nodoAltura.textContent = `Altura: ${altura}`;
    $pokemonSeleccionado.appendChild($nodoAltura);
}

function mostrarPeso(peso) {
    const $nodoPeso = document.createElement('p');
    $nodoPeso.textContent = `Peso: ${peso}`;
    $pokemonSeleccionado.appendChild($nodoPeso);
}

function mostrarTipos(tipos) {
    const $nodoTipos = document.createElement('p');
    $nodoTipos.textContent = "Tipo: "

    for (i = 0; i < tipos.length; i++) {
        if (i === tipos.length - 1) {
            $nodoTipos.textContent = $nodoTipos.textContent + " " + tipos[i].type.name + "."
        } else {
            $nodoTipos.textContent = $nodoTipos.textContent + " " + tipos[i].type.name + ","
        }
    }
    $pokemonSeleccionado.appendChild($nodoTipos)
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

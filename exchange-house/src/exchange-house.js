document.querySelector('#boton-ver-cambios').onclick = obtenerCambios;

function obtenerCambios() {
    const fecha = document.querySelector('#fecha').value;
    const base = document.querySelector('#base').value;
    
    fetch(`https://api.frankfurter.app/${fecha}?from=${base}`)
        .then(response => response.json())
        .then((data) => {
            mostrarIformacionDeCambios(data);
        })
}

function mostrarIformacionDeCambios(data) {
    eliminarCambiosAnteriores();

    const base = data.base;
    const fecha = data.date;
    document.querySelector('#base-cambios').textContent = base;
    document.querySelector('#fecha-cambios').textContent = fecha;
    document.querySelector('#resultados').removeAttribute('hidden')

    mostrarValoresCambiarios(data.rates)
}

function mostrarValoresCambiarios(cambios) {
    console.log(cambios)
    for (const [key, value] of Object.entries(cambios)) {
        const $cambio = document.createElement('li')
        $cambio.textContent = `${key}: ${value}`;
    
        document.querySelector('#cambios').appendChild($cambio)
    }
}

function eliminarCambiosAnteriores() {
    document.querySelector('#cambios').textContent = "";
}

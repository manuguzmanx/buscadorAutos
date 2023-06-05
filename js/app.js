//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const max = new Date().getFullYear();
const min = max - 10;


//Contenedor para los resultados
const resultado = document.querySelector('#resultado');


//Generar objeto con la búsqueda

const datosBusqueda = {
    marca: '',
    year: '',
    min: '',
    max: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    //Muestra los autos al cargar
    mostrarAutos(autos);

    //Llena select años
    llenarSelect();
    
});

//Event listener para los select de búsqueda
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo= e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    
    filtrarAuto();
});

//Funciones
function mostrarAutos(autos) {
    //Elimian el HTML previo
    limpiarHTML();

    autos.forEach(auto => {

        const { marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $${precio}
             - Color:
            ${color}
        `;

        //Insertar en el HTML
        resultado.append(autoHTML);
    });
}

//Limpiar HTML
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for(let i = max; i >= min; i--) {
        const opcion = document.createElement('OPTION');
        opcion.value = i;
        opcion.textContent = i;

        //Agrega opciones de año al select
        year.appendChild(opcion);
    }
}

//Función para filtrar con base en la búsqueda
function filtrarAuto() {
    const resultado = autos
        .filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtrarMinimo)
        .filter(filtrarMaximo)
        .filter(filtrarPuertas)
        .filter(filtrarTransmision)
        .filter(filtrarColor);

    console.log(resultado);
    mostrarAutos(resultado);

    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        sinResultados();
    }

}

function sinResultados() {
    limpiarHTML();

    const sinResultados = document.createElement('DIV');
    sinResultados.classList.add('alerta', 'error');
    sinResultados.textContent = 'No hay resultados, prueba con otros filtros de búsqueda';
    resultado.appendChild(sinResultados);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;

    if(marca) {
        return auto.marca === marca;
    }

    return auto;
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;

    if(year) {
        return auto.year === year;
    }

    return auto;
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;

    if(minimo) {
        return auto.precio >= minimo;
    }

    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;

    if(maximo) {
        return auto.precio <= maximo;
    }

    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;

    if(puertas) {
        return auto.puertas === puertas;
    }

    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }

    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color) {
        return auto.color === color;
    }

    return auto;
}
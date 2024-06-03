//validacion de cantidad de dias
function validarDias() {
    const dias = document.getElementById('dias').value;
    return dias >= 1 && dias <= 30;
}
//muestra la etiqueta del auto
function mostrarEtiquetaAuto() {
    const marca = document.getElementById('marca').value;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (marca === 'Ford') {
        resultadoDiv.innerHTML = '<p>Usted ha seleccionado un auto Ford</p>';
    }

    if (marca === 'Fiat') {
        resultadoDiv.innerHTML = '<p>Usted ha seleccionado un auto Fiat</p>';
}

    if (marca === 'Audi') {
        resultadoDiv.innerHTML = '<p>Usted ha seleccionado un auto Audi</p>';
    }

    if (marca === 'Toyota') {
        resultadoDiv.innerHTML = '<p>Usted ha seleccionado un auto Toyota</p>';
    }

    if (marca === 'Peugeot') {
        resultadoDiv.innerHTML = '<p>Usted ha seleccionado un auto Peugeot</p>';
    }

}
//mostrar imagen de la marca
function mostrarImagenAuto() {
    const marca = document.getElementById('marca').value;
    const imagenAutoDiv = document.getElementById('imagenAuto');

    let imagenSrc;
    switch (marca) {
        case 'Ford':
            imagenSrc = '../fotos/autoford.jpg';
            break;
        case 'Fiat':
            imagenSrc = '../fotos/autofiat.jpg';
            break;
        case 'Audi':
            imagenSrc = '../fotos/autoaudi.jpg';
            break;
        case 'Toyota':
            imagenSrc = '../fotos/autotoyo.jpg';
            break;
        case 'Peugeot':
            imagenSrc = '../fotos/autopeu.jpg';
            break;
    }
    imagenAutoDiv.innerHTML = `<img src="${imagenSrc}" alt="${marca}" style="display: block; margin: 0 auto; width: 200px; height: 150px;">`;
}

//cambio segun marca
document.getElementById('marca').addEventListener('change', mostrarEtiquetaAuto);
document.getElementById('marca').addEventListener('focus', mostrarImagenAuto);
//cambio segun cantidad de dias 
document.getElementById('dias').addEventListener('change', function() {
    const dias = document.getElementById('dias').value;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (dias > 20) {
        resultadoDiv.innerHTML = '<label>Está seguro de exceder el plazo de 20 días?</label><input type="checkbox" id="confirmarExceder">';
    }
});
//calculo del alquiler
function calcularAlquiler() {
    const marca = document.getElementById('marca').value;
    const tipo = document.getElementById('tipo').value;
    const dias = document.getElementById('dias').value;
    const coberturaCompleta = document.getElementById('cobertura').checked;

    if (!validarDias()) {
        alert('La cantidad de días debe estar entre 1 y 30.');
        return;
    }

    let costoBase;
    switch (marca) {
        case 'Ford':
            costoBase = 10000;
            break;
        case 'Fiat':
            costoBase = 9000;
            break;
        case 'Audi':
            costoBase = 14000;
            break;
        case 'Toyota':
            costoBase = 11000;
            break;
        case 'Peugeot':
            costoBase = 12000;
            break;
    }

    let costoTotal = costoBase * dias;

    if (coberturaCompleta) {
        costoTotal *= 1.20;
    }

    if (tipo === 'Minivan' && dias > 20) {
        costoTotal *= 1.07;
    }

    document.getElementById('resultado').innerHTML = `El costo total del alquiler es: $${costoTotal.toFixed(2)}`;
}
//cambio segun tipo de auto
document.getElementById('tipo').addEventListener('change', function() {
    const tipo = document.getElementById('tipo').value;
    const button = document.querySelector('button');

    if (tipo === 'Sedan') {
        button.style.backgroundColor = 'blue';
    } else {
        button.style.backgroundColor = '';
    }
});
//no es necesario recargar la pagina con este evento
document.getElementById('formaRenta').addEventListener('submit', function(event) {
    event.preventDefault(); 
    calcularAlquiler();
});

//(＾• ω •＾) 
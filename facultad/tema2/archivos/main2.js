document.addEventListener('DOMContentLoaded', function() {
    const montoSolicitado = document.getElementById('montoSolicitado');
    const tipoCasa = document.getElementById('tipoCasa');
    const cantidadHabitantes = document.getElementById('cantidadHabitantes');
    const cantidadCuotas = document.getElementById('cantidadCuotas');
    const calcularBtn = document.getElementById('calcularBtn');
    const result = document.getElementById('resultado');
    const countryLabel = document.getElementById('countryLabel');
    const countryCheckbox = document.getElementById('countryCheckbox');

    function validarMonto() {
        const monto = parseInt(montoSolicitado.value, 10);
        return monto >= 1000000 && monto <= 20000000;
    }

    montoSolicitado.addEventListener('focus', function() {
        if (cantidadHabitantes.value === "1") {
            const label = document.createElement('label');
            label.textContent = "Esta es una etiqueta para un solo habitante";
            label.id = "singleHabitanteLabel";
            montoSolicitado.parentElement.appendChild(label);
        }
    });

    montoSolicitado.addEventListener('blur', function() {
        const label = document.getElementById('singleHabitanteLabel');
        if (label) {
            label.remove();
        }
    });

    montoSolicitado.addEventListener('change', function() {
        const monto = parseInt(montoSolicitado.value, 10);
        if (monto >= 10000000 && tipoCasa.value === "casa") {
            countryLabel.classList.remove('oculto');
        } else {
            countryLabel.classList.add('oculto');
        }
    });

    calcularBtn.addEventListener('click', function() {
        if (!validarMonto()) {
            result.textContent = "El monto solicitado no es válido. Debe estar entre 1000000 y 20000000.";
            return;
        }

        let monto = parseInt(montoSolicitado.value, 10);
        const cuotas = parseInt(cantidadCuotas.value, 10);

        if (countryCheckbox.checked) {
            monto *= 1.1;
        }

        if (tipoCasa.value === "casa" && cantidadHabitantes.value === "4") {
            monto *= 0.95;
        }

        const valorCuota = monto / cuotas;
        result.textContent = `El valor de cada cuota del préstamo es ${valorCuota.toFixed(2)}.`;
    });

    tipoCasa.addEventListener('change', function() {
        if (tipoCasa.value === "departamento") {
            calcularBtn.classList.add('departamento');
        } else {
            calcularBtn.classList.remove('departamento');
        }
    });

    function mostrarnumhab() {
        const numhab = document.getElementById('cantidadHabitantes').value;
        const imagenHabDiv = document.getElementById('imagenHab');

        let imagenSrc;
        switch (numhab) {
            case '1':
                imagenSrc = 'img/1perso.png';
                break;
            case '2':
                imagenSrc = 'img/2perso.png';
                break;
            case '3':
                imagenSrc = 'img/3perso.png';
                break;
            case '4':
                imagenSrc = 'img/4perso.png';
                break;
            default:
                imagenSrc = '';

        }
        if (imagenSrc) {
            imagenHabDiv.innerHTML = `<img src="${imagenSrc}" alt="${numhab}" style="display: block; margin: 0 auto; width: 200px; height: 150px;">`;
        } else {
            imagenHabDiv.innerHTML = '';
        }
    }
    document.getElementById('cantidadHabitantes').addEventListener('focus', mostrarnumhab); //No se puede usar un change?

//༼ つ ◕_◕ ༽つ take my energy for approve ༼ つ ◕_◕ ༽つ
});
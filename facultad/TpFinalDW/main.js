//importacion a las funciones principales, realmente a la primera nomas
import { obtenerTragoAleatorio, obtenerDatosDesdeUrl } from './conexionAPI/api.js';
//cargado del DOM
document.addEventListener("DOMContentLoaded", () => {
    //referencias a los elementos del DOM
    const formularioApi = document.getElementById("apiForm");
    const botonRandom = document.getElementById("randomButton");
    const divResultado = document.getElementById("result");
    const botonDescargar = document.getElementById("descargarTabla");
    const tbodyTragos = document.querySelector("#tablaTragos tbody");
    //esto es de la segunda funcion de la api, pero no se llego a usar
    formularioApi.addEventListener("submit", async (event) => {
        event.preventDefault();
        const apiUrl = document.getElementById("apiUrl").value.trim();
        if (!apiUrl) {
            alert("Por favor, ingresa una URL válida.");
            return;
        }
        try {
            const tragos = await obtenerDatosDesdeUrl(apiUrl);
            if (tragos.length === 0) {
                alert("No se encontraron tragos en la URL proporcionada.");
                return;
            }
            tragos.forEach((trago) => agregarAFila(trago));
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
    //boton random para el trago aleatorio
    botonRandom.addEventListener("click", async () => {
        try {
            const trago = await obtenerTragoAleatorio();
            await mostrarTrago(trago);
            await agregarAFila(trago);
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
    //funcion para descargar la tabla en PDF
    botonDescargar.addEventListener("click", () => {
        descargarTablaPDF();
    });

    //muestra los detalles del trago
    async function mostrarTrago(trago) {
        if (!trago) {
            divResultado.innerHTML = "<p>No se encontró ningún trago.</p>";
            return;
        }
        //ingredientes del trago
        const ingredientes = obtenerIngredientes(trago);
        //muestra todo lo necesario del trago en el div resultado
        divResultado.innerHTML = `
            <h2>${trago.strDrink}</h2>
            <p><strong>Categoría:</strong> ${trago.strCategory || "N/A"}</p>
            <p><strong>Tipo:</strong> ${trago.strAlcoholic || "N/A"}</p>
            <p><strong>Instrucciones:</strong> ${trago.strInstructions || "N/A"}</p>
            <h3>Ingredientes:</h3>
            <ul>
                ${ingredientes.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        `;
    }
//funcion de los ingredientes del trago
    function obtenerIngredientes(trago) {
        const ingredientes = [];
        //recorre los ingredientes y los guarda en una lista
        for (let i = 1; i <= 15; i++) {
            const ingrediente = trago[`strIngredient${i}`];
            const medida = trago[`strMeasure${i}`];
            if (ingrediente) ingredientes.push(`${medida || ""} ${ingrediente}`.trim());
        }
        return ingredientes;
    }
    //agrega el trago a la fila de la tabla
    async function agregarAFila(trago) {
        const tragoExistente = tbodyTragos.querySelector(`[data-id="${trago.idDrink}"]`);
        if (tragoExistente) {
            alert("Este trago ya está en la lista.");
            return;
        }
        //convierte los ingredientes del trago en una cadena
        const ingredientes = obtenerIngredientes(trago).join(", ");
        //crea una nueva fila en la tabla
        const fila = document.createElement("tr");
        fila.setAttribute("data-id", trago.idDrink);
        fila.innerHTML = `
            <td>${trago.strDrink}</td>
            <td>
                <img src="${trago.strDrinkThumb}" alt="${trago.strDrink}" style="width: 50px; border-radius: 5px;">
            </td>
            <td>${ingredientes}</td>
            <td><button class="eliminarTrago">Eliminar</button></td>
        `;
        //boton para eliminar el trago de la fila
        fila.querySelector(".eliminarTrago").addEventListener("click", () => {
            fila.remove();
        });
        //agrega la fila a la tabla
        tbodyTragos.appendChild(fila);
    }           

    // función para descargar la tabla como PDF
    function descargarTablaPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Agrega el título del documento
        doc.text("Tabla de Tragos", 10, 10);

        // Obtiene las columnas y filas de la tabla
        const columns = ["Nombre", "Imagen", "Ingredientes"];
        const rows = [];

        // itera sobre las filas de la tabla y agrega los datos a las filas del PDF
        tbodyTragos.querySelectorAll("tr").forEach(row => {
            const cols = row.querySelectorAll("td");
            const rowData = [
                cols[0].innerText, // nombre del trago
                cols[1].querySelector("img").src, // URL de la imagen
                cols[2].innerText // ingredientes
            ];
            rows.push(rowData);
        });

        // agrega la tabla al documento PDF
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 20
        });

        
        doc.save("tabla_tragos.pdf");
    }
});

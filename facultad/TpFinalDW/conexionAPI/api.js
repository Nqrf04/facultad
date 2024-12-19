//funcion principal
export async function obtenerTragoAleatorio() {
  //url de la api
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    try {
      //solicitud get a la url/api
      const respuesta = await fetch(url);
      if (!respuesta.ok) throw new Error("Hubo un error al obtener datos de la API.");
      //si la respuesta es correcta se convierte a json
      const datos = await respuesta.json();
      //retorna en una lista
      return datos.drinks[0]; 
    } catch (error) {
      throw error; 
    }
  }
  
  //esta funcion realmente es lo mismo que arriba, pero la idea es que se pueda usar para cualquier url, ver a futuro para practicar
  export async function obtenerDatosDesdeUrl(apiUrl) {
    try {
      const respuesta = await fetch(apiUrl);
      if (!respuesta.ok) throw new Error("Error al obtener datos de la API personalizada.");
      const datos = await respuesta.json();
      return datos.drinks || []; 
    } catch (error) {
      throw error; 
    }
  }
  
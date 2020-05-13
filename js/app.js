import * as UI from "./interfaz.js";
import { API } from "./api.js";

UI.fomrularioBuscar.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtiene datos del frmulario.
  const artista = document.querySelector("#artista").value,
    cancion = document.querySelector("#cancion").value;

  if (artista == "" || cancion == "") {
    // valida que los campos no esten vacios.
    UI.divMensaje.innerHTML = "Error, todos los campos son obligatorios";
    UI.divMensaje.classList.add("error");

    setTimeout(() => {
      UI.divMensaje.innerHTML = "";
      UI.divMensaje.classList.remove("error");
    }, 2500);
  } else {
    // Formulario completo, hace la consulta a la api.
    const api = new API(artista, cancion);
    api
      .conusltarApi()
      .then((result) => {
        //
        if (result.respuesta.lyrics) {
          // si existe la cancion
          const letra  = result.respuesta.lyrics;
          UI.divResultado.textContent = letra;
          console.log(letra);
        } else {
            // La busqueda no existe
          UI.divMensaje.innerHTML =
            "La cancion no existe, prueba con otra busqueda.";
          UI.divMensaje.classList.add("error");
          setTimeout(() => {
            UI.divMensaje.innerHTML = "";
            UI.divMensaje.classList.remove("error");
            UI.fomrularioBuscar.reset();
          }, 3000);
        }
      })
      .catch((err) => {
        if (err) {
            // En caso de error de API,o algun otro error, no puede traer el request de la api
          UI.divMensaje.innerHTML =
            "Problemas con el servidor porfavor intente mas tarde";
          UI.divMensaje.classList.add("error");
          setTimeout(() => {
            UI.divMensaje.innerHTML = "";
            UI.divMensaje.classList.remove("error");
          }, 3000);
        }
      });
  }
});

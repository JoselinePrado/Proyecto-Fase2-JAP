document.addEventListener("DOMContentLoaded", function (e) { 
    VerificarLogueo();
});

// FUNCION QUE VALIDA QUE NINGUN CAMPO QUEDE VACIO Y GUARDA LOS DATOS
function validarDatos() {
    let nombre =  document.getElementById("primerNombre");
    let apellido = document.getElementById("primerApellido");
    let numeroTEL = document.getElementById("teldecontacto");
    let campoVacio = false;
    
   // validar campos vacios
    if (nombre.value === '') {
        nombre.classList.add('is-invalid');
        campoVacio = true;
    }

    if (apellido.value === '') {
        apellido.classList.add('is-invalid');
        campoVacio = true;
    }
    
    if (numeroTEL.value === '') {
        numeroTEL.classList.add('is-invalid');
        campoVacio = true;
    }

    if (!campoVacio) {
        // proceda    
        GuardarDatosUser();
    }
  }

   // FUNCION QUE QUITA MENSAJE DE ERROR AL COMPLETAR EL CAMPO
 function removerInvalido(id) {
    let inputError =  document.getElementById(id); 
    inputError.classList.remove('is-invalid');
 }

 // FUNCION QUE GUARDA LOS DATOS:
 function GuardarDatosUser() {
    
    let nombre =  document.getElementById("primerNombre").value;
    let apellido = document.getElementById("primerApellido").value;
    let numeroTEL = document.getElementById("teldecontacto").value;
    let segundoNombre =  document.getElementById("segundoNombre").value;
    let segundoApellido =  document.getElementById("segundoApellido").value;
    let imagenUser =  document.getElementById("imagenUser").files[0];
    // Subo lla imagen a /uploads/<NAME>
    var formData = new FormData();
    formData.append("file", imagenUser);

    var xhttp = new XMLHttpRequest(); //Script PHP que sube archivos y los guarda en el localhost/upload

    // Set POST method and ajax file path
    xhttp.open("POST", "http://localhost/fileupload.php", true);

    // call on request changes state
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            if(response == 1){
                localStorage.setItem("inputImagenUser", "http://localhost/upload/" + imagenUser.name);
                location.reload();
            }else{
                alert("File not uploaded.");
            }
        }
    };

    // Send request with data
    xhttp.send(formData);

    //Guardar los datos en LocalStorage
    localStorage.setItem("inputNombre", nombre);
    localStorage.setItem("inputApellido", apellido);
    localStorage.setItem("inputNumeroTel", numeroTEL);
    localStorage.setItem("inputSegundoNombre", segundoNombre);
    localStorage.setItem("inputSegundoApellido", segundoApellido);
 }

 //FUNCION QUE MUESTRA LOS DATOS
 function MostrarDatosUser() {   
    //Mostrar los datos ingresados y guardados en LocalStorage
    document.getElementById('primerNombre').value = localStorage.getItem("inputNombre");
    document.getElementById('primerApellido').value = localStorage.getItem("inputApellido");
    document.getElementById('teldecontacto').value = localStorage.getItem("inputNumeroTel");
    document.getElementById('segundoNombre').value = localStorage.getItem("inputSegundoNombre");
    document.getElementById('segundoApellido').value = localStorage.getItem("inputSegundoApellido");
    if (localStorage.getItem("inputImagenUser") == null) {
        document.getElementById('imagenUserGuardada').src = "img/img_perfil.png";
    } else {
        document.getElementById('imagenUserGuardada').src = localStorage.getItem("inputImagenUser");
    }
 }

 //FUNCION QUE VALIDA QUE ESTE LOGUEADO  
 function VerificarLogueo() {
    if(localStorage.getItem("inputCORREO") !== null) {
        MostrarDatosUser();
    } else {
        window.location.href = 'login.html';
    }
 }








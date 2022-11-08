function CheckLOG() {
    // preparar mensaje y control de error
    var error   = false;
    // capturar datos del formulario
    var email = document.getElementById("email").value;
    var password = document.getElementById("password1").value;
    // validar datos
    if (email=="" || !email.includes('@')) {
        error   = true;
    } // endif
    if (password=="") {
        error   = true;
    } // endif
    
    // controlar error
    if (error) {
        AccesoDenegado();
    } else {
        // redirigir 
        window.location.href = 'index.html';
    } // endif            
} // end function


function AccesoDenegado() {
    document.getElementById("alerta-error").classList.add("show");
}

document.getElementById("regresar").addEventListener("click", function(){
    window.location.href = "index.html"
})

document.getElementById("regBtn").addEventListener("click", () => {
    var email = document.getElementById('email').value;
    email = email.substring(0, email.indexOf('@'));
    localStorage.setItem("inputUSUARIO", email);

    var correo = document.getElementById('email').value;
    localStorage.setItem("inputCORREO", correo);

})





// -- OBTENER DATOS DEL JSON --
const URL = CART_INFO_URL + "25801" + EXT_TYPE;
let comprarProductArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comprarProductArray = resultObj.data.articles;
            if (localStorage.getItem("botonComprar") === null || JSON.parse(localStorage.getItem("botonComprar")).length === 0 ) { // botonComprar es lista creada en el boton comprar
                localStorage.setItem("botonComprar", JSON.stringify(comprarProductArray)); // si no hay lista por boton comprar, muestro producto pre cargado por ID de usuario
            } else {
                var lista = JSON.parse(localStorage.getItem("botonComprar"));
                if (lista.filter((item) => item.id === comprarProductArray[0].id).length === 0) {
                    comprarProductArray.push(...lista); // si esta la lista por boton comprar la agrego al prodcuto pre cargado
                    localStorage.setItem("botonComprar", JSON.stringify(comprarProductArray));
                    mostrarCompra();
                    return;
                }
                localStorage.setItem("botonComprar", JSON.stringify(lista)); // se guarda lista en LocalStorage
            }
            mostrarCompra();
        }       
    });

    (function () {
      
        // APLICAR ESTILOS DE VALIDACION DE Bootstrap
        var forms = document.querySelectorAll('.needs-validation')
      
        // Bucle sobre ellos y evitar el envío
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }
    
    
              form.classList.add('was-validated')
            }, false)
          })
        
      })()
});

// FUNCION QUE RECORRE Y MUESTRA EL CONTENIDO DEL JSON

function mostrarCompra() {
    let contenidoCompra = "";
    let htmlBtnComprar = "";
    let contenidoProd = "";
    let sumaSubTotal = 0;
    let costoTOTAL = 0;

    // RECORRER LISTA DE OBJETOS OBTENIDA POR EL BOTON COMPRAR EN PRODUCT-INFO.JS

    let comprarProductArray = JSON.parse(localStorage.getItem("botonComprar"));

    for (let i = 0; i < comprarProductArray.length; i++) {
        let datos = comprarProductArray[i];
        sumaSubTotal += datos.unitCost * datos.count;
        contenidoProd += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-2">  
                    <img src="${datos.image}" class="img-responsive" width="40%" height="70%">  
                </div>  
                <div class="col">    
                    <p class="mb-1">${datos.name}</p>
                </div>  
                <div class="col"> 
                    <p class="mb-1">${datos.currency}${datos.unitCost}</p>
                </div>               
                <div class="col"> 
                    <div class="input-group has-validation">
                        <input class="form-control mb-2 w-50 p-3 h-25 d-inline-block" type="number" id="cantidad${i}"  aria-describedby="inputGroupPrepend" required name="cantidad" onchange="funcionMultiplicar(this.value, ${i})" value="${datos.count}">
                        <div class="invalid-feedback">
                        Cantidad invalida
                        </div>
                    </div>
                </div>  
                <div class="col"> 
                    <p class="mb-1" id="subtotal${i}">${datos.currency}${datos.count * datos.unitCost}</p>
                </div>
                <div class="col"> 
                     <button type="button" class="btn btn-outline-danger" onclick="eliminarElemento(${datos.id})"><span class="bi bi-trash">Eliminar</span></button>
                </div>
            </div>
        </div>
        <div class="list-group-item list-group-item-action cursor-active">
            ${htmlBtnComprar}
        </div>
        `
    };

    contenidoCompra += `
    <div class="container-sm cursor-active text-center">
                <h1 class="m-4 mb-1">Carrito de Compras</h1>
                <p class="lead">Articulos a comprar</p>
    </div>
        
    <hr/>

    <div class="list-group-item list-group-item-action">
        <div  class="row">
            <div class="col">
                <h5 class="col-3 bg-light"></h5>
            </div>
            <div class="col">
                <h5 class="col-3 bg-light">Nombre</h5>
            </div>
            <div class="col">
                <h5 class="col-3 bg-light">Costo</h5>
            </div>
            <div class="col">           
                <h5 class="col-3 bg-light">Cantidad</h5>
            </div>
            <div class="col">
                <h5 class="col-3 bg-light">SubTotal</h5>
            </div>
            <div class="col">
                <h5 class="col-3 bg-light"></h5>
            </div>
                 ${contenidoProd}
        </div>
    </div> 
    `

        document.getElementById("comp-list-container").innerHTML = contenidoCompra;
        document.getElementById("sumaSubtotal").innerHTML = "USD" + " " + sumaSubTotal;
        document.getElementById("costEnvio").innerHTML = "USD" + " " + Math.round(sumaSubTotal*0.15);
        costoTOTAL = sumaSubTotal + Math.round(sumaSubTotal*0.15);
        document.getElementById("total").innerHTML = "USD" + " " + costoTOTAL;

        localStorage.setItem("sumaSubtotal", sumaSubTotal);

}

// FUNCION QUE TOMA EL VALUE DEL INPUT CANTIDAD Y LO MULTIPLICA POR EL VALOR UNITARIO PARA LUEGO MOSTRAR EL SUBTOTAL Y A SU VEZ VALIDA QUE LA CANTIDAD SEA MAYOR A 0

function funcionMultiplicar(value, i) {
    var lista =  JSON.parse(localStorage.getItem("botonComprar"));
    lista[i].count = value;
    localStorage.setItem("botonComprar", JSON.stringify(lista));
    // window.location = "cart.html";
    mostrarCompra();

    // Validar que los imput de cantidad sean mayores a 0
    let valorCantidad = document.getElementById('cantidad'+i).value;
    let idCantidad = document.getElementById('cantidad'+i)
    validarCantidad(valorCantidad, idCantidad);

}

// Validar que los imput de cantidad sean mayores a 0
function validarCantidad(valorCantidad, idCantidad) {

    if(valorCantidad < 1) {
        idCantidad.classList.add('is-invalid');
    } else {
        idCantidad.classList.remove('is-invalid');
    }       
    

}

function eliminarElemento(idABorrar){
    var lista =  JSON.parse(localStorage.getItem("botonComprar"));
    const listaNueva = lista.filter((item) => item.id !== idABorrar);
    localStorage.setItem("botonComprar", JSON.stringify(listaNueva));
    document.getElementById("comp-list-container").innerHTML = "";
    window.location = "cart.html";
    mostrarCompra();
};

 // funcion que se llama al abrir el modal
 function abrirModal() {
   
    // ID CORRESPONDIENTE A LOS DATOS DE LA CUENTA BANCARIA
    const numCuentaBanc = document.getElementById("numCUENTA");

     // ID CORRESPONDIENTE A LOS DATOS DE LA TARJETA DE CREDITO
     const numTarjCred = document.getElementById("numTC");
     const numCVC = document.getElementById("codigoSeguridad");
     const numVenc = document.getElementById("vencimiento");

     // QUITAR EL MENSAJE DE ERROR AL ABRIR MODAL
     numCuentaBanc.classList.remove('is-invalid');

}

function controlTC() {

    // ID CORRESPONDIENTE A LOS DATOS DE LA CUENTA BANCARIA
    const cuentaB = document.getElementById("numCUENTA");

     // ID CORRESPONDIENTE A LOS DATOS DE LA TARJETA DE CREDITO
     const numTarjCred = document.getElementById("numTC");
     const numCVC = document.getElementById("codigoSeguridad");
     const numVenc = document.getElementById("vencimiento");

     cuentaB.setAttribute('disabled', '');
     cuentaB.removeAttribute('required');
     cuentaB.classList.remove('is-invalid');

   numTarjCred.removeAttribute('disabled');
   numTarjCred.setAttribute('required', '');
   numTarjCred.classList.add('is-invalid');

   numCVC.removeAttribute('disabled');
   numCVC.setAttribute('required', '');
   numCVC.classList.add('is-invalid');

   numVenc.removeAttribute('disabled');
   numVenc.setAttribute('required', '');
   numVenc.classList.add('is-invalid');
   
   
   
}


function controlCBANCARIA() {

    // ID CORRESPONDIENTE A LOS DATOS DE LA CUENTA BANCARIA
    const cuentaB = document.getElementById("numCUENTA");

     // ID CORRESPONDIENTE A LOS DATOS DE LA TARJETA DE CREDITO
    const numTarjCred = document.getElementById("numTC");
    const numCVC = document.getElementById("codigoSeguridad");
    const numVenc = document.getElementById("vencimiento");

 
    numTarjCred.setAttribute('disabled', '');
    numTarjCred.removeAttribute('required');
    numTarjCred.classList.remove('is-invalid');


    numCVC.setAttribute('disabled', '');
    numCVC.removeAttribute('required');
    numCVC.classList.remove('is-invalid');

    numVenc.setAttribute('disabled', '');
    numVenc.removeAttribute('required');
    numVenc.classList.remove('is-invalid');


    cuentaB.removeAttribute('disabled');
    cuentaB.setAttribute('required', '');
    cuentaB.classList.add('is-invalid');

 }

 function selectPremium() {
    let sumaSubTotal = parseInt(localStorage.getItem("sumaSubtotal"));
    document.getElementById("costEnvio").innerHTML = "USD" + " " + Math.round(sumaSubTotal*0.15);
    costoTOTAL = sumaSubTotal + Math.round(sumaSubTotal*0.15);
    document.getElementById("total").innerHTML = "USD" + " " + costoTOTAL;
 }

 function selectExpress() {
    let sumaSubTotal = parseInt(localStorage.getItem("sumaSubtotal"));
    document.getElementById("costEnvio").innerHTML = "USD" + " " + Math.round(sumaSubTotal*0.07);
    costoTOTAL = sumaSubTotal + Math.round(sumaSubTotal*0.07);
    document.getElementById("total").innerHTML = "USD" + " " + costoTOTAL;
 }

 function selectStandard() {
    let sumaSubTotal = parseInt(localStorage.getItem("sumaSubtotal"));
    document.getElementById("costEnvio").innerHTML = "USD" + " " + Math.round(sumaSubTotal*0.05);
    costoTOTAL = sumaSubTotal + Math.round(sumaSubTotal*0.05);
    document.getElementById("total").innerHTML = "USD" + " " + costoTOTAL;
 }

 // FUNCION QUE QUITA MENSAJE DE ERROR AL COMPLETAR EL CAMPO
 function removerInvalido(id) {
    let inputError =  document.getElementById(id);
  
    inputError.classList.remove('is-invalid');
 }



  // FUNCION QUE VALIDA QUE NINGUN CAMPO QUEDE SIN COMPLETAR AL CLIQUEAR FINALIZAR COMPRA

  function validarCompra() {

    let primerError = null;
    let mensajesError = [];

    let calle =  document.getElementById("idCALLE");
    let numCalle = document.getElementById("idNumCALLE");
    let esquina = document.getElementById("idESQUINA");
    let campoVacio = false;
    

    // Remuevo clase por las dudas que alguno ya tuviera
    calle.classList.remove('is-invalid');
    numCalle.classList.remove('is-invalid');
    esquina.classList.remove('is-invalid');


    // validar campos vacios

    if (calle.value === '') {
        calle.classList.add('is-invalid');
        campoVacio = true;
        if (primerError == null) {
            primerError = calle;
        }
        mensajesError.push("Calle invalida");
    }

    if (numCalle.value === '') {
        numCalle.classList.add('is-invalid');
        campoVacio = true;
        if (primerError == null) {
            primerError = numCalle;
        }
        mensajesError.push("El numero de calle es invalido");
    }
    
    if (esquina.value === '') {
        esquina.classList.add('is-invalid');
        campoVacio = true;
        if (primerError == null) {
            primerError = esquina;
        }
        mensajesError.push("La esquina es invalida");
    }

    // Validar que ningun input sea menor a 1, input cantidad

    let listaDeProductos = JSON.parse(localStorage.getItem("botonComprar"));

    for (let i = 0; i < listaDeProductos.length; i++) {
        let valorInput = document.getElementById('cantidad' + i).value;
        let idInput = document.getElementById('cantidad' + i);
        if (valorInput < 1) {
            idInput.classList.add('is-invalid');
            campoVacio = true;
            if (primerError == null) {
                primerError = idInput;
            }
            mensajesError.push("La cantidad es invalida");
        }
    }

    //validar que modal no este vacio
    let idTC = document.getElementById('idTC');
    let idCBANC = document.getElementById('idCBANC');

    if (idTC.checked) {
        const numTarjCred = document.getElementById("numTC");
        const numCVC = document.getElementById("codigoSeguridad");
        const numVenc = document.getElementById("vencimiento");
        if (numTarjCred.value === '' || numCVC.value === '' || numVenc.value === '') {
            mensajesError.push("Verificar campos de la tarjeta de credito");
            campoVacio = true;
        }
    } else if (idCBANC.checked) {
        const cuentaB = document.getElementById("numCUENTA");
        if (cuentaB.value === '') {
            mensajesError.push("El numero de cuenta bancaria es invalido");
            campoVacio = true;
        }
    }

    if (!campoVacio) {
        // proceda    
        document.getElementById("alerta-success").classList.add("show");      
    } else {
        //mostrar cartel corregi errores
        let errorMsg = "Errores:<br>";
        for (let i = 0; i < mensajesError.length; i++) {
            errorMsg += mensajesError[i] + "<br>";
        }
        AccesoDenegado(errorMsg);
    }
  }

  function AccesoDenegado(mensajedeError) {
    document.getElementById("texto-alerta").innerHTML = mensajedeError;
    document.getElementById("alerta-error").classList.add("show");
}

function cerrarError() {
    document.getElementById("alerta-error").classList.remove('show')
}

function cerrarSucces() {
    document.getElementById("alerta-success").classList.remove('show')
}




// Validar
// CONTROL MODAL - COMO HACER EL IF QUE CHEQUEE EL QUE ESTA SELECCIONADO, MANDAR TODO EL CONTROL AL BOTON SUBMIT Y BORRAR FUNCIONES 



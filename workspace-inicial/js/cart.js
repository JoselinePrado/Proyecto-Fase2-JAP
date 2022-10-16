// -- OBTENER DATOS DEL JSON --
const URL = CART_INFO_URL + "25801" + EXT_TYPE;
let comprarProductArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj);
            comprarProductArray = resultObj.data.articles;
            mostrarCompra();
            }       
    });
});

// FUNCION QUE RECORRE Y MUESTRA EL CONTENIDO DEL JSON

function mostrarCompra() {
    let contenidoCompra = "";
    let htmlBtnComprar = "";
    let contenidoProd = "";

    // RECORRER LISTA DE OBJETOS OBTENIDA POR EL BOTON COMPRAR EN PRODUCT-INFO.JS

    let listaComprar = [];
    if (localStorage.getItem("botonComprar") !== null) {
        listaComprar = JSON.parse(localStorage.getItem("botonComprar"));
        comprarProductArray.push(...listaComprar);
    }
    console.log(listaComprar);

    for (let i = 0; i < comprarProductArray.length; i++) {
        let datos = comprarProductArray[i];
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
                    <input class="mb-2 w-50 p-3 h-25 d-inline-block" type="number" id="cantidad${i}" name="cantidad" onkeyup="funcionMultiplicar(this.value, ${datos.unitCost}, '${datos.currency}', ${i})" value="${datos.count}">
                </div>  
                <div class="col"> 
                    <p class="mb-1" id="subtotal${i}">${datos.currency}${datos.unitCost}</p>
                </div>
                <div class="col"> 
                     <button type="button" class="btn btn-warning" onclick="eliminarElemento(${datos.id})">Eliminar</button>
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
   
}

// FUNCION QUE TOMA EL VALUE DEL INPUT CANTIDAD Y LO MULTIPLICA POR EL VALOR UNITARIO PARA LUEGO MOSTRAR EL SUBTOTAL

function funcionMultiplicar(value, unitCost, moneda, i) {
    var subtotal = value * unitCost;
    document.getElementById("subtotal" + i).innerHTML = moneda + subtotal;
}

function eliminarElemento(idABorrar){
    var lista =  JSON.parse(localStorage.getItem("botonComprar"));
    const listaNueva = lista.filter((item) => item.id !== idABorrar);
    localStorage.setItem("botonComprar", JSON.stringify(listaNueva));
    document.getElementById("comp-list-container").innerHTML = "";
    window.location = "cart.html";
    mostrarCompra();
};


let productsArray = [];
let comentariosArray = [];

function mostrarProductos() {
    let contenidoProductos = "";
    let datos = productsArray;
    let arrayImages = datos.images;
    let arrayRelacionados = datos.relatedProducts;
    let htmlRelacionados = "";
    let htmlImagenes = "";
    let jsonComentarios = comentariosArray;
    let htmlComentarios = "";

    if (arrayImages) {
        htmlImagenes += `<div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">`
                                for (let i = 0; i < arrayImages.length; i++) {
                                    htmlImagenes += `<div class="carousel-item ` + (i === 0 ? `active` : ``) +  `" data-bs-interval="5000">
                                                        <img src="${arrayImages[i]}" class="d-block w-100">
                                                    </div>`;
                                    } //for para recorrer las imagenes, ya que images es una lista en el JSON. lo guardo en variable para luego mostrar en html
            htmlImagenes += `</div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
                                <span class="text-dark">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
                                <span class="text-dark">Next</span>
                            </button>
                        </div>`
    }

    if (arrayRelacionados) {
        for (let i = 0; i < arrayRelacionados.length; i++) {
            htmlRelacionados += `
            <div  onclick="setCatID(${arrayRelacionados[i].id}, '${arrayRelacionados[i].name}')" class="col-md-5 border m-2">
            <img src="${arrayRelacionados[i].image}" class="img-responsive" width="90%" height="70%">                
            <div class="p-3 justify-content-between">
                <h4 class="mb-1">${arrayRelacionados[i].name}</h4>
            </div>
            <div class="p-3">
            <p class="mb-1 float-end"> <a href="product-info.html">Ver Mas...</a></p>
            </div>
        </div>` ;
           
        } //for para recorrer las imagenes, ya que images es una lista en el JSON. lo guardo en variable para luego mostrar en html
    }
 
    if (jsonComentarios) {
        for (let i = 0; i < jsonComentarios.length; i++) {   
            let cantidad = jsonComentarios[i].score;
            let starsHTML = stars(cantidad); //realizo llamada de la funcion con el parametro de score
                          
            htmlComentarios += `
            <div class="list-group-item list-group-item-action">
            <div  class="row">
                <div class="col">
                    <h6 class="mb-1"><small class="fw-bolder h6">${jsonComentarios[i].user}${" "}</small>-${" "}${jsonComentarios[i].dateTime}${" "}-${" "}${starsHTML}</h6>
                    <p class="mb-1">${jsonComentarios[i].description}</p>
                </div>
            </div>
            </div>
            <hr/>
                `

           ;
        } //for para recorrer los comentarios
    
    }

    contenidoProductos += `
    <div class="container-sm cursor-active">
                <h1 class="m-4 mb-1">${datos.name}</h1>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-danger me-md-2" type="button" id="comprar" onclick="clickComprar(${datos.id}, '${datos.name}', ${datos.cost}, '${datos.currency}', '${datos.images[0]}' )">Comprar</button>
                </div>
    </div>
        
     <hr/>

    <div class="list-group-item list-group-item-action">
            <div  class="row">
                <div class="col-6 text-center bg-light">       
                    <div class=" bg-dark text-white">
                        <h5>Imagenes Ilustrativas</h5>
                    </div>          
                    ${htmlImagenes}
                    </div>
                <div class="col">
                    <h5 class="col-3 bg-light">Precio</h5>
                        <p class="mb-2">${datos.cost}${" "}${datos.currency}</p>
                    <h5 class="col-3 bg-light">Descripcion</h5>
                        <p class="mb-2">${datos.description}</p>
                    <h5 class="col-3 bg-light">Categoria</h5>
                        <p class="mb-2">${datos.category}</p>
                    <h5 class="col-3 bg-light">Vendidos</h5>
                        <p class="mb-2">${datos.soldCount}</p>
                </div>
            </div>
    </div>
    <br/>
    <div class="col">
        <h5 class="col-3 bg-light">Comentarios</h5>
        <div class="col" id="showNewComent">         
            <textarea name="coment" id="newComent" cols="6" type"text" class="form-control" rows="3" placeholder="Ingrese Comentario"></textarea>
            <select name="id-star" id="starsNewComment">
                <option value="0" selected>Cantidad de estrellas:</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button type="button" id="enviar" class="btn btn-primary me-md-2" onclick="clickBtn()">Enviar</button>
        </div> 
        <p class="mb-1">${htmlComentarios}</p>
    </div>
        <hr/>
    <div class="container justify-content-center"> <h3 class=" bg-dark text-white text-center">Productos relacionados</h3>
                <div class="row justify-content-center"><p class="mb-1">${htmlRelacionados}</p></div>
    </div>
    `



        document.getElementById("product").innerHTML = contenidoProductos;
        

}


function setCatID(id, name) {
    localStorage.setItem("catID", id);
    localStorage.setItem("catName", name);
    
    window.location = "product-info.html";

}

function clickComprar(id, name, cost, currency, img) {
    var lista = [];
    console.log(localStorage.getItem("botonComprar"));
    if (localStorage.getItem("botonComprar") !== null) {
        lista = JSON.parse(localStorage.getItem("botonComprar"));
    }
    const objectoCarrito = {
        "id": id,
        "name": name,
        "count": 1,
        "unitCost": cost,
        "currency": currency,
        "image": img
    }
    console.log(lista);
    lista.push(objectoCarrito);
    localStorage.setItem("botonComprar", JSON.stringify(lista));
    
    window.location = "cart.html";

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + localStorage.catID + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
        }
        getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.catID + ".json").then(function(resultObj){
            if (resultObj.status === "ok") {
                comentariosArray = resultObj.data;
                mostrarProductos();
                iniciar();
            }
        });
    });
});



function stars(cantidad) { //funcion para convertir puntuacion en estrellas
    let star = "";
    for (let i = 0; i < cantidad; i++) {
        star += `<span class="fa fa-star checked"></span>` //estrellas chequeadas, pintadas
    }
    for (let i = cantidad; i < 5; i++) {
        star += `<span class="fa fa-star"></span>` //estrellas vacias
    }
    return star; //retorna string
} 

function iniciar() {
       // localStorage.setItem("listarComentarioNew", ""); RESETEA
    if (localStorage.getItem("listarComentarioNew" + localStorage.catID )) {
        mostrar(); //llama a funcion mostrar para que traiga el contenido almacenado en localSTORAGE al actualizar el nav
    }
}

function clickBtn() { 
    var showNewComent = document.getElementById("showNewComent");
    var starsComment = document.getElementById("starsNewComment").value; //toma valor del input de las estrellas
    var htmlEstrellas = stars(starsComment); // llama a la funcion de estrellas y le envia el valor
    var hoy = new Date();
    var ahora = hoy.toLocaleString();
    showNewComent.innerHTML += `<div class="list-group-item list-group-item-action">` + `<div  class="row">` + `<div class="col">` + `<h6 class="mb-1">` + `<small class="fw-bolder h6">` + localStorage.getItem("inputUSUARIO") + `</small>` + ` - ` + ahora +
    ` - ` + htmlEstrellas + `</h6>` + document.getElementById("newComent").value + `</div>` + `</div>` + `</div>` + `<hr/>`; //imprime en el contenedor lo ingresado en el value
    localStorage.setItem("listarComentarioNew" + localStorage.catID, showNewComent.innerHTML); //setea lo que esta en el contenedor y lo guarda en el div
    document.getElementById("newComent").value = ""; //reinicia el textArea
}



 // funcion para mostrar contenido al iniciar nav.
function mostrar () {
    var mostrarComentario = localStorage.getItem("listarComentarioNew" + localStorage.catID); //obtiene lo guardado en el div y lo almacena en la variable mostrarComentario
    document.getElementById("showNewComent").innerHTML = mostrarComentario;  //imprime el comentario y la muestra al ser llamada la funcion mostrar
   
}

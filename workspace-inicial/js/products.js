const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
let carsArray = [];

function mostrarListaDeCarros() {
    let contenidoAutos = "";

    for (let i = 0; i < carsArray.length; i++) {
        let car = carsArray[i];

        contenidoAutos += `
        <div  class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${car.image}" alt="${car.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${car.name}-${car.cost}${" "}${car.currency}</h4>
                        <small class="text-muted">${car.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${car.description}</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("cars").innerHTML = contenidoAutos;
    };

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carsArray = resultObj.data.products;
            mostrarListaDeCarros();

        }
    });




});
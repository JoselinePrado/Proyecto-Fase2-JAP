if (((minCost == undefined) || (minCost != undefined && parseInt(datos.cost) >= minCost)) &&
((maxCost == undefined) || (maxCost != undefined && parseInt(datos.cost) <= maxCost))
|| ((inputSearch == undefined) || (inputSearch != undefined && datos.name.includes(inputSearch))) ||
((inputSearch == undefined) || (inputSearch != undefined && datos.description.includes(inputSearch)))){

contenidoProductos += `
<div  class="list-group-item list-group-item-action">
<div class="row">
    <div class="col-3">
        <img src="${datos.image}" alt="${datos.description}" class="img-thumbnail">
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${datos.name}-${datos.cost}${" "}${datos.currency}</h4>
            <small class="text-muted">${datos.soldCount} vendidos</small>
        </div>
        <p class="mb-1">${datos.description}</p>
    </div>
</div>
</div>
`
}
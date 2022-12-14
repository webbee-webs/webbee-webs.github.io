var containerHTML = document.getElementById('container-products')
var allData = []
var getData = () => {
    getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.catID}.json`)
        .then(e => {
            allData = e.data.products;
            renderProducts(allData)
        })
}


/* -------------------------------------------------------------------------- */
/*                               RENDER PRODUCTS                              */
/* -------------------------------------------------------------------------- */

var renderProducts = (list) => {
    containerHTML.innerHTML = ''
    for (product of list) {
        containerHTML.innerHTML += `
        <div onclick="productID(${product.id})" class="card m-2 cursor-active" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.name} </br> ${product.currency} ${product.cost}</h5>
            <p class="card-text">${product.description}</p>
            <p class="fw-light">${product.soldCount} vendidos</p>
        </div>
        </div>`
    }
}

/* -------------------------------------------------------------------------- */
/*                                   FILTRO                                   */
/* -------------------------------------------------------------------------- */

var filter = () => {
    let min = document.getElementById('rangeFilterCountMin').value
    let max = document.getElementById('rangeFilterCountMax').value
    getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.catID}.json`)
        .then(e => {
            var products = e.data.products;

            let minList = products.filter((val) => {
                if (min == '') {
                    return true
                }
                if (val.cost >= min) {
                    return true
                }
                return false
            })

            let list = minList.filter((val) => {
                if (max == '') {
                    return true
                }
                if (val.cost <= max) {
                    return true
                }
                return false
            })
            allData = list
            renderProducts(list)

        })
}

var clearFilter = () => {
    document.getElementById('rangeFilterCountMin').value = ""
    document.getElementById('rangeFilterCountMax').value = ""
    getData()
}

/* -------------------------------------------------------------------------- */
/*                                   ORDENAR                                  */
/* -------------------------------------------------------------------------- */

function sortProducts(type, array) {
    let result = [];
    if (type == 'costDes') {
        result = array.sort(function (a, b) {
            return b.cost - a.cost
        })
    } else if (type == 'costAsc') {
        result = array.sort(function (a, b) {
            return a.cost - b.cost
        })
    } else {
        result = array.sort(function (a, b) {
            return b.soldCount - a.soldCount
        })
    }
    renderProducts(result)
}

/* -------------------------------------------------------------------------- */
/*                                   SEARCH                                   */
/* -------------------------------------------------------------------------- */

let search = (data = document.getElementById('searchInput').value) => {
    data = data.toLowerCase()
    let result = allData.filter((foo) => {
        if (foo.description.toLowerCase().includes(data) || foo.name.toLowerCase().includes(data)) {
            return foo
        }
    })
    renderProducts(result)
}


/* -------------------------------------------------------------------------- */
/*                                   EVENTS                                   */
/* -------------------------------------------------------------------------- */

document.getElementById('rangeFilterCount').addEventListener('click', () => filter())
document.getElementById('clearRangeFilter').addEventListener('click', () => clearFilter())
document.getElementById('sortCostDes').addEventListener('click', () => sortProducts('costDes', allData))
document.getElementById('sortCostAsc').addEventListener('click', () => sortProducts('costAsc', allData))
document.getElementById('sortSoldCount').addEventListener('click', () => sortProducts('change', allData))
document.getElementById('searchBtn').addEventListener('click', () => {
    search()
    document.getElementById('searchInput').addEventListener('input', (e) => search(e.target.value))
})

getData()
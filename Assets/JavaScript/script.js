var cards = [
    {
        "id": 1,
        "qty": 1,
        "productName": "Fudge Brownie Cake",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, rem hic labore dolore nisi unde nemo cumque repellendus excepturi aut?",
        "price": 10,
        "productImage": "https://www.fnp.com/images/pr/l/v20221205202934/fudge-brownie-cake_1.jpg"
    },

    {
        "id": 2,
        "qty": 1,
        "productName": "Cream Drop Cake",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum asperiores impedit vel! Numquam voluptatum, quo explicabo facere molestiae consectetur veritatis nulla, fugiat expedita facilis aperiam?",
        "price": 12.50,
        "productImage": "https://www.fnp.com/images/pr/l/v20221205202813/cream-drop-chocolate-cake_1.jpg"
    },

    {
        "id": 3,
        "qty": 1,
        "productName": "Chocolate Fudge Cake",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, molestiae.",
        "price": 11,
        "productImage": "https://www.fnp.com/images/pr/l/v20221118185148/chocolate-fudge-drizzled-cake_1.jpg"
    },

    {
        "id": 4,
        "qty": 1,
        "productName": "Vanilla Cream Cake",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda vel non fugit laboriosam vero sequi incidunt nam perspiciatis.",
        "price": 4,
        "productImage": "https://www.fnp.com/images/pr/l/v20221205202919/floral-vanilla-cream-cake_1.jpg"
    },

    {
        "id": 5,
        "qty": 1,
        "productName": "Red Valvet Cake",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat architecto similique ut sapiente!",
        "price": 8,
        "productImage": "https://www.fnp.com/images/pr/l/v20221219223530/red-velvet-heart-cake_1.jpg"
    },

    {
        "id": 6,
        "qty": 1,
        "productName": "Ferrero Rocher Cake",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, laboriosam molestias.",
        "price": 15.50,
        "productImage": "https://www.fnp.com/images/pr/l/v20221214202731/ferrero-rocher-truffle-cake_1.jpg"
    },
]

var prodItems = 0;
var prodPrice = 0;
var totalPrice = 0;
var dupArray = [];


$(document).ready(function () {
    $(".cart").hide();
    $("#showCart").on('click', function () {
        $('.cart').show();
        $('.main').fadeOut("slow");
    });

    $('#prodLists').on('click', function () {
        $('.main').show();
        $('.cart').fadeOut("slow");
    })

    // Parsley
    $("#form").on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        form.parsley().validate();
        if (form.parsley().isValid()) {
            Swal.fire(
                'Added Successfully',
                'New Product Added Successfully',
                'success'
            )
            acceptData();
            add.setAttribute("data-bs-dismiss", "modal");
            add.click();
            (() => {
                add.setAttribute("data-bs-dismiss", "");
            })();
        }
    });
});

window.onload = () => {
    arrange_cards();
}

function arrange_cards(allcards) {
    document.getElementById('list').innerHTML = '';

    for (let index of cards) {
        document.getElementById('list').innerHTML +=
            `<div class="col-md-3 card mb-4 p-0" id="${index.id}" style="margin-right: 8%">
                <img src=${index.productImage}
                    height="200px" style="object-fit: fit" />
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <p class="card-title">${index.productName}</p>
                        </div>
                        <div class="col-md-4">
                            <p class="card-text" style="text-align:right">$ ${index.price}</p>
                        </div>
                    </div>
                </div>
                <div class="card-footer p-0" style="text-align:center">
                    <button id="addToCart" onclick= 'addItem(${index.id})' style="width: 100%; height: 100%; background-color: rgb(0, 183, 255);">Add To Cart
                    </button>
                </div>
            </div>`
    }
}

function addItem(i) {
    var findParent = document.getElementById(i);
    var find = cards.find(cake => cake.id == findParent.id);
    if (dupArray.find(cake => cake.id === find.id)) {
        find.qty = find.qty + 1;
        prodPrice = prodPrice + find.price;
    }
    else {
        dupArray.push(find);
        prodItems++;
        prodPrice += find.price;
        Swal.fire(
            'Added Successfully',
            'Item Added In Cart Successfully',
            'success'
        )
    }
    displayItems();
}


function removeItem(i) {
    var FindParentInCart = document.getElementById(i);
    var findInDupArray = dupArray.find(cake => cake.id == FindParentInCart.id);
    let indexOfItem = dupArray.indexOf(findInDupArray);
    dupArray.splice(indexOfItem, 1);
    prodItems--;
    prodPrice -= (findInDupArray.price * findInDupArray.qty);
    displayItems();
    Swal.fire(
        'Item Removed',
        'Item Removed Successfully From Cart',
        'success'
    )
}



function displayItems() {
    document.getElementById('cartItems').innerHTML = '';

    for (let index of dupArray) {
        document.getElementById('cartItems').innerHTML += `
        <div class="col-lg-2 mt-2" style="text-align: center;" id = "${index.id}">
                    <img class="mx-auto" src="${index.productImage}" alt="Image" height="100px" style="object-fit: contain;">
                </div>
                <div class="col-lg-4 my-auto prodNameDes">
                    <p style="font-weight: bold;">${index.productName}</p>
                    <p>${index.description}</p>
                </div>
                <div class="col-lg-2 my-auto">
                    <p>$ ${index.price}</p>
                </div>
                <div class="col-lg-1 my-auto" style="text-align: center;">
                    <p>${index.qty}</p>
                </div>
                <div class="col-lg-1 my-auto">
                    <button id="removeItem" onclick = (removeItem(${index.id}))><i class="fa fa-trash" style="color: red; background-color: white; border: 0;"></i></button>
                </div>
                <div class="col-lg-2 my-auto">
                    <p>${index.price * index.qty}$</p>
                </div>
        `;
    }
    document.getElementById('totalPrice').innerHTML = ('$' + '' + prodPrice);
    document.getElementById('item-count').innerHTML = (`${prodItems} items`)
}



// Modal PopUp
let form = document.getElementById("form");
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
productPrice.value = Math.round(this.value * 100) / 100
let productURL = document.getElementById("productURL");
let productDescription = document.getElementById("productDescription");
let add = document.getElementById("add");
let index = 7;


function acceptData() {
    cards.push({
        id: index,
        qty: 1,
        productName: productName.value,
        description: productDescription.value,
        price: parseInt(productPrice.value),
        productImage: productURL.value,
    });

    console.log(cards)
    arrange_cards();
    resetform();
}


function resetform() {
    productName.value = '';
    productPrice.value = '';
    productURL.value = '';
    productDescription.value = '';
    $('#form').parsley().reset();
}

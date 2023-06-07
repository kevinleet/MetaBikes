console.log('script.js running successfully')

class Bike {
    constructor(_id, type, brand, model, price, color, weight, image, description) {
        this._id = _id;
        this.type = type;
        this.brand = brand;
        this.model = model;
        this.price = formatNumberWithDollar(price);
        this.color = color;
        this.weight = weight;
        this.image = image;
        this.description = description;
    }

    createDiv() {
        return `<div class="bike-grid-item">
        <img id="${this._id}" src="${this.image}"/>
        <br>
        <span>${this.brand} ${this.model}<br>${this.color}<br>${this.type} Bike, ${this.weight} lbs.<br>Price: ${this.price}<span>
        </div>`
    }

    createProductPage() {
        return `
        <img src="${this.image}"/>
        <span>
        <h1>${this.brand}<h1>
        <h2>${this.model}</h2>
        <h4>Type: ${this.type}</h4>
        <h4>Color: ${this.color}</h4>
        <h4>Weight: ${this.weight}lbs</h4>
        <br>
        <h2>Price: ${this.price}</h2>
        <button>ADD TO CART</button>
        <br>
        <h4>${this.description}</h4>
        </span>`
    }
}

class Accessory {
    constructor(_id, type, brand, item, price, img, description) {
        this._id = _id;
        this.type = type;
        this.brand = brand;
        this.item = item;
        this.price = formatNumberWithDollar(price);
        this.img = img;
        this.description = description;
    }

    createDiv() {
        return `<div class="accessory-grid-item">
        <img id="${this._id} "src="${this.img}"/>
        <br>
        <span>${this.brand}<br>${this.item}<br>Price: ${this.price}</span>
        </div>`
    }
}

function formatNumberWithDollar(price) {
    let formatting_options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
     }
     let dollarString = new Intl.NumberFormat("en-US", formatting_options);
     return dollarString.format(price)
}


$('#nav-home-btn').on('click', function () {
    $('.container-wrapper').children().css("display", "none")
    $('.home-container').css("display", "flex")
})

$('#nav-bikes-btn').on('click', async function () {
    $('.bikes-container').empty()
    $('.container-wrapper').children().css("display", "none")
    $('.bikes-container').css("display", "grid")

    let response = await axios.get('/api/bikes')
    let data = response.data
    for (const bike of data) {
        const { _id, type, brand, model, price, color, weight, image, description } = bike
        const newBike = new Bike(_id, type, brand, model, price, color, weight, image, description)
        $('.bikes-container').append(newBike.createDiv())
    }
})

$('.bikes-container').on('click', 'img', async function() {
    $('.bike-product-container').empty()
    $('.container-wrapper').children().css("display", "none")
    $('.bike-product-container').css("display", "flex")
    let id = $(this).prop("id")
    const response = await axios.get(`/api/bikes/${id}`)
    let data = response.data
    const { _id, type, brand, model, price, color, weight, image, description } = data
    console.log(data)
    let bike = new Bike(_id, type, brand, model, price, color, weight, image, description)
    $('.bike-product-container').append(bike.createProductPage())
})

$('#nav-accessories-btn').on('click', async function () {
    $('.accessories-container').empty()
    $('.container-wrapper').children().css("display", "none")
    $('.accessories-container').css("display", "grid")

    let response = await axios.get('/api/accessories')
    let data = response.data
    for (const accessory of data) {
        const { _id, type, brand, item, price, img, description } = accessory
        const newAccessory = new Accessory(_id, type, brand, item, price, img, description)
        $('.accessories-container').append(newAccessory.createDiv())
    }

})

$('#admin-login-btn').on('click', function () {
    $('.container-wrapper').children().css("display", "none")
    $('.admin-container').css("display", "flex")
})

$('#cart-img').on('click', function() {
    $('.container-wrapper').children().css("display", "none")
    $('.cart-container').css("display", "flex")
})

$('#nav-contact-btn').on('click', function() {
    $('.container-wrapper').children().css("display", "none")
    $('.contact-container').css("display", "flex")
})

$('#contact-submit-btn').on('click', function() {
    let name = $('#input-name').val()
    let email = $('#input-email').val()
    let message = $('#input-message').val()
    if (name && email && message) {
        console.log(name, email, message)
        $('#please-fill').css("display", "none")
        $('.input-div').children().val("")
        alert('Thank you for submitting your messsage.')
    } else {
        $('#please-fill').css("display", "block")
    }

})
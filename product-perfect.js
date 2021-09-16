const addProduct = () => {
    const nameField = document.getElementById('product-name');
    const priceField = document.getElementById('product-price');
    const name = nameField.value;
    const price = priceField.value;
    nameField.value = '';
    priceField.value = '';
    if (!name || !price) {
        return alert('Please Enter Name and Price!');
    }
    else {
        addToCart(name, price);
        location.reload();
    }
}

const displayFromLocalStorage = () => {
    const cart = getCart();
    for (let props of cart) {
        console.log(props);
        displayField(props.name, props.quantity, props.price);
    }
}

const displayField = (name, quantity, price) => {
    const ul = document.getElementById('products-in-cart');
    ul.innerHTML +=
        `
        <li>
        Name: ${name},
        Quantity: ${quantity},
        Price: ${price} taka,
        </li>
        
    `
}

const getCart = () => {
    const cart = localStorage.getItem('cartPerfect');
    let cartObj;
    if (cart) {
        cartObj = JSON.parse(cart);
    }
    else {
        cartObj = [];
    }
    return cartObj;
}

const addToCart = (name, price) => { // add to localStorage
    const cart = getCart();
    let update = 0;
    for (const product of cart) {
        if (product['name'].toLowerCase() == name.toLowerCase()) {
            product['quantity'] += 1;
            product['price'] = price;
            update = update + 1;
        }
    }
    if (update == 0) {
        const pd = {}
        pd['name'] = name;
        pd['price'] = price;
        pd['quantity'] = 1;
        cart.push(pd);
    }

    console.log(cart)
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cartPerfect', cartStringified);
}

const purchased = () => {
    document.getElementById('products-in-cart').textContent = ``;
    localStorage.removeItem('cartPerfect');
}

displayFromLocalStorage();
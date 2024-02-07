const formElementProduct = document.getElementById('createProduct');
const formElementOrder = document.getElementById('createOrder');
const display = document.getElementById('display');
const productOptions = document.getElementById('productOptions');
const productForm = document.getElementById('productForm');
const newProduct = document.getElementById('newProduct');

formElementProduct.addEventListener('submit', (event) => {
    event.preventDefault();
    let title = document.getElementById('productTitle').value;
    let price = document.getElementById('productPrice').value;
    let product = {
        title: title,
        price: price
    }
    let productJson = JSON.stringify(product);
    fetch('http://localhost:3000/products', {
        method: 'Post',
        body: productJson
    })
    displayProducts();
})

formElementOrder.addEventListener('submit', (event) => {
    event.preventDefault();
    let productId = document.getElementById('productOptions').value;
    let amount = document.getElementById('orderAmount').value;
    let acquired = document.getElementById('orderDate').value;
    let order = {
        productId: productId,
        amount: amount,
        acquired: acquired
    }
    let orderJson = JSON.stringify(order);
    fetch('http://localhost:3000/orders', {
        method: 'Post',
        body: orderJson
    })
})

newProduct.addEventListener('click', (event) => {
    event.preventDefault();
    productForm.classList.toggle('hidden');
})

const getData = async () => {
    const res = await fetch('http://localhost:3000/products')
    const data = await res.json();
    return data
}

const displayProducts = async () => {
    const products = await getData();
    
    let dataDisplay = products.map((product) => {
        const { title, price } = product;
        return `
            <div class='flex place-content-between w-[200px]'>
                <div class='p-2 w-full border border-black'>${title}</div>
                <div class='p-2 w-full border border-black'>${price}</div>            
            </div>
        `
    }).join("");

    let optionsDisplay = products.map((product) => {
        const { id, title } = product;
        return `
            <option value="${id}">${title}</option>
        `
    });

    display.innerHTML = dataDisplay;
    productOptions.innerHTML = optionsDisplay;
}

displayProducts();



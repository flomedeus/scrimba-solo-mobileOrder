import {menuArray} from "./data.js"

const itemsContainer = document.getElementById("items-container")
const orderContainer = document.getElementById("order-container")
const orderItems = document.getElementById("order-items")
const orderPrice = document.getElementById("order-price")
const paymentModal = document.getElementById("payment-modal")
let orderItemsArray = []
let orderPriceTotal = 0

function renderMenuItems(){
    itemsContainer.innerHTML = menuArray.map(item =>{
        const {name, ingredients, id, price, emoji} = item
        return `<div class="menu-item">
            <div class="item-emoji">
                <p>${emoji}</p>
            </div>
            <div class="menu-description">
                <p class="item-name">${name}</p>
                <p class="item-ingredients">${ingredients.join(", ")}</p>
                <p class="item-price">$${price}</p>
            </div>
            <button class="item-button" data-itemid="${id}">+</button>
        </div>`
    }).join('')

}

paymentModal.addEventListener("submit", e =>{
    e.preventDefault()
    paymentModal.style.display = 'none'
    const formName = document.getElementById("form-name")
    orderContainer.innerHTML = `<div class="thanks-div">
                                    <p>Thanks, ${formName.value}! Your order is on its way.</p>
                                </div>`
})

document.addEventListener('click',(e)=>{
    if(e.target.dataset.itemid){
        handleAddItemClick(e.target.dataset.itemid)
    }else if(e.target.dataset.ordereditemindex){
        handleRemoveItemClick(e.target.dataset.ordereditemindex)
    }else if(e.target.id === "order-btn"){
        handleOrder()
    }
})


function handleAddItemClick(itemId){
    const menuItemIndex = itemId
    orderItemsArray.push({"itemName" : menuArray[menuItemIndex].name,"itemPrice":menuArray[menuItemIndex].price})
    orderPriceTotal += menuArray[menuItemIndex].price
    renderOrder()
}

function handleRemoveItemClick(itemId){
    orderItemsArray = orderItemsArray.filter(((item,index) =>{
        return index !== Number(itemId)
    }))
    renderOrder()
}

function renderOrder(){
    if(orderItemsArray.length > 0){
        orderContainer.classList.remove('hidden')

    }else{
        orderContainer.classList.add('hidden')
    }
    orderPriceTotal = orderItemsArray.reduce((total,currentItem) => total + currentItem.itemPrice ,0)
    orderItems.innerHTML = orderItemsArray.map((item,index) =>{
        return `<div class="order-item">
                    <p>${item.itemName}</p>
                    <button aria-label="remove item" class="remove-btn" data-orderedItemIndex="${index}">X</button>
                    <p class="order-item-price">$${item.itemPrice}</p>
                </div>`
    }).join('')
    orderPrice.innerHTML = `
                <p>Total price:</p>
                <p>$${orderPriceTotal}</p>`
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

function handleOrder(){
    paymentModal.style.display = 'flex'
}

renderMenuItems()


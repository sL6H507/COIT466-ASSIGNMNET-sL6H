if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
function itemremover(){
            var cartItems = document.getElementsByClassName('cart-items')[0]
            while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)    
                                            }
        updateCartTotal()
    }

function purchaseClicked() {
    emptychecker();
    checkphone();        
    checkEmail();
    errmsgemail = errmsg1;
    errmsgphone=errmsg2;
    chP = ch1;
    chE = ch2;
    chfA = chf;
    if(chP == false && chE == false){clearfield(); itemremover(); alert("There's Something wrong in Address information\n"+errmsgemail+"\n"+errmsgphone)}
        
    else{
        if(chE == false){
        clearfield(); itemremover(); alert("There's Something wrong in Address information\n"+errmsgemail); 
        }else{
            if(chP == false){
                clearfield(); itemremover(); alert("There's Something wrong in Address information\n"+errmsgphone); 
            }else{            
    if(chP == true && chE == true && document.getElementById('name').value!="" && document.getElementById('email').value!="" && document.getElementById('phone').value!="" && document.getElementById('city').value!="" && document.getElementById('AD1').value!="" && document.getElementById('BD').value!=""){
            alert("Your Name: " +document.getElementById('name').value+"\nEmail: "+document.getElementById('email').value+"\nPhone Number: "+document.getElementById("phone").value+"\nYour Address: "+document.getElementById("city").value+", "+document.getElementById('AD1').value+",Building Number "+document.getElementById('BD').value+"\nYour Final Total ="+total1);           
            ch3 =true;
            clearfield();
            itemremover();
    }
    else{ 
        clearfield();
        itemremover();        
        }}
}
}}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var Category=shopItem.getElementsByClassName('category')[0].innerText
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, Category, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, Category, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">                            
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>          
        <span class="cart-price cart-column">${price}</span>
        <span class="category  cart-column">${Category}</span>  
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
var total1;
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total1=total;
    total1=Math.round(total * 100) / 100;
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
var itemprice = new Array();
var ch1,ch2,ch3 = false;
var errmsg1,errmsg2 ;
var chf = new Array();
        function emptychecker(){
            if(document.getElementById('name').value == ""){
                chf.push("Name");
            }
            if(document.getElementById('email').value == ""){
                chf.push("email");
            }
            if(document.getElementById('phone').value == ""){
                chf.push("phone");
            }
            if(document.getElementById('city').value == ""){
                chf.push("city");
            }
            if(document.getElementById('AD1').value == ""){
                chf.push("Address Line 1");
            }
            if(document.getElementById('BD').value == ""){
                chf.push("Building Number");
            }}
        
      function checkEmail() {        
        var email = document.getElementById('email');
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email.value)) {
        errmsg1='Please provide a valid email address';
        document.getElementById("email").value = null;
        ch2=false;}
        else{ch2 = true;}
        }
      function checkphone(){
			var str=document.getElementById("phone").value;
            var ptr=/^05[0-9]{8}$/;  
            var ptr1=/^5[0-9]{8}$/;               
            var chck=ptr.test(str);
            var chck1=ptr1.test(str);
            if(!chck && !chck1){
                document.getElementById("phone").value = null;
                ch1 = false;
                errmsg2=("Moblie Number is Incorrect should start with 05");            
        }
        else{
            ch1 = true;
        }}              
        function clearfield(){
            document.getElementById('name').value=null;
            document.getElementById('email').value=null;
            document.getElementById('phone').value=null;
            document.getElementById('city').value=null;
            document.getElementById('AD1').value=null;
            document.getElementById('BD').value=null;
        }
    

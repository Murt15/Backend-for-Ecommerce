// const mparentNode=document.getElementById("merch-container");

const url="13.233.195.42";


const parentNode=document.getElementById("musicContainer");

const cart = document.getElementById("cart-details")

cart.addEventListener('click', removeFromCart)

const pagination=document.getElementById("pagination");

const cpagination=document.getElementById("class-pagination");

const order=document.getElementById('purchase-id')

order.addEventListener('click',placeOrder)


// Event Listener For refreshing the Page
window.addEventListener('DOMContentLoaded',(data)=>{
    const page=1;
    getProducts(page);
    getCartProducts(page);
    
    
});


function getProducts(page){
    parentNode.innerHTML='';
   
    axios.get(`${url}/products/music/?page=${page}`)
    .then((Music) => {
        // console.log(Music.data);
        //console.log(Music.data.data);
        Music.data.data.forEach(data => {
            
            var childHTML=` <div class="box" id="${data.id}">
                                <h3 class="h3">${data.title}</h3>
                                <div class="img-cont">
                                    <img class="product-imgs"
                                        src="${data.imageUrl}"
                                        alt="">
                                </div>
                                <div class="product-details">
                                    <span>$<span>${data.price}</span></span>
                                    <button class="shop-btn" id="shop-btn" type='button'>ADD TO CART</button>
                                </div>
                            </div>`
            parentNode.innerHTML = parentNode.innerHTML + childHTML;
            showPagination(Music.data.currentPage,Music.data.hasNextPage,Music.data.hasPreviousPage,Music.data.lastPage,Music.data.nextPage,Music.data.previousPage)
        });
        
            
    }).catch((err) => { 
        console.log(err)
    });
    // mparentNode.innerHTML='';

    // axios.get(`${url}/products/merch/?page=${page}`)
    // .then((Merch)=>{
    //     //console.log(Merch.data.data)
    //     Merch.data.data.forEach(data=>{
        
    //     var childHTML=`<div class="box" id="${data.id}">
    //                         <h3 class="h3">${data.title}</h3>
    //                         <div class="img-cont">
    //                             <img class="product-imgs"
    //                                 src="${data.imageUrl}"
    //                                 alt="">
    //                         </div>
    //                         <div class="product-details">
    //                             <span>$<span>${data.price}</span></span>
    //                             <button class="shop-btn" id="shop-btn" type='button'>ADD TO CART</button>
    //                         </div>
    //                     </div>`
        
        

    //     mparentNode.innerHTML = mparentNode.innerHTML + childHTML;
        
    //     })
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
   
}

function getCartProducts(page){

    
    var cparentNode = document.getElementById("cart-details");
    cparentNode.innerHTML='';
    axios.get(`${url}/cart/get-products/?cart=${page}`)      
    .then((Products)=>{
        //console.log(Products.data.data)
        // console.log(Products)
        var totalPrice=0;
        Products.data.cartMusic.forEach((data)=>{
            //console.log(data)
            var childHTML = `<li class="cart-details-li" id=${data.id}>
                            <span class="cart-details-img"><img src="${data.imageUrl}" alt=""></span>
                            <span class="cart-details-title cart-col">${data.title}</span>
                            <span class="cart-details-price cart-col">$${data.price}</span>
                            <input  class="cart-details-number" type="number" value="1">
                            <button id="remove-btn" class="cart-details-btn" type="submit">Remove</button>
                            </li>`
                            
            cparentNode.innerHTML = cparentNode.innerHTML + childHTML;
            const total=document.getElementById("total-price");
            totalPrice = totalPrice + data.price;
            total.innerText = `Total: $${totalPrice}`;
            showCartPagination(Products.data.currentPage,Products.data.hasNextPage,Products.data.hasPreviousPage,Products.data.lastPage,Products.data.nextPage,Products.data.previousPage)


        })
        

    }).catch(err=>console.log(err));
    
}


function addtoCart(event){
    
    if (event.target.id === 'shop-btn') {
        const id=event.target.parentElement.parentElement.id
        const parentDiv = event.target.parentElement.parentElement;
        const title = parentDiv.children[0].innerText
        const imageUrl = parentDiv.children[1].children[0].src
        const price = parentDiv.children[2].children[0].children[0].innerText
        const quantity=1;

        const cart={
           id:id, title:title,imageUrl:imageUrl,price:price,quantity:quantity
        }

        axios.post("${url}/cart/add-product",cart)
        .then((res)=>{
            // console.log(data);
            console.log();
            if(res.data.alreadyExisting==true){
                window.alert('Product is Already In the Cart');
                
            }
            else{
                let page=1
                getCartProducts(page);
                //Popping Notification
                const container = document.getElementById("notificationContainer");
                const notif = document.createElement("div");
                notif.classList.add("notification");

                notif.innerText = `Your Product: ${title}  is Added To the Cart`;

                container.appendChild(notif);

                setTimeout(() => {
                    notif.remove();
                }, 3000);

                
            }
            


            
           
        })
        .catch(err=>console.log(err))
    }
}

//Remove From Screen and delete From backend
function removeFromCart(event) {
    if (event.target.id === 'remove-btn') {
        
        
        responseid=event.target.parentElement.id
        const url="${url}/cart/delete-product/"+responseid
        axios.post(url)
        .then(()=>{
            
            let page=1;
            getCartProducts(page);
             //Subtracting From the Total
            
            })
        .catch(err=>console.log(err))
       

        //Subtract Total 

       
    }

    
}

function popupCart(event) {
    if (event.target.id === "close-btn" || event.target.id === "cart-btn" || event.target.id === "see-the-cart") {
        const nav = document.getElementById('navCart');
        nav.classList.toggle('active');
    }

}

function showPagination(currentPage,hasNextPage,hasPreviousPage,lastPage,nextPage,previousPage){
    pagination.innerHTML='';

    if(hasPreviousPage){
        const button2 = document.createElement('button');
        button2.classList.add('active');
        button2.innerHTML = previousPage;
        button2.addEventListener('click', ()=>getProducts(previousPage));
        pagination.appendChild(button2);

    }



    const button1 = document.createElement('button');
    button1.classList.add('active');
    button1.innerHTML = `<h3>${currentPage}<h3>`;
    
    button1.addEventListener('click', ()=>getProducts(currentPage))
    pagination.appendChild(button1);

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.classList.add('active');
        button3.innerHTML = nextPage;
        button3.addEventListener('click',()=>getProducts(nextPage))
        pagination.appendChild(button3);
    }
  
}

function showCartPagination(currentPage,hasNextPage,hasPreviousPage,lastPage,nextPage,previousPage){
    cpagination.innerHTML='';

    if(hasPreviousPage){
        const button2 = document.createElement('button');
        button2.classList.add('active');
        button2.innerHTML = previousPage;
        button2.addEventListener('click', ()=>getCartProducts(previousPage));
        cpagination.appendChild(button2);

    }



    const button1 = document.createElement('button');
    button1.classList.add('active');
    button1.innerHTML = `<h3>${currentPage}<h3>`;
    
    button1.addEventListener('click', ()=>getCartProducts(currentPage))
    cpagination.appendChild(button1);

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.classList.add('active');
        button3.innerHTML = nextPage;
        button3.addEventListener('click',()=>getCartProducts(nextPage))
        cpagination.appendChild(button3);
    }
  
}

function placeOrder(event){
    if(cart.children.length>0){
        axios.post(`${url}/cart/postOrder`)
        .then(res=>{
            console.log(res);
            window.alert('Your Order Has been Sucessfully Placed')
            let page=1
            getCartProducts(page);
        })
        .catch(err=>console.log(err))
    }
    else{
        window.alert("Cart is Empty");
    }
   


     
    
}

        

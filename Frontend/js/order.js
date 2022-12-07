
const oparentNode=document.getElementById('order-page')

 const url="http://52.91.88.205:5555";
 //const url="http://localhost:5555";

window.addEventListener('DOMContentLoaded',()=>{
    getOrder();
})


function getOrder(){
    axios.get(`${url}/cart/get-productsforOrder`)
    .then((data)=>{
        console.log(data);
        let prodid=data.data.length;
        for(let i=data.data.length-1;i>=0;i--){
            
            let totalPriceforOrder=0;
            // console.log(data.data[i]);
            const section=document.createElement('div')
            const div=document.createElement('div')
            div.className=("div-order-cart");
            section.className=("orderDetails");
            section.id=("order-details");
            oparentNode.appendChild(section);
            let heading=`<h2>ProductID:${prodid}</h2><br></br>`
            prodid--;
            section.innerHTML+=heading;
            section.appendChild(div);
            const ul=document.createElement('ul')
            ul.className="div-order-cart";
            
        

             for(let j=0;j<data.data[i].length;j++)
             {
                //console.log(data.data[i][j])
                totalPriceforOrder=totalPriceforOrder+data.data[i][j].price
                let items=`<li class="order-item-list"><img src=${data.data[i][j].imageUrl} alt="">${data.data[i][j].title}</li>`
                div.innerHTML+=items;
                
             }
            
            childHTML=`
            <h3>Total Order Value: $${totalPriceforOrder}</h3>`
            section.innerHTML=section.innerHTML+childHTML;
           
        }


    })
    .catch(err=>console.log(err))
}

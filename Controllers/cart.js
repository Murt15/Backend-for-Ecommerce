const Cart = require('../models/cart');
const cartMusic = require('../models/cartMusic');
const Music = require('../models/music');
const Users = require('../models/user');
const Orders=require('../models/order');
const orderMusic=require('../models/orderMusic')

const ITEMS_PER_PAGE = 2;

exports.postAddProduct = (req, res, next) => {

    const id = req.body.id;
    let fetchedCart;
    let prod;

    Users.findByPk(1)
        .then((user) => {

            return user.getCart();
        })
        .then((cart) => {

            fetchedCart = cart;

            return Music.findByPk(id);
        })
        .then((product)=>{
            prod=product;

            return cartMusic.findAll( { where: { musicId: id } } );
            
        })
        .then((response) => {

            //console.log(response.length);

            if(response.length == 0) {

                fetchedCart.addMusic(prod)
                    .then(() => {

                        res.json({alreadyExisting: false})
                    })
                    .catch(err => console.log(err));
            }
            else {

                res.json({alreadyExisting: true});
            }
        })
        .catch(err => console.log(err))
    }

exports.getProducts = (req, res, next) => {

    const pageNumber = req.query.cart;
    let totalProducts;
    let fetchedMusic;
    

    Users.findByPk(1)
        .then((user) => {

            return user.getCart();
        })
        .then((cart) => {

            // fetchedCart = cart;

            return cart.getMusic({
                offset: (pageNumber - 1) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE
            });
        })
        .then((musics) => {

            fetchedMusic = musics;
            return cartMusic.count()
        })
        .then((numberOfProducts) => {

            totalProducts = numberOfProducts;

            const dataOfProducts = {

                cartMusic: fetchedMusic,

                totalProducts: totalProducts,

                hasNextPage: (ITEMS_PER_PAGE * pageNumber) < totalProducts,
                hasPreviousPage: pageNumber > 1,

                nextPage: parseInt(pageNumber) + 1,
                currentPage: parseInt(pageNumber),
                previousPage: parseInt(pageNumber) - 1,

                lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE)
            }

            res.json(dataOfProducts);
        })
    
}

exports.postdeleteProduct = (req, res, next) => {
    const id = req.params.productid;
    console.log(id);
    Users.findByPk(1)
        .then((user) => {

            return user.getCart();
        })
        .then((cart) => {

            return cart.getMusic({where: {id:id}})
        })
        .then((musics) => {

            const music = musics[0];
            
            return music.cartMusic.destroy();
        })
        .then((response) => {
            res.json(response);
        })
    
}
exports.postOrder = async (req, res, next) => {

    // From Carts table we get cartID based on userID
    // Then from cartID we can get all the items in the cartMusics table with the same cartID
    // Then create a new order row with orderid
    // Then add all the products with musicId from cartMusics table into the orderProduct table with same orderID
    // Then clear cartMusics 
    try{

        const user = await Users.findByPk(1);

        const cart = await user.getCart();

        const cartMusics = await cartMusic.findAll( { where: { cartId: cart.id } } );

        let total = 0;

        const newOrder = await Orders.create({

            totalPrice: 1,
            userId: user.id
          });

        for(let i = 0; i < cartMusics.length; i++) {

            const product = await Music.findByPk(cartMusics[i].dataValues.musicId);

            const currentPrice = product.dataValues.price;

            total = (parseFloat(total) + parseFloat(currentPrice)).toFixed(2);

            await orderMusic.create({

                    orderId: newOrder.id,
                    musicId: product.id
                });
        }

        await Orders.update(
                {totalPrice: total},
                {where: {id: newOrder.id}}
            )

        await cartMusic.destroy({
            where: {cartId: cart.id}
        })

        res.json({sucess: true});

    } catch(err) {

        console.log(err);
        res.json({sucess: false});
    }

}
exports.getAllOrders = async (req, res, next) => {

    const user = await Users.findByPk(1);

    // orders will be an array
    const orders = await user.getOrders();

    const ordersArray = [];

    // [order1 = [prod1, prod2, prod3], 
    //  order2 = [prod1, prod2, prod3], 
    //  order3 = [prod1, prod2, prod3]]

    for(let i = 0; i < orders.length; i++) {

        const orderDetails = await orderMusic.findAll( { where: {orderId: orders[i].id } } );
        const productsArray = [];
        
        for(let j = 0; j < orderDetails.length; j++) {

            const musicId = orderDetails[j].dataValues.musicId;
            
            const product = await Music.findByPk(musicId);

            productsArray.push(product);

            //console.log(orders[i].id)
            //console.log(product);
        }
        
        ordersArray.push(productsArray);
       //res.json({orderid:orders[i].id})
        
    }
    // console.log(ordersArray)
    res.json(ordersArray);
    
    
}

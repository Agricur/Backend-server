const Cart = require("../model/cart");
const Product = require("../model/products");
const jwt = require("jsonwebtoken");

const createCart = async (req, res) => {
  const { user_id } = req.body;
  var cart_id = await Cart.getCartId(user_id);

  if (!cart_id) {
    await Cart.createACart(user_id);
    cart_id = await Cart.getCartId(user_id);
  }
  const { cartItems } = req.body;
  // console.log(cartItems)
  const getCartItems = await Cart.getCartItems(cart_id);
  if (getCartItems) {
    for (let i = 0; i < cartItems.length; i++) {
      const { product_id, quantity, price, image } = cartItems[i];
      const currentID = product_id
      var noOfProducts = 0;
      for (let j = 0; j < getCartItems.length; j++) {
        const { product_id } = getCartItems[j];
        if (product_id != currentID) {   
          noOfProducts++; 
        }
      }
      if (noOfProducts == getCartItems.length) { 
        await Cart.insertProduct(cart_id, product_id, quantity, price, image);
      }
    }
  } else {
    for (let i = 0; i < cartItems.length; i++) {
      const { product_id, quantity, price, image } = cartItems[i];

      await Cart.insertProduct(cart_id, product_id, quantity, price, image);
    }
  }

  res.status(201);
};

const insertProduct = async (req, res) => {
  const { currentCart } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  var userId = "";
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    userId = decoded.user_id;
  });
  const cart_id = await Cart.getCartId(userId);

  const getCartItems = await Cart.getCartItems(cart_id);

  if (getCartItems) {
    for (let i = 0; i < currentCart.length; i++) {
      const { product_id, quantity, price, image } = currentCart[i];
      var noOfProducts = 0;
      const currentID = product_id;
      const currentQuantity = quantity;
      for (let j = 0; j < getCartItems.length; j++) {
        const { product_id, quantity } = getCartItems[j];
        if (product_id != currentID) {
          noOfProducts++;
        } else {
          if (quantity != currentQuantity) {
            await Cart.updateQuantity(currentQuantity, cart_id, product_id);
          }
        }
      }
      if (noOfProducts == getCartItems.length) {
        await Cart.insertProduct(cart_id, product_id, quantity, price, image);
      }
    }
  } else {
    for (let i = 0; i < currentCart.length; i++) {
      const { product_id, quantity, price,image } = currentCart[i];
      await Cart.insertProduct(cart_id, product_id, quantity, price, image);
    }
  }
  res.status(201).json({ message: "Products added to cart" });
}; 

const getCart = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  var userId = "";
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) { 
      return res.status(403).json({ error: "Invalid token" });
    }
    userId = decoded.user_id;
  });

  const cart_id = await Cart.getCartId(userId);
  if (!cart_id) {
    return res.status(200).json({ error: "No cart items" });
  }
  const cartItems = await Cart.getCartItems(cart_id);
  if (!cartItems) {
    return res.status(200).json({ error: "No cart items" });
  }

  for (let i = 0; i < cartItems.length; i++) {
    const { product_id } = cartItems[i];
    const product = await Product.getProduct(product_id); 
    cartItems[i].name = product.name; 
  }

  res.status(200).json({ cartItems });
};

const updateCart = async (req, res) => {
  const { userCookie, cartItems } = req.body;
  var userId = "";
  jwt.verify(userCookie, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    userId = decoded.user_id;
  });
  const cart_id = await Cart.getCartId(userId); 
  const currentCart = await Cart.getCartItems(cart_id);
  for (let i = 0; i < currentCart.length; i++) {
    const { product_id, quantity} = currentCart[i];
    const currentProductId = product_id
    const currentQuantity = quantity;
    for (let j = 0; j < cartItems.length; j++) {
      const { product_id, quantity } = cartItems[j];
      const id = product_id
      // console.log(currentProductId,id)
      if (currentProductId === id && quantity != currentQuantity ) {   
          // console.log(quantity,currentQuantity,id)
          await Cart.updateQuantity(quantity, cart_id, id);
      }
    }
  }
}; 

const removeItems = async (req,res)=>{
  const { userCookie, cartItems } = req.body;
  var userId = "";
  jwt.verify(userCookie, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    userId = decoded.user_id;
  });
  const cart_id = await Cart.getCartId(userId); 
  const currentCart = await Cart.getCartItems(cart_id);
  for (let i = 0; i < currentCart.length; i++) {
    const { product_id} = currentCart[i];
    const currentProductId = product_id
    var count = 0;
    for (let j = 0; j < cartItems.length; j++) {
      const { product_id} = cartItems[j];
      const id = product_id
      if (currentProductId != id ) {   
          count++;
      }
    }
    if(count == cartItems.length){
      await Cart.deleteProduct(cart_id,currentProductId)
    }
  }
 
}
 
module.exports = {
  createCart,
  insertProduct,
  getCart,
  updateCart,
  removeItems,
};
  
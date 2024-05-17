// controllers/cartController.js

const Cart = require('../Model/cart');

const Diamond = require('../Model/DiomandAlldataModel');
const Ring = require('../Model/AddRing');

// exports.addToCart = async (req, res) => {
//   try {
//     const { productData, quantity } = req.body;
//     console.log()
//     // Find the diamond by ID
//     // const diamond = await Cart.findById(productData);
//     // if (!diamond) {
//     //   return res.status(404).json({ error: 'Diamond not found' });
//     // }

//     // Create a new product referencing the diamond
//     const newProduct = new Cart({
//       productData: productData,
//       quantity: quantity
//     });

//     // Save the product to the database
//     await newProduct.save();

//     res.status(201).json({ message: 'Product added to bag successfully' });
//   } catch (error) {
//     console.error('Error adding product to bag:', error);
//     res.status(500).json({ error: 'Failed to add product to bag. Please try again later.' });
//   }
// };


// exports.addToCart = async (req, res) => {
//   try {
//     const { productData,productId, quantity } = req.body;

//     if (!productId || !quantity) {
//       return res.status(400).json({ error: `${productId}ProductId and quantity are required ${quantity}` });
//     }

//     // Find if the product already exists in the cart
//     let cartItem = await Cart.findOne({ productData: productId });

//     if (cartItem) {
//       // If the product already exists in the cart, update the quantity
//       cartItem.quantity += quantity;
//     } else {
//       // If the product doesn't exist in the cart, create a new cart item
//       cartItem = new Cart({
//         productData: productData,
//         quantity: quantity
//       });
//     }

//     // Save the cart item to the database
//     await cartItem.save();

//     res.status(201).json({ message: 'Product added to cart successfully' });
//   } catch (error) {
//     console.error('Error adding product to cart:', error);
//     res.status(500).json({ error: 'Failed to add product to cart. Please try again later.' });
//   }
// };
exports.addToCart = async (req, res) => {
  try {
    const { productId, category, quantity,size } = req.body;
console.log("size",size)
    // Validate input
    if (!productId || !category || !quantity || quantity < 1 || (!size && category !== 'Ring') ||  (!size && category !== 'Diamond')) {
      return res.status(400).json({ error: 'Invalid productId, category, or quantity' });
    }

    let product;
    if (category === 'Diamond') {
      product = await Diamond.findById(productId);
    } else if (category === 'Ring') {
      product = await Ring.findById(productId);
    } else {
      return res.status(400).json({ error: 'Invalid product category' });
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the product is already in the cart
    let cartItem = await Cart.findOne({
      [category.toLowerCase()]: productId,
    });

    if (cartItem) {
      // If the product already exists in the cart for the same category, update the quantity
      if (category === 'Diamond' && cartItem.productData.toString() === productId) {
        cartItem.quantity += quantity;
        cartItem.size = size; // Update the size
      } else if (category === 'Ring' && cartItem.productDataRing.toString() === productId) {
        cartItem.quantity += quantity;
        cartItem.size = size; // Update the size
      } else {
        // If the product exists in the cart but for a different category, create a new cart item
        const cartData = {
          quantity,
          size,
        };

        if (category === 'Diamond') {
          cartData.productData = productId;
        } else if (category === 'Ring') {
          cartData.productDataRing = productId;
        }

        cartItem = new Cart(cartData);
      }

      await cartItem.save();
    } else {
      // If the product doesn't exist in the cart, create a new cart item
      const cartData = {
        quantity,
        size,
      };

      if (category === 'Diamond') {
        cartData.productData = productId;
      } else if (category === 'Ring') {
        cartData.productDataRing = productId;
      }

      cartItem = new Cart(cartData);
      await cartItem.save();
    }

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart. Please try again later.' });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    // Retrieve all items from the cart
    const cartItems = await Cart.find({  }).populate([
      {
        path: 'productData',
        model: 'Diamond',
      },
      {
        path: 'productDataRing',
        model: 'Ring',
      },
    ]);

    // Prepare the response data
    const cartItemsData = cartItems.map((item) => {
      let productData = null;
      let productModel = null;

      if (item.productData) {
        productData = item.productData;
        productModel = 'Diamond';
      } else if (item.productDataRing) {
        productData = item.productDataRing;
        productModel = 'Ring';
      }

      return {
        _id: item._id,
        productData,
        productModel,
        quantity: item.quantity,
        size:item.size
      };
    });

    res.status(200).json(cartItemsData);
  } catch (error) {
    console.error('Error getting cart items:', error);
    res.status(500).json({ error: 'Failed to retrieve cart items. Please try again later.' });
  }
};

exports.removeCartItems = async (req, res) => {
  const { id } = req.params;
  try {
      const deletedCart = await Cart.findByIdAndDelete(id);
      if (!deletedCart) {
          return res.status(404).json({ success: false, error: 'cart not found' });
      }
      res.status(200).json({ success: true, message: 'cart deleted successfully' });
  } catch (error) {
      console.error('Error deleting cart by ID:', error);
      res.status(500).json({ success: false, error: 'Error deleting cart data' });
  }
};
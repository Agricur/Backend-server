const Product = require("../model/products");
const User = require("../model/user");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    for (const item of products) {
      const shop_id = item.shop_id;
      const shop_name = await User.getShopNames(shop_id);
      item.shop_name = shop_name;
    }
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getFruits = async (req, res) => {
  try {
    const products = await Product.getFruits();
    for (const item of products) {
      const shop_id = item.shop_id;
      const shop_name = await User.getShopNames(shop_id);
      item.shop_name = shop_name;
    }
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getVegetables = async (req, res) => {
  try {
    const products = await Product.getVegetables();
    for (const item of products) {
      const shop_id = item.shop_id;
      const shop_name = await User.getShopNames(shop_id);
      item.shop_name = shop_name;
    }
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getGrains = async (req, res) => {
  try {
    const products = await Product.getGrains();
    for (const item of products) {
      const shop_id = item.shop_id;
      const shop_name = await User.getShopNames(shop_id);
      item.shop_name = shop_name;
    }
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getFertilizers = async (req, res) => {
  try {
    const products = await Product.getFertilizers();
    for (const item of products) {
      const shop_id = item.shop_id;
      const shop_name = await User.getShopNames(shop_id);
      item.shop_name = shop_name;
    }
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getEquipments = async (req, res) => {
  try {
    const products = await Product.getEquipments();
    for (const item of products) {
      const shop_id = item.shop_id;
      const shop_name = await User.getShopNames(shop_id);
      item.shop_name = shop_name;
    }
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getProduct = async (req, res) => {
  try {
    const product_id = req.params.id;
    const product = await Product.getProduct(product_id);
    const shop_id = product.shop_id;
    const shop_name = await User.getShopNames(shop_id);
    product.shop_name = shop_name;
    res.status(200).json({ product: product });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const addRating = async (req, res) => {
  try {
    const product_id = req.params.productId;
    const rating = req.body.rating;
    const user_id = req.body.user_id;
    let points;
    if (rating === 1) {
      points = 20;
    } else if (rating === 2) {
      points = 40;
    } else if (rating === 3) {
      points = 60;
    } else if (rating === 4) {
      points = 80;
    } else if (rating === 5) {
      points = 100;
    }

    const ratingExists = await Product.getRating(product_id, user_id);

    if(ratingExists.length === 0){
        await Product.addRating(product_id, points, user_id);
        res.status(200).json("Rating added successfully");
    }else{
        await Product.updateRatings(points, product_id, user_id);
        res.status(200).json("Rating updated successfully");
    }

    const average = await calculateRatings(product_id);
    await Product.updateProductRatings(average, product_id);
    
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const calculateRatings = async (product_id) => {
  try {
    const points = await Product.getRatings(product_id);
    let sum = 0;
    for (const rating of points) {
      sum += rating.rating;
    }
    const average = sum / points.length;
    const avgRating = average/50
    return avgRating;
  } catch (err) {
    return err;
  }
};

const getRating = async (req, res) => {
    try {
        const product_id = req.params.productId;
        const rating = await Product.getProductRatings(product_id);

        if(rating.rating === null){
            res.status(200).json({rating:{ rating: 0 }});
        }else{
            res.status(200).json({ rating: rating });
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
    }

module.exports = {
  getAllProducts,
  getFruits,
  getVegetables,
  getGrains,
  getFertilizers,
  getEquipments,
  getProduct,
  addRating,
  getRating,
};

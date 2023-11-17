const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const mongoose = require("mongoose");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { title, description, price, brand, quantity, sold, images } =
      req.body;
    let { category } = req.body;
    if (!title || !description || !price || !brand || !quantity) {
      return res
        .status(400)
        .json({ error: "Por favor, complete todos los campos obligatorios" });
    }

    let categoryID = null; // inicializo categoy como nulo

    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        categoryID = category;
      } else {
        const categoryByName = await Category.findOne({ title: category });

        if (!categoryByName) {
          return res.status(400).json({ error: "La categoría no existe" });
        }

        categoryID = categoryByName._id;
      }
    }

    const slug = slugify(title, { lower: true });

    const imagePath = `/backend/images/${images}`;

    const newProduct = await Product.create({
      title,
      slug,
      description,
      price,
      category: categoryID, // Usa el ID de la categoría o nulo si no se proporciona
      brand,
      quantity,
      sold,
      images: imagePath, // Almacena la ruta completa de la imagen
    });

    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updatedFields = { ...req.body };

    if (updatedFields.category) {
      if (!mongoose.Types.ObjectId.isValid(updatedFields.category)) {
        const categoryByName = await Category.findOne({
          title: updatedFields.category,
        });

        if (categoryByName) {
          updatedFields.category = categoryByName._id;
        }
      }
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: updatedFields },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: productId });
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id).populate(
      "category",
      "title"
    );
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const { category, id } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (id) {
      filter._id = id;
    }

    const getallProducts = await Product.find(filter).populate(
      "category",
      "title"
    );

    res.json(getallProducts);
  } catch (error) {
    throw Error(error);
  }
});
module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};

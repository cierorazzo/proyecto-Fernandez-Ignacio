const Category = require( "../models/categoryModel" );
const Product = require("../models/productModel");
const asyncHandler = require( "express-async-handler" );

const createCategory = asyncHandler( async( req, res ) => {
  try {
    const newCategory = await Category.create( req.body );
    res.json( newCategory );
  } catch (error) {
    throw new Error( error );
  }
} );

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Actualiza los productos relacionados con esta categoría
    await Product.updateMany({ category: updatedCategory._id }, { category: updatedCategory._id });

    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler( async( req, res ) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete( id );
    res.json( deletedCategory );
  } catch (error) {
    throw new Error( error );
  }
} );

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createCategory, updateCategory, deleteCategory, getAllCategories };
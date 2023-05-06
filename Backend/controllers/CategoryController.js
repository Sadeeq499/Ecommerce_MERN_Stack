import Category from "../models/Category.js";
import { categoryValidation } from "../helpers/joiValidation.js";
import slugify from "slugify";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = categoryValidation(req.body);
    error ? res.status(400).json({ error: error.details[0].message }) : null;

    const existCategory = await Category.findOne({ name });
    if (existCategory) return res.status(400).send("Category already exist");

    const category = new Category({
      name,
      slug: slugify(name),
    }).save();

    res.send({
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { error } = categoryValidation(req.body);
  error ? res.status(400).json({ error: error.details[0].message }) : null;

  const UpdateCategory = await Category.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!UpdateCategory) return res.status(400).send("Category not found");
  res.send({
    message: "Category updated successfully",
    UpdateCategory,
  });
};

// Get all categories
export const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.send(categories);
};

// get a single category by slug
export const getCategoryById = async (req, res) => {
  const { slug } = req.params;
  const category = await Category.findOne({ slug });
  if (!category) return res.status(400).send("Category not found");
  res.send(category);
};

// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return res.status(400).send("Category not found");
  res.send("Category deleted successfully");
};

import Products from "../Models/Products.js";
import formidable from "express-formidable";
import fs from "fs";
import { productValidation } from "../helpers/joiValidation.js";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  const { name, slug, price, description, category, quantity, shipping } =
    req.fields;
  const { image } = req.files;

  const productValidationError = productValidation(req.fields).error;
  if (productValidationError) {
    return res
      .status(400)
      .json({ message: productValidationError.details[0].message });
  }

  // check the product if exist or not
  const alreadyExist = await Products.findOne({ name });
  if (alreadyExist) {
    return res.status(400).json({ message: "Product already exist" });
  }

  // create product
  const product = new Products({
    ...req.fields,
    slug: slugify(req.fields.name),
  });

  if (image && image.size > 0) {
    product.image.data = fs.readFileSync(image.path);
    product.image.contentType = image.type;
  } else {
    return res.status(400).json({ message: "Image is required" });
  }

  await product.save();
  res.status(200).json({
    message: "Product created successfully",
    product,
  });
};

// get all products
export const getProductsController = async (req, res) => {
  try {
    const products = await Products.find({});
    const count = await Products.countDocuments({})
      .select("-image.data")
      // .limit(10)
      .sort({ createdAt: -1 })
      .populate("category");
    res.status(200).json({
      message: count,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

// get single product
export const getProductController = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await Products.findOne({ slug })
      .select("-image.data")
      .populate("category");
    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};

// update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, price, description, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    // productValidation(req.fields).error ? res.status(400).json({ error: productValidation(req.fields).error.details[0].message }) : null;
    const productValidationError = productValidation(req.fields).error;
    if (productValidationError) {
      return res
        .status(400)
        .json({ message: productValidationError.details[0].message });
    }

    const product = await Products.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(req.fields.name) },
      { new: true }
    );
    if (image && image.size > 0) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();
    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

// delete product
export const deleteProductController = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id).select(
      "-image.data"
    );
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

// get image
export const imageProductController = async (req, res) => {
  try {
    const product = await Products.findById(req.params.pid).select("image");
    res.set("Content-Type", product.image.contentType);
    return res.send(product.image.data);
  } catch (error) {
    console.log(error);
  }
};

// filters
export const getFilteredProductsController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let filter = {};
    if (checked.length > 0) filter.category = checked;
    if (radio.length) filter.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Products.find(filter);
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
  }
};

// product count
export const getProductsCountController = async (req, res) => {
  try {
    const total = await Products.find({}).estimatedDocumentCount().exec();
    res.status(200).json({ total });
  } catch (error) {
    console.log(error);
  }
};

//product list
export const getProductsListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await Products.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .select("-image")
      .sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
  }
};

// search products
export const getProductsBySearchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Products.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-image.data");
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
  }
};

// get related products based on category
export const getSimilarProductsController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Products.find({
      category: cid,
      _id: { $ne: pid },
    })
      .limit(3)
      .select("-image.data")
      .populate("category");
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
  }
};

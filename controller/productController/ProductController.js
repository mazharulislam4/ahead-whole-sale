import {
  CreateProductService,
  updateProductService,
  deleteProductService,
} from "../../service/productService/productS.js";

import Product from "../../model/product/product.schema.js";

// create product
export const cCreateProduct = async (req, res, _next) => {
  try {
    const {
      productName,
      category,
      returnPeriod,
      model,
      description,
      price,
      userRef,
      customerRef,
    } = req.body;
    // payload validation
    if (
      !productName ||
      !category ||
      !returnPeriod ||
      !model ||
      !description ||
      !price ||
      !userRef ||
      !customerRef
    ) {
      return res
        .status(400)
        .json({ data: null, error: { message: "invalid product" } });
    }

    // product validation
    const findproductName = await Product.find({ productName: productName });
    if (findproductName.length >= 1) {
      return res.status(400).json({
        data: null,
        error: { message: `This product already created!` },
      });
    }
    // product validation
    const findproductModel = await Product.find({ model: model });
    if (findproductModel.length >= 1) {
      return res.status(400).json({
        data: null,
        error: { message: `This model already created!` },
      });
    }

    // if payload pass validation create a product in product schema
    const product = await CreateProductService({
      productName,
      category,
      returnPeriod,
      model,
      description,
      price,
      userRef,
      customerRef,
    });
    // if database faild to create user then retrun errror
    if (!product) {
      return res
        .status(500)
        .json({ data: null, error: { message: "server error" } });
    }

    // return  response data
    return res.status(200).json({
      data: product,
      error: null,
      message: "product created successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error" } });
  }
};

// update product

export const cUpdateProduct = async (req, res, _next) => {
  try {
    // product Name find by params
    const productName = req.params.productName;

    const { returnPeriod, description, price } = req.body;
    if (!req.body) {
      return res.status(500).json({
        data: null,
        error: { message: "Data to update can not be empty" },
      });
    }
    // if payload pass validation
    const product = await updateProductService({
      productName,
      returnPeriod,
      description,
      price,
    });

    // if database faild to update product then retrun errror
    if (!product) {
      return res
        .status(500)
        .json({ data: null, error: { message: "server error" } });
    }
    //  return response data
    return res.status(200).json({
      data: product,
      error: null,
      message: "product updated successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

// delete prodcut

export const cDeleteProduct = async (req, res, _next) => {
  try {
    const productName = req.params.productName;

    // productName empty validation
    if (!productName) {
      return res
        .status(400)
        .json({ data: null, error: { message: "company name is empty" } });
    }
    // if payload pass validation
    const product = await deleteProductService({ productName });

    // if database faild to update product then retrun errror
    if (!product) {
      return res.status(400).json({
        data: null,
        error: { message: "product Name is not valid !" },
      });
    }
    //  return response data
    return res.status(200).json({
      data: product,
      error: null,
      message: "product deleted successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

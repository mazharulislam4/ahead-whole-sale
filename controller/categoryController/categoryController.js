import {
  createCategoryService,
  updateCategoryService,
  deletecategoryService,
  findSingleCategoryService,
  findAllCategoryService,
} from "../../service/categoryService/category.js";


// create Category controller
export const cCreateCategory = async (req, res, _next) => {
  try {
    const { categoryName, subCategory, item, productRef } = req.body;
    // payload validation
    if (!categoryName || !subCategory || !item || !productRef) {
      return res
        .status(400)
        .json({ data: null, error: { message: "invalid category" } });
    }

    // if payload pass validation create a category in category schema
    const category = await createCategoryService({
      categoryName,
      subCategory,
      item,
      productRef,
    });
    // if database faild to create category then retrun errror
    if (!category) {
      return res
        .status(500)
        .json({ data: null, error: { message: "server error" } });
    }

    // return  response data
    return res.status(200).json({
      data: category,
      error: null,
      message: "category created successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error" } });
  }
};

// update category controller

export const cUpdateCategory = async (req, res, _next) => {
  try {
    // category Name find by params
    const categoryName = req.params.categoryName;

    const { subCategory } = req.body;
    if (!req.body) {
      return res.status(500).json({
        data: null,
        error: { message: "Data to update can not be empty" },
      });
    }
    // if payload pass validation
    const category = await updateCategoryService({
      categoryName,
      subCategory,
    });

    // if database faild to update category then retrun errror
    if (!category) {
      return res
        .status(500)
        .json({ data: null, error: { message: "server error" } });
    }
    //  return response data
    return res.status(200).json({
      data: category,
      error: null,
      message: "category updated successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

// delete Category controller

export const cDeleteCategory = async (req, res, _next) => {
  try {
    const categoryName = req.params.categoryName;

    // productName empty validation
    if (!categoryName) {
      return res
        .status(400)
        .json({ data: null, error: { message: "Category name is empty" } });
    }
    // if payload pass validation
    const category = await deletecategoryService({ categoryName });

    // if database faild to update product then retrun errror
    if (!category) {
      return res.status(400).json({
        data: null,
        error: { message: "category Name is not valid !" },
      });
    }
    //  return response data
    return res.status(200).json({
      data: category,
      error: null,
      message: "category deleted successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

// find single category  controller
export const findSingleCategoryC = async (req, res, _next) => {
  try {
    const categoryName = req.params.categoryName;

    // category Name empty validation
    if (!categoryName) {
      return res
        .status(400)
        .json({ data: null, error: { message: "Category Name is empty" } });
    }
    // if payload pass validation
    const category = await findSingleCategoryService({ categoryName });
    // if database faild to find single category then retrun errror
    if (!category) {
      return res
        .status(400)
        .json({
          data: null,
          error: { message: "Category Name is not valid !" },
        });
    }
    //  return response data
    return res.status(200).json({
      data: category,
      error: null,
      message: "Categoy find successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

// find all category controller
export const findAllCategoryC = async (req, res, _next) => {
  try {
    const category = await findAllCategoryService();

    // if database faild to find  category then retrun errror
    if (!category) {
      return res.status(400).json({
        data: null,
        error: { message: "There are problem for find category" },
      });
    }
    //  return response data
    return res.status(200).json({
      data: category,
      error: null,
      message: "All category find successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

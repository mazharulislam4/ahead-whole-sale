import Category from "../../model/category/category.schema.js";

// create category
export const createCategoryService = async (payload) => {
  const { categoryName, subCategory, item, productRef } = payload;

  const newCategory = new Category({
    categoryName,
    subCategory,
    item,
    productRef,
  });

  return await newCategory.save();

  // create Category in database
};

// update Category
export const updateCategoryService = async (payload) => {
  const { categoryName, subCategory } = payload;
  const updateCategory = {
    categoryName,
    subCategory,
  };

  return await Category.findOneAndUpdate(
    { categoryName: categoryName },
    updateCategory,
    {
      new: true,
    }
  );
};

// delete category
export const deletecategoryService = async (payload) => {
  const { categoryName } = payload;
  return await Category.findOneAndDelete({ categoryName: categoryName });
};

// find signle category
export const findSingleCategoryService = async (payload) => {
  const { categoryName } = payload;
  return await Category.find({ categoryName: categoryName });
};

// find all category
export const findAllCategoryService = async () => {
  return await Category.find();
};

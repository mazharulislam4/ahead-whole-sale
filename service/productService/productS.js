import Product from "../../model/product/product.schema.js";

// create product function
export const CreateProductService = async (payload) => {
  const {
    productName,
    category,
    returnPeriod,
    model,
    description,
    price,
    userRef,
    customerRef,
  } = payload;

  const newProduct = new Product({
    productName,
    category,
    returnPeriod,
    model,
    description,
    price,
    userRef,
    customerRef,
  });

  // create product in database
  return await newProduct.save();
};

// update Product
export const updateProductService = async (payload) => {
  const { productName, returnPeriod, description, price } = payload;
  const updateProduct = {
    returnPeriod,
    description,
    price,
  };

  return await Product.findOneAndUpdate(
    { productName: productName },
    updateProduct,
    {
      new: true,
    }
  );
};

// delete Product
export const deleteProductService = async (payload) => {
  const { productName } = payload;
  return await Product.findOneAndDelete({ productName: productName });
};

import Order from "../../model/order/order.schema.js";

// create order function
export const CreateOrderService = async (payload) => {
  const {
    productName,
    productId,
    sellDate,
    model,
    quantity,
    price,
    totalPrice,
    productRef,
  } = payload;

  const newOrder = new Order({
    productName,
    productId,
    sellDate,
    model,
    quantity,
    price,
    totalPrice,
    productRef,
  });

  // create Order in database
  return await newOrder.save();
};

// update Order
export const updateOrderService = async (payload) => {
  const { productName, quantity, totalPrice } = payload;

  const updateOrder = {
    productName,
    quantity,
    totalPrice,
  };

  return await Order.findOneAndUpdate(
    { productName: productName },
    updateOrder,
    {
      new: true,
    }
  );
};

// delete Product
export const deleteOrderService = async (payload) => {
  const { productName } = payload;
  return await Order.findOneAndDelete({ productName: productName });
};

// find all product
export const findAllOrderService = async () => {
  return await Order.find();
};

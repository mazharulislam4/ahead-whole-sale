import {
  CreateOrderService,
  updateOrderService,
  deleteOrderService,
  findAllOrderService,
} from "../../service/orderService/order.js";

import Order from "../../model/order/order.schema.js";

// create Order controller
export const cCreateOrder = async (req, res, _next) => {
  try {
    const {
      productName,
      productId,
      sellDate,
      model,
      quantity,
      price,
      totalPrice,
      productRef,
    } = req.body;
    // payload validation
    if (
      !productName ||
      !productId ||
      !sellDate ||
      !model ||
      !quantity ||
      !price ||
      !totalPrice ||
      !productRef
    ) {
      return res
        .status(400)
        .json({ data: null, error: { message: "invalid Order" } });
    }

    // Order validation
    const findOrder = await Order.find({ productName: productName });
    if (findOrder.length >= 1) {
      return res.status(400).json({
        data: null,
        error: {
          message: `This product already order please check your order card and increase quantity!`,
        },
      });
    }
    // order validation
    const findOrderModel = await Order.find({ model: model });
    if (findOrderModel.length >= 1) {
      return res.status(400).json({
        data: null,
        error: {
          message: `This model already order please check your order card and increase quantity!`,
        },
      });
    }

    // if payload pass validation create a order in order schema
    const order = await CreateOrderService({
      productName,
      productId,
      sellDate,
      model,
      quantity,
      price,
      totalPrice,
      productRef,
    });
    // if database faild to create order then retrun errror
    if (!order) {
      return res
        .status(500)
        .json({ data: null, error: { message: "server error" } });
    }

    // return  response data
    return res.status(200).json({
      data: order,
      error: null,
      message: "order created successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error" } });
  }
};

// update order controller

export const cUpdateOrder = async (req, res, _next) => {
  try {
    // product Name find by params
    const productName = req.params.productName;

    const { quantity, totalPrice } = req.body;
    if (!req.body) {
      return res.status(500).json({
        data: null,
        error: { message: "Data to update can not be empty" },
      });
    }
    // if payload pass validation
    const order = await updateOrderService({
      productName,
      quantity,
      totalPrice,
    });

    // if database faild to update order then retrun errror
    if (!order) {
      return res
        .status(500)
        .json({ data: null, error: { message: "server error" } });
    }
    //  return response data
    return res.status(200).json({
      data: order,
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

// delete order controller

export const cDeleteOrder = async (req, res, _next) => {
  try {
    const productName = req.params.productName;

    // productName empty validation
    if (!productName) {
      return res
        .status(400)
        .json({ data: null, error: { message: "company name is empty" } });
    }
    // if payload pass validation
    const order = await deleteOrderService({ productName });

    // if database faild to update product then retrun errror
    if (!order) {
      return res.status(400).json({
        data: null,
        error: { message: "product Name is not valid !" },
      });
    }
    //  return response data
    return res.status(200).json({
      data: order,
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

// find all Order controller
export const findAllOrderC = async (req, res, _next) => {
  try {
    const orders = await findAllOrderService();

    // if database faild to find  product then retrun errror
    if (!orders) {
      return res.status(400).json({
        data: null,
        error: { message: "There are problem for find orders" },
      });
    }
    //  return response data
    return res.status(200).json({
      data: orders,
      error: null,
      message: "All order find successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

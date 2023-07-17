import {
  createCustomerService,
  updateCustomerService,
  deleteCustomerService
} from "../../service/customerService/customerS.js";
import Customer from "../../model/customer/customer.schema.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

// create Customer
export const cCreateCustomer = async (req, res, _next) => {
  try {
    const { companyName, email, address, purchaseOrder, userRef } = req.body;
    //  payload validation
    if (!companyName || !email || !address || !purchaseOrder || !userRef) {
      return res
        .status(400)
        .json({ data: null, error: { message: "invalid cadentials" } });
    }

    // customer validation
    const findCustomer = await Customer.find({ companyName: companyName });
    if (findCustomer.length >= 1) {
      return res.status(400).json({
        data: null,
        error: { message: `company name already account created` },
      });
    }

    // pusrchaseOrder hashing function
    bcrypt.hash(purchaseOrder, saltRounds, async (err, hash) => {
      if (err) {
        return res
          .status(400)
          .json({ data: null, error: { message: "invalid purchaseOrder!" } });
      }
      // if payload pass validation create a customer in customer schema
      const customer = await createCustomerService({
        companyName,
        email,
        address,
        purchaseOrder: hash,
        userRef,
      });
      // if database faild to create customer then retrun errror
      if (!customer) {
        return res
          .status(500)
          .json({ data: null, error: { message: "server error" } });
      }
      // return  response data
      return res.status(200).json({
        data: customer,
        error: null,
        message: "customer created successfully!",
      });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error" } });
  }
};

// update customer

export const cUpdateCustomer = async (req, res, _next) => {
  try {
    // companyName find by params
    const companyName = req.params.companyName;

    const { email, address } = req.body;
    if (!req.body) {
      return res.status(500).json({
        data: null,
        error: { message: "Data to update can not be empty" },
      });
    }
    // if payload pass validation
    const customer = await updateCustomerService({
      companyName,
      email,
      address,
    });

    // if database faild to update customer then retrun errror
    if (!customer) {
      return res
        .status(500)
        .json({ data: null, error: { message: "server error" } });
    }
    //  return response data
    return res.status(200).json({
      data: customer,
      error: null,
      message: "customer created successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

// delete customer

export const cDeleteCustomer = async (req, res, _next) => {
  try {
    const companyName = req.params.companyName;

    // companyName empty validation
    if (!companyName) {
      return res
        .status(400)
        .json({ data: null, error: { message: "company name is empty" } });
    }
    // if payload pass validation
    const customer = await deleteCustomerService({ companyName });
    // if database faild to update customer then retrun errror
    if (!customer) {
      return res
        .status(400)
        .json({ data: null, error: { message: "company Name is not valid !" } });
    }
    //  return response data
    return res
      .status(200)
      .json({ data: customer, error: null, message: "customer deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

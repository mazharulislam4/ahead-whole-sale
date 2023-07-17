import Customer from "../../model/customer/customer.schema.js";

// create Customer
export const createCustomerService = async (payload) => {
  const { companyName, email, address, purchaseOrder, userRef } = payload;

  const newCustomer = new Customer({
    companyName,
    email,
    address,
    purchaseOrder,
    userRef,
  });

  return await newCustomer.save();

  // create Customer in database
};

// update Customer
export const updateCustomerService = async (payload) => {
  const { companyName, email, address } = payload;
  const updateCustomer = {
    email,
    address,
  };

  return await Customer.findOneAndUpdate({ companyName: companyName }, updateCustomer, {
    new: true,
  });
};

// delete customer
export const deleteCustomerService = async (payload) => {
  const { companyName } = payload;
  return await Customer.findOneAndDelete({ companyName: companyName });
};

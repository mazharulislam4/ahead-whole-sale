import { Router as router } from "express";
import {
  cCreateCustomer,
  cUpdateCustomer,
  cDeleteCustomer,
  findAllCustomerC,
  findSingleCustomerC,
} from "../../../controller/customerController/customerController.js";

const customerRouter = router();

// create customer
customerRouter.post("/create_customer", cCreateCustomer);
// update customer
customerRouter.put("/update_customer/:companyName", cUpdateCustomer);

// delete customer
customerRouter.delete("/delete_customer/:companyName", cDeleteCustomer);

// find single customer
customerRouter.get("/find_customer/:companyName", findSingleCustomerC);

// find all customers
customerRouter.get("/find_customers", findAllCustomerC);

export default customerRouter;

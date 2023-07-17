import { Router as router } from "express";
import {cCreateCustomer, cUpdateCustomer, cDeleteCustomer} from "../../../controller/customerController/customerController.js"

const  customerRouter  =  router();

// create customer  
customerRouter.post('/create_customer' , cCreateCustomer)
// update customer
customerRouter.put("/update_customer/:companyName", cUpdateCustomer)

// delete customer 
customerRouter.delete("/delete_customer/:companyName", cDeleteCustomer)

export default  customerRouter;
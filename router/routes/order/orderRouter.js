import { Router as router } from "express";
import {
  cCreateOrder,
  cUpdateOrder,
  cDeleteOrder,
  findAllOrderC,
} from "../../../controller/orderController/OrderController.js";

const OrderRouter = router();

// create order
OrderRouter.post("/create_order", cCreateOrder);

// update order
OrderRouter.put("/update_order/:productName", cUpdateOrder);

// delete order
OrderRouter.delete("/delete_order/:productName", cDeleteOrder);

// find all order
OrderRouter.get("/find_order", findAllOrderC);

export default OrderRouter;

import { Router as router } from "express";
import {
  cCreateCategory,
  cUpdateCategory,
  cDeleteCategory,
  findSingleCategoryC,
  findAllCategoryC,
} from "../../../controller/categoryController/categoryController.js";

const CategoryRouter = router();

// create category router
CategoryRouter.post("/create_category", cCreateCategory);
// update category router
CategoryRouter.put("/update_category/:productName",  cUpdateCategory);

// delete category router
CategoryRouter.delete("/delete_category/:productName", cDeleteCategory);

// find single category router
CategoryRouter.get("/find_category/:productName", findSingleCategoryC);

// find all category router
CategoryRouter.get("/find_categorys", findAllCategoryC);

export default CategoryRouter;

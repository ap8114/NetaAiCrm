import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import purchaseOrderReducer from "../slices/purchaseOrderSlice";
import clientReducer from "../slices/clientSlice"; // ✅ added
import vendorReducer from "../slices/vendorSlice"; // ✅ added
import catalogReducer from "../slices/productSlice"; // ✅ added
import projectReducer from "../slices/projectSlice"; // ✅ added
import taskReducer from "../slices/taskSlice"; // ✅ added
import departmentReducer from "../slices/departmentSlice"; // ✅ added
import contractJobReducer from "../slices/contractJobSlice"; // ✅ added
import servicesReducer from "../slices/serviecSlice"; // ✅ added
import productsReducer from "../slices/productSlice"; // ✅ added

const rootReducer = combineReducers({
    user: userReducer,
    purchaseOrder: purchaseOrderReducer,
    client: clientReducer,
    vendor: vendorReducer,
    catalog: catalogReducer,
    project: projectReducer,
    task: taskReducer,
    department: departmentReducer,
    contractJob: contractJobReducer,
    services: servicesReducer,
    products: productsReducer,
});

export default rootReducer;

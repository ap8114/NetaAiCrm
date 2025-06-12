import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import purchaseOrderReducer from "../slices/purchaseOrderSlice";
import clientReducer from "../slices/clientSlice"; // ✅ added
import vendorReducer from "../slices/vendorSlice"; // ✅ added
import catalogReducer from "../slices/catalogSlice"; // ✅ added
import projectReducer from "../slices/projectSlice"; // ✅ added

const rootReducer = combineReducers({
    user: userReducer,
    purchaseOrder: purchaseOrderReducer,
    client: clientReducer,
    vendor: vendorReducer,
    catalog: catalogReducer,
    project: projectReducer,
});

export default rootReducer;

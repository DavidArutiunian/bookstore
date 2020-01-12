import { combineReducers } from "redux";
import bookListReducer from "./containers/book/list/reducer";
import bookProfileReducer from "containers/book/profile/reducer";
import publishingOfficeListReducer from "containers/publishing_office/list/reducer";
import publishingOfficeProfileReducer from "containers/publishing_office/profile/reducer";
import authSlice from "containers/auth/slice";
import authorListSlice from "containers/author/list/slice";
import authorProfileSlice from "containers/author/profile/slice";
import customerListSlice from "containers/customer/list/slice";
import customerProfileSlice from "containers/customer/profile/slice";
import employeeListSlice from "containers/employee/list/slice";
import employeeProfileSlice from "containers/employee/profile/slice";
import orderListSlice from "containers/order/list/slice";
import orderProfileSlice from "containers/order/profile/slice";
import dashboardSlice from "containers/dashboard/slice";

export default function createReducer() {
    return combineReducers({
        // auth
        auth: authSlice.reducer,
        // book
        bookList: bookListReducer,
        bookProfile: bookProfileReducer,
        // publishing office
        publishingOfficeList: publishingOfficeListReducer,
        publishingOfficeProfile: publishingOfficeProfileReducer,
        // author
        authorList: authorListSlice.reducer,
        authorProfile: authorProfileSlice.reducer,
        // customer
        customerList: customerListSlice.reducer,
        customerProfile: customerProfileSlice.reducer,
        // employee
        employeeList: employeeListSlice.reducer,
        employeeProfile: employeeProfileSlice.reducer,
        // order
        orderList: orderListSlice.reducer,
        orderProfile: orderProfileSlice.reducer,
        // dashboard
        dashboard: dashboardSlice.reducer,
    });
}

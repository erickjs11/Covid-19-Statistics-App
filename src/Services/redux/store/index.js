import { configureStore, ConfigureStore } from "@reduxjs/toolkit";
import statesReducer from "../reducers/states";

export default configureStore({
    reducer: {
        state: statesReducer
    }
})
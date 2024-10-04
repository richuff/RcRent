import { configureStore } from "@reduxjs/toolkit";
import CityList from "./City/index";

const store = configureStore({
    reducer:{
        CityList:CityList
    }
})

export default store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CityList = createSlice({
    name:"CityList",
    initialState:{
        CList : []
    },
    reducers:{
        setCitysList(state,action){
            state.CList = action.payload
        },
    }
})

const {setCitysList} = CityList.actions
const reducer = CityList.reducer

const fetchCityList = ()=>{
    return async (dispatch)=>{
        const res = await axios.get(`http://localhost:8080/area/city?level=1`)
        dispatch(setCitysList(res.data.body))
    }
}

export {fetchCityList}
export default reducer
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home'
import CityList from '../pages/CityList'


const router = createBrowserRouter([
    {
        index:true,
        element:<Home/>
    },
    {
        path:"/cityList",
        element:<CityList/>
    },
])

export default router
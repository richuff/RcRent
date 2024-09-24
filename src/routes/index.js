import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home'
import CityList from '../pages/CityList'
import News from "../pages/News";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
        children:[
            {
                path:"/news",
                element:<News></News>,
                title:"新闻页"
            }
        ]
    },
    {
        path:"/cityList",
        element:<CityList/>
    },
])

export default router
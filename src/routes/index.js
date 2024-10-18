import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home'
import CityList from '../pages/CityList'
import News from "../pages/News";
import Profile from "../pages/Profile";
import HouseList from "../pages/Houselist";
import HomePage from "../pages/Index";
import Maps from "../pages/Maps";
const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
        children:[
            {
                path:"/news",
                element:<News></News>,
                title:"资讯"
            },
            {
                path:"/houselist",
                element:<HouseList></HouseList>,
                title:"找房"
            },
            {
                path:"/profile",
                element:<Profile></Profile>,
                title:"我的"
            },
            {
                index:true,
                element:<HomePage></HomePage>,
                title:"主页面"
            },
        ]
    },
    {
        path:"/cityList",
        element:<CityList/>
    },
    {
        path:"/map",
        element:<Maps/>
    }
])

export default router
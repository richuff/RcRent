import { NavBar } from "antd-mobile"
import {LeftOutline} from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom"

export default function TopTitle({title}){
      const navigate = useNavigate()
    return (
      <NavBar backIcon={<LeftOutline style={{ fontSize: "20" }} onClick={() => navigate(-1)} />}>
        {title}
      </NavBar>
    )
}
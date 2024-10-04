import { NavBar,Space } from "antd-mobile"
import {SearchOutline,LeftOutline} from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"

export default function MapContainer() {
    useEffect(()=>{
      const getCityList = async ()=>{
        const res = await axios.get(`http://localhost:8080/area/city?level=1`)
        console.log(res.data.body)
      }
      getCityList()
    },[])
    const navigate = useNavigate()
    const right = (
      <div style={{ fontSize: 20 }}>
        <Space style={{ '--gap': '16px' }}>
          <SearchOutline style={{marginRight:"30px"}} />
        </Space>
      </div>
    )
    return (
      <div>
        <NavBar right={right} backIcon={<LeftOutline style={{fontSize:"20"}} onClick={()=>navigate(-1)}/>}>
           城市列表
        </NavBar>
      </div>
    )

}

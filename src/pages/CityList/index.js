import { NavBar,Space } from "antd-mobile"
import {SearchOutline,LeftOutline} from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchCityList } from "../../stores/City"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { getCurrentCity } from "../../utils"

const formatData = (list)=>{
  const cityList = []
  let cityIndex = []

  list.forEach(ele => {
    const first = ele.short.substr(0,1)
    if (cityList[first]){
      cityList[first].push(ele)
    }else{
      cityList[first] = [ele]
      cityIndex.push(first)
    }
  });
  cityIndex = cityIndex.sort()
  return {
    cityIndex,
    cityList
  }
}

export default function CityList() {
  const [hotList,setHotList] = useState([])
  const [city,setCity] = useState("")
  const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(fetchCityList())
      const fetchHotCity = async()=>{
        const res = await axios.get(`http://localhost:8080/area/hot`)
        setHotList(res.data.body)
      }
      fetchHotCity()
      getCurrentCity().then((value)=>{
        setCity(value)
      })
    },[dispatch,setCity])

    const {CList} = useSelector(state=>state.CityList)
    const {cityIndex,cityList} = formatData(CList)
    cityIndex.unshift('hot')
    cityIndex.unshift('#')
    cityList['hot'] = hotList
    cityIndex['#'] = [city]
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
        {/* 可视区域渲染  react-virtualized*/}
        <div>当前位置{city}</div>
      </div>
    )

}

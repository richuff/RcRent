import { NavBar,Space } from "antd-mobile"
import {SearchOutline,LeftOutline} from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { fetchCityList } from "../../stores/City"
import { useDispatch, useSelector } from "react-redux"

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
  const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(fetchCityList())
    },[dispatch])

    const {CList} = useSelector(state=>state.CityList)
    formatData(CList)

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

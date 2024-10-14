import { NavBar, Space, Toast } from "antd-mobile"
import { SearchOutline, LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { fetchCityList } from "../../stores/City"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { getCurrentCity } from "../../utils"
import { AutoSizer, List } from "react-virtualized"
import './index.scss'

const formatData = (list) => {
  

  const cityList = []
  let cityIndex = []

  list.forEach(ele => {
    const first = ele.short.substr(0, 1)
    if (cityList[first]) {
      cityList[first].push(ele)
    } else {
      cityList[first] = [ele]
      cityIndex.push(first)
    }
  })
  cityIndex = cityIndex.sort()
  return {
    cityIndex,
    cityList
  }
}

export default function CityLists() {

  const ListViews = useRef(null)
  const [hotList, setHotList] = useState([])
  const [city, setCity] = useState("")
  const dispatch = useDispatch()
  const { CList } = useSelector(state => state.CityList)
  const { cityIndex, cityList } = formatData(CList)
  useEffect(() => {
    dispatch(fetchCityList())
    const fetchHotCity = async () => {
      const res = await axios.get(`http://localhost:8080/area/hot`)
      setHotList(res.data.body)
    }
    fetchHotCity()
    getCurrentCity().then((value) => {
      setCity(value)
    })
  }, [dispatch, setCity])
  cityIndex.unshift('hot')
  cityIndex.unshift('#')
  cityList['hot'] = hotList
  cityList['#'] = [{"label":city}]
  const navigate = useNavigate()
  const right = (
    <div style={{ fontSize: 20 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline style={{ marginRight: "30px" }} />
      </Space>
    </div>
  )
  
  const handleIndex = (letter) => {
    switch (letter) {
      case "#":
        return "当前定位"
      case "hot":
        return "热门城市"
      default:
        return letter.toUpperCase()
    }
  }
  const getrowheight = ({index})=>{
    return 50 + cityList[cityIndex[index]].length * 40
  }
  const [NIndex,setnIndex] = useState("#")
  const [flag,setFlag] =useState(true)
  const render = ({startIndex})=>{
    if (flag && NIndex !== cityIndex[startIndex]){
      setnIndex(cityIndex[startIndex])
    }
    ListViews.current.measureAllRows()
  }
  const HaveList = ["北京","上海","深圳","广州"]
  const changeCitys = ({label,value})=>{
      if (HaveList.indexOf(label) > -1){
        localStorage.setItem("rczf_citys",JSON.stringify({label,value}))
        navigate(-1)
      }else{
        Toast.show({
          icon: 'fail',
          content: '该区域没有房源',
        })
      }
  }
  
  return (
    <div className="citylist">
      <NavBar style={{ marginTop: "-45px" }} right={right} backIcon={<LeftOutline style={{ fontSize: "20" }} onClick={() => navigate(-1)} />}>
        城市列表
      </NavBar>
      {/* 可视区域渲染  react-virtualized*/}
      <ul className="cityIndex" >
        <li className="cityItem">
          {cityIndex.map((item,index)=><span className={item === NIndex? "cityActived cityActive" : "cityActived"} onClick={()=>{
            setFlag(false)
            setnIndex(item)
            ListViews.current.scrollToRow(index)
            setTimeout(()=>{
              setFlag(true)
            },500)
          }}>{item === "hot" ? "热" : item}</span>)}
        </li>
      </ul>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={ListViews}
            // 窗口的高度,必填
            height={height}
            // 窗口的宽度,必填
            width={width}
            // 总共个数
            rowCount={cityIndex.length}
            // cell高度
            rowHeight={getrowheight}
            // render
            onRowsRendered={render}
            scrollToAlignment="start"
            style={{ outline: "none", }}
            rowRenderer={({ key, index, isScrolling, style }) => {
              const letter = cityIndex[index]
              return (<div key={key} style={style} className="cityList">
                <div className="index" key={key}>{handleIndex(letter)}</div>
                <div className="city" >{cityList[letter] == null ? <div>loading</div> : 
                  cityList[letter].map(item => <div className="name" key={item.value} onClick={()=>changeCitys(item)}>
                    {item.label}
                  </div>
                  )
                }</div>
              </div>)
            }}>
          </List>
        )}
      </AutoSizer>

    </div>
  )

}

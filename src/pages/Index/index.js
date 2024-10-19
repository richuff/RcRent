import { Swiper, Skeleton, SearchBar,TabBar, Grid } from "antd-mobile"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { ShopbagOutline, TeamOutline, CompassOutline, LocationOutline, LocationFill, DownFill } from 'antd-mobile-icons'
import './index.scss'
import NewsList from "../../components/IndexPage/newsList"

export default function HomePage() {
  const [imageList, setImageList] = useState([])
  const [group, setGroup] = useState({})
  const [location,setLocation] = useState("")
  useEffect(() => {
    const getSwipers = async () => {
      const res = await axios.get("http://localhost:8080/home/swiper")
      setImageList(res.data.body)
    }
    getSwipers()
    const getLocation = async () => {
      const locate = await axios.get("https://restapi.amap.com/v3/ip",{
        params:{
          key:"fb6fd65b71f26f6774c08e0ad7574ecc"
        }
      })
      setLocation(locate.data.city)
    }
    getLocation()
  }, [setImageList,setLocation])
  useEffect(() => {
    const getRentGroup = async () => {
      const res = await axios.get("http://localhost:8080/home/groups", {
        params: {
          area: 'AREA%7C88cff55c-aaa4-e2e0'
        }
      }
      )
      setGroup({
        groups: res.data.body
      })
    }
    getRentGroup()
  }, [setGroup])
  
  const tabs = [
    {
      key: 'totalrent',
      title: '整租',
      icon: <ShopbagOutline />,
    },
    {
      key: 'withrent',
      title: '合租',
      icon: <TeamOutline />,
    },
    {
      key: 'findrent',
      title: '地图找房',
      icon: <CompassOutline />,
    },
    {
      key: 'torent',
      title: '去出租',
      icon: <LocationOutline />,
    },
  ]
  const navigate = useNavigate()
  const changeTo = (key)=>{
    if (key === "findrent"){
      navigate("/map")
    }
  }
  const items = imageList.map(image => (
    <Swiper.Item key={image.id} style={{ backgroundColor: "white" }}>
      <img
        src={`http://localhost:8080${image.imgSrc}`}
        style={{ height: "200px", width: "100%" }}
        onClick={() => {
          navigate("/")
        }}
        alt={`轮播图${image.id}`}
      />
    </Swiper.Item>
  ))
  return (
    <div className="navigatebar">
      <div className="topSearch">
        <div className="SelectSearch" onClick={() => navigate('/cityList')}>{location}
          <DownFill style={{marginLeft:"4px"}}/>
        </div>
        <SearchBar placeholder='请输入内容' className="searchButton" />
        <LocationFill className="searchIcon" />
      </div>
      <Swiper autoplay loop={true}>{items}</Swiper>
      <TabBar style={{ marginTop: "10px" }} onChange={(key)=>changeTo(key)}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>
      <div className="group">
        <h3 className="text">租房小组</h3>
        <span className="more">更多</span>
      </div>
      <Grid columns={2} gap={8} className="detail">
        {group.groups == null ? <div>
          <Skeleton.Title />
          <Skeleton.Paragraph />
        </div> :
          group.groups.map(item => (<div className="groupdetail" key={item.id}>
            <div className="groupdesc">
              <div className="title">{item.title}</div>
              <div className="desc">{item.desc}</div>
            </div>
            <img className="groupimg" src={`http://localhost:8080${item.imgSrc}`} alt={item.title} />
          </div>)
          )}
      </Grid>
      <NewsList></NewsList>
    </div>
  )
}
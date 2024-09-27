import { Swiper } from "antd-mobile"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { TabBar,Grid } from "antd-mobile"
import {ShopbagOutline,TeamOutline,CompassOutline,LocationOutline} from 'antd-mobile-icons'
import './index.scss'

export default function HomePage(){
    const [imageList,setImageList] = useState([])
    const [group,setGroup] = useState({})
    useEffect(()=>{
        const getRentGroup = async ()=>{
          const res = await axios.get("http://localhost:8080/home/groups",{
            params: {
              area:'AREA%7C88cff55c-aaa4-e2e0'
            }
            }
          )
          setGroup({
            groups:res.data.body
          })
        }
        const getSwipers = async ()=>{
            const res = await axios.get("http://localhost:8080/home/swiper")
            setImageList(res.data.body)
        }
        getSwipers()

        getRentGroup()
    },[setImageList,setGroup])

    const tabs = [
      {
        key: 'totalrent',
        title: '整租',
        icon: <ShopbagOutline />,
      },
      {
        key: 'withrent',
        title: '合租',
        icon: <TeamOutline/>
      },
      {
        key: 'findrent',
        title: '地图找房',
        icon: <CompassOutline/>
      },
      {
        key: 'torent',
        title: '去出租',
        icon: <LocationOutline />,
      },
    ]
    const navigate = useNavigate()
    const items = imageList.map(image => (
        <Swiper.Item key={image.id}>
          <img
            src={`http://localhost:8080${image.imgSrc}`}
            style={{height:"200px",width:"100%"}}
            onClick={() => {
              navigate("/")
            }}
            alt={`轮播图${image.id}`}
          />
        </Swiper.Item>
    ))
    return (
        <div className="navigatebar">
          <Swiper autoplay loop={true}>{items}</Swiper>
          <TabBar style={{marginTop:"10px"}}>
            {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
          <div className="group">
            <h3 className="text">租房小组</h3>
            <span className="more">{"<"}</span>
          </div>
          <Grid columns={2} gap={8}>
          {group.groups.map(item=>(<div className="groupdetail">
            <div className="groupdesc">{item.desc}</div>
            <img className="groupimg" src={`http://localhost:8080${item.imgSrc}`} alt={item.title}/>
          </div>)
            )}
        </Grid>
        </div>
    )
}
import { Swiper } from "antd-mobile"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

export default function HomePage(){
    const [imageList,setImageList] = useState([])
    useEffect(()=>{
        const getSwipers = async ()=>{
            const res = await axios.get("http://localhost:8080/home/swiper")
            setImageList(res.data.body)
        }
        getSwipers()
    },[setImageList])

    const navigate = useNavigate()
    const items = imageList.map(image => (
        <Swiper.Item key={image.id}>
          <img
            src={`https://localhost:8080${image.imgSrc}`}
            style={{height:"200px"}}
            onClick={() => {
              navigate("/")
            }}
            alt={`轮播图${image.id}`}
          />
        </Swiper.Item>
      ))
    return (
        <div>
            <Swiper autoplay loop={true}>{items}</Swiper>
        </div>
    )
}
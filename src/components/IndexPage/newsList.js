import axios from "axios"
import { useEffect, useState } from "react"
import './index.scss'

export default function NewsList() {
    const [newList, setNewsList] = useState([])
    useEffect(() => {
        const getnewsList = async () => {
            const res = await axios.get("http://localhost:8080/home/news", {
                params: {
                    area: "AREA%7C88cff55c-aaa4-e2e0"
                }
            })
            setNewsList(res.data.body)
        }
        getnewsList()
    }, [setNewsList])
    return (<div className="news">
        <h3 style={{ fontSize: "13px", marginLeft: "10px", marginTop: "6px" }}>最新资讯</h3>
        {newList.map(item => <div className="new" width="100%" key={item.id}>
            <img className="img" src={`http://localhost:8080${item.imgSrc}`} alt={item.title}/>
            <div className="details">
                <h4 className="newtitle">{item.title}</h4>
                <div className="message">
                    <div className="author">{item.from}</div>
                    <div className="time">{item.date}</div>
                </div>
            </div>
        </div>)}
    </div>)
}
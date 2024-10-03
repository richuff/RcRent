import { Outlet ,useNavigate} from "react-router-dom"
import { Badge, TabBar } from "antd-mobile"
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    EnvironmentOutline,
    UserOutline,
    
} from 'antd-mobile-icons'

export default function CityList() {
    const navigate = useNavigate()
    const tabs = [
        {
            key: '/',
            title: '首页',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            key: '/houselist',
            title: '找房',
            icon: <EnvironmentOutline />,
            badge: '5',
        },
        {
            key: '/news',
            title: '资讯',
            icon: (active) =>
                active ? <MessageFill /> : <MessageOutline />,
            badge: '99+',
        },
        {
            key: '/profile',
            title: '我的',
            icon: <UserOutline />,
        },
    ]
    const routeLink = (value)=>{
        navigate(value)
    }
    return (
        <div>
            <Outlet></Outlet>
            <TabBar onChange={value=>routeLink(value)} style={{width:"100%",position:"fixed",bottom:"0",borderTop:"solid 1px blue",borderBottom:"solid 1px blue",backgroundColor:"white"}}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge} />
                ))}
            </TabBar>
        </div>
    )
}
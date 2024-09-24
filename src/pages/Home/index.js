import { Outlet } from "react-router-dom"
import { Badge, TabBar } from "antd-mobile"
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
export default function CityList() {
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            key: 'todo',
            title: '待办',
            icon: <UnorderedListOutline />,
            badge: '5',
        },
        {
            key: 'message',
            title: '消息',
            icon: (active) =>
                active ? <MessageFill /> : <MessageOutline />,
            badge: '99+',
        },
        {
            key: 'personalCenter',
            title: '我的',
            icon: <UserOutline />,
        },
    ]

    return (
        <div>
            <span>首页</span>
            <Outlet></Outlet>
            <TabBar style={{width:"390px",position: "absolute",bottom:"0",borderTop:"solid 1px blue",borderBottom:"solid 1px blue"}}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge} 
                    
                    />
                ))}
            </TabBar>
        </div>
    )
}
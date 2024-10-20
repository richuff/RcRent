import TopTitle from "../../components/TopTitle"
import AMapLoader from '@amap/amap-jsapi-loader';
import { useEffect } from "react";
import styles from "./index.module.css";

export default function Maps() {
    let map = null
    //使用地址解析器
    useEffect(() => {
        window._AMapSecurityConfig = {
            securityJsCode: "018633beed0807050daf7019df83bb3b",
        };
        AMapLoader.load({
            key: "383ba2d81292453f0e88e20efa7c7849", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ["AMap.Scale","AMap.ToolBar"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        }).then((AMap) => {
                map = new AMap.Map("container", {
                    // 设置地图容器id
                    viewMode: "3D", // 是否为3D地图模式
                    zoom: 11, // 初始化地图级别
                    center: [121.42, 31.15], // 初始化地图中心点位置
                })

                const markerContent = `
                <div class="${styles.marker}">
                    <div class="${styles.city}">浦东<div>
                    <div class="${styles.number}">100套</div>
                </div>`
                const position = new AMap.LngLat(121.42, 31.15) //Marker 经纬度
                const marker = new AMap.Marker({
                  position: position,
                  content: markerContent, //将 html 传给 content
                  offset: new AMap.Pixel(-13, -30), //以 icon 的 [center bottom] 为原点
                })
                
                AMap.plugin('AMap.ToolBar',function(){ 
                    var toolbar = new AMap.ToolBar({
                        position: {
                          top: '550px',
                          right: '20px'
                        }
                    }); //缩放工具条实例化
                    toolbar.show(); 
                    map.addControl(toolbar); //添加控件
                    map.add(marker);
                });
                
            })
            .catch((e) => {
                console.log(e);
            });

        return () => {
            map?.destroy();
        };
    }, []);
    
    return (
        <div>
            <TopTitle title="地图找房"/>
            <div
                id="container"
                style={{ height: "800px" }}
            ></div>
        </div>
    )
}
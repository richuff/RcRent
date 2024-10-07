import axios from "axios"

export const getCurrentCity = () =>{
    const localCity = JSON.parse(localStorage.getItem('rczf_city'))

    if (!localCity){
        //如果没有定位城市
        return new Promise((resolve,reject)=>{
            try {
                const getLocation = async () => {
                    const locate = await axios.get("https://restapi.amap.com/v3/ip",{
                      params:{
                        key:"fb6fd65b71f26f6774c08e0ad7574ecc"
                      }
                    })
                    localStorage.setItem('rczf_city',JSON.stringify(locate.data.city))
                    resolve(locate.data.city)
                }
                getLocation()
            } catch (error) {
                reject(error)
            }
        })
    }

    return Promise.resolve(localCity)
}
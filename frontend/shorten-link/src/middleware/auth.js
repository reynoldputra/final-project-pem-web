import axios from "axios";
import cookies from "vue-cookies";

export default async function checkAuth(){
    if(cookies.isKey('token')){
        const token = cookies.get('token')
        const res = await axios.get(`http://localhost:`,{
           token: token
        }).catch(err)
        if(res.status == 200 || res.status == 201) return true        
    } else return false
}
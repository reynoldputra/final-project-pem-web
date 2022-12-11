import axios from "axios";
import cookies from "vue-cookies";

export default async function checkAuth() {
  if (cookies.isKey("token")) {
    const token =  cookies.get("token");
    const res = await axios
      .post(`http://localhost:3001/api/auth/verifytoken`, {
        token: token,
      })
      .catch((Err) => {
        console.log(Err);
      });
    cookies.set("username", res.data.data.username);
    return true;
  } else return false;
}

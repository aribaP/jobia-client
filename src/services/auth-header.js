import axios from "axios";

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
      console.log("Hi",user.accessToken);
  
    if (user && user.accessToken) {
        // axios.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;
      return { Authorization: `Bearer ${user.accessToken}` };
    //   return { "x-auth-token": user.accessToken };
    } else {
      return {};
    }
  }
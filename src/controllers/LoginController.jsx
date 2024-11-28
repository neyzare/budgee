import axios from "axios"
import Cookies from "js-cookie";

const LoginController = async (email, password) => {
  
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login",{
      email,
      password,
    })

    if (response.status === 200) {
      const token = response.data.token;
      Cookies.set("auth_token", token);
      
      console.log('cookie create')
      window.location.href = '/'
    } 

    return response.data

  } catch (e) {
    console.error("Erreur lors du login:", e)
  }
}

export default LoginController;
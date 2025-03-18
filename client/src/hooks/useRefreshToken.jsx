import useAuth from "./useAuth"
import axios from "axios"

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('http://localhost:3000/refresh', {
            withCredentials: true //allows us to send cookies with request
            // request will send cookie to res cookie
        })
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response);
            console.log(response.data.accessToken);
            console.log("we are setting auth")
            return{
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken}
        })
        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;
import useAuth from "./useAuth"
import axios from "axios"

const useRefreshToken = () => {
    const { setAuth } = useAuth(); // This allows updating auth state globally

    const refresh = async () => {
        try {
            // Sending request to the backend to refresh the token
            const response = await axios.get('http://localhost:3000/refresh', {
                withCredentials: true, // Sends cookies with the request
            });

            // Update the global auth state with the new tokens and user data
            setAuth(prev => ({
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                username: response.data.username,
                email: response.data.email,
                firstname: response.data.firstname,
            }));

            // Return the new access token
            return accessToken;
        } catch (err) {
            console.error('Error refreshing token:', err);
            throw new Error('Token refresh failed');
        }
    };

    return refresh;
};


export default useRefreshToken;
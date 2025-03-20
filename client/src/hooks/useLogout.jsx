import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('https://fundforward-capstone-team-3.onrender.com/logout', {
                withCredentials: true
            });
        }catch(err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
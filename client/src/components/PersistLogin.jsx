import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken()
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch(err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return() => isMounted = false
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`at: ${JSON.stringify(auth?.accessToken)}`)
        console.log(auth);
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet/> // child component and routes
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet/>
            }
        </>
    )
}

export default PersistLogin
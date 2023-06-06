import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        let userProfile = localStorage.getItem("userProfile");
        if (userProfile) {
            return JSON.parse(userProfile);
        }
        return null;
    });
    const navigate = useNavigate();
    const login = async (loginRequest) => {
        await axios.post("http://localhost:8080/api/login", loginRequest, {
            // withCredentials: true,
        }).then(response => {
            if (response.status === 200) {
                localStorage.setItem("userProfile", JSON.stringify(response.data));
                setUser(response.data);
                navigate("/");
            }
        }).catch(error => console.log(error));
        // let apiResponse = await axios.get("http://localhost:4000/user-profile", {
        //     withCredentials: true,
        // });

    };
    return (
        <>
            <AuthContext.Provider value={{ user, login }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthContext;
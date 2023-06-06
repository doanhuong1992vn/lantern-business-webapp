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
        await axios.post("http://localhost:8080/api/login", loginRequest).then(response => {
            if (response.status === 200) {
                console.log(response.data.name + " đã đăng nhập thành công!")
                localStorage.setItem("userProfile", JSON.stringify(response.data));
                setUser(response.data);
                navigate("/");
            }
        }).catch(error => console.log("Axios lỗi đăng nhập: " + error));
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
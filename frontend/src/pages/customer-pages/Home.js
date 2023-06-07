import {Card} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import AuthContext from "~/security/AuthContext";
import {MDBBtn} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";


const Home = () => {
    const {user} = useContext(AuthContext);
    const [current, setCurrent] = useState(null);
    const [isLogged, setIsLogged] = useState(() => {
        return user ? true : false;
    });

    const navigate = useNavigate();

    useEffect(() => {
        isLogged ? setCurrent(user) : setCurrent(null);
    }, []);

    const handleClickLogout = () => {
        localStorage.removeItem("userProfile");
        console.log(localStorage.getItem("userProfile"))
        setCurrent(null);
        setIsLogged(false);
    }

    function handleClickLogin() {
        // if (!user) {
        //     console.log("user null"+user)
        //     navigate("/login")
        // } else {
        //     console.log(user)
        // }
        setCurrent(null);
        setIsLogged(false);
        navigate("/login")
    }

    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{minHeight: "500px", minWidth: "600px"}}
            >
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <p className="text-danger h1">Welcome Home Page!</p>
                        </Card.Text>
                        {isLogged
                            ? <div className="text-center">
                                <Card.Text>
                                    Chúc mừng {current?.name} đã đăng nhập thành công!
                                </Card.Text>
                                <MDBBtn type="button" className="gradient-custom-2 ml-3"
                                        onClick={handleClickLogout}>
                                    Logout
                                </MDBBtn>
                            </div>
                            : <Card.Text className="text-center">
                                <MDBBtn type="button" className="gradient-custom-2 ml-3"
                                        onClick={handleClickLogin}>
                                    Login
                                </MDBBtn>
                            </Card.Text>
                        }
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};
export default Home;
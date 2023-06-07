import {Card} from "react-bootstrap";
import {useContext, useState} from "react";
import AuthContext from "~/security/AuthContext";
import {MDBBtn} from "mdb-react-ui-kit";

const Home = () => {
    const {user} = useContext(AuthContext);
    const [current, setCurrent] = useState(() => user);

    const handleClickLogout = () => {
        localStorage.removeItem("userProfile");
        setCurrent(null);
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
                        {current &&
                            <div className="text-center">
                                <Card.Text>
                                    Chúc mừng {current.name} đã đăng nhập thành công!
                                </Card.Text>
                                <MDBBtn type="button" className="gradient-custom-2 ml-3"
                                onClick={handleClickLogout}>
                                    Logout
                                </MDBBtn>
                            </div>
                        }
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};
export default Home;
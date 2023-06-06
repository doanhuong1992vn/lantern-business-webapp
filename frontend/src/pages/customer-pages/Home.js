import {Card} from "react-bootstrap";
import {useContext} from "react";
import AuthContext from "~/security/AuthContext";

const Home = () => {
    const {user} = useContext(AuthContext);
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
                        {user &&
                            <Card.Text>
                                Chúc mừng {user.name} đã đăng nhập thành công!
                            </Card.Text>
                        }
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};
export default Home;
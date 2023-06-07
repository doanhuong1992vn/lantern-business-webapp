import Container from 'react-bootstrap/Container';
import Sidebar from './Sidebar';
import './index.css';
import {useContext, useEffect} from "react";
import AuthContext from "~/security/AuthContext";
import {useNavigate} from "react-router-dom";


function AdminLayout({children}) {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.roles?.some(item => item.name.includes("ADMIN"))) {
            navigate("/error-403");
        }
    }, [user]);
    return (
        <div>
            <Sidebar/>
            <Container>
                <div className="content">{children}</div>
            </Container>
        </div>
    );
}

export default AdminLayout;

// import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
//
// import Header from './Header';
import Sidebar from './Sidebar';
import './index.css';
import {useContext, useEffect, useState} from "react";
import AuthContext from "~/security/AuthContext";
import {Navigate, useNavigate} from "react-router-dom";


// const cx = classNames.bind(styles)

function AdminLayout({children}) {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    // const [isAdmin, setIsAmin] = useState(false);
    useEffect(() => {
        // const isAdmin = user.roles.some(item => item.name.includes("ADMIN"))
        if (!user || !user.roles.some(item => item.name.includes("ADMIN"))) {
            navigate("/error-403")
        }
    }, []);
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

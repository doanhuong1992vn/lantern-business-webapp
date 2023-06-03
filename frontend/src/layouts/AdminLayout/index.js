// import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
//
// import Header from './Header';
import Sidebar from './Sidebar';
import './index.css';


// const cx = classNames.bind(styles)

function AdminLayout({ children }) {
    return (
        <div>
            {/*<Header />*/}
            <Sidebar />
            <Container>
                    <div className="content">{children}</div>
            </Container>
            {/*<Sidebar />*/}
            {/*<Container className=''>{children}</Container>*/}
        </div>
    );
}

export default AdminLayout;

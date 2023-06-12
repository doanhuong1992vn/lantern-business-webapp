import React, { useEffect, useRef } from 'react';
// import { Content, Footer, Header, Sidebar } from '~/components/Layout';
import {
    MdImportantDevices,
    // MdCardGiftcard,
    MdLoyalty,
} from 'react-icons/md';
import Header from "~/layouts/AdminLayout/Header";
import Content from "~/layouts/AdminLayout/Content";
import Sidebar from "~/layouts/AdminLayout/Sidebar";
// import NotificationSystem from 'react-notification-system';
// import { NOTIFICATION_SYSTEM_STYLE } from '~/utils/constants';

const MainLayout = ({ breakpoint, children }) => {
    // const notificationSystemRef = useRef(null);

    useEffect(() => {
        checkBreakpoint(breakpoint);
    }, [breakpoint]);

    const handleContentClick = () => {
        if (
            isSidebarOpen() &&
            (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md')
        ) {
            openSidebar('close');
        }
    };

    const checkBreakpoint = (breakpoint) => {
        switch (breakpoint) {
            case 'xs':
            case 'sm':
            case 'md':
                return openSidebar('close');

            case 'lg':
            case 'xl':
            default:
                return openSidebar('open');
        }
    };

    const openSidebar = (openOrClose) => {
        const sidebar = document.querySelector('.cr-sidebar');
        if (openOrClose === 'open') {
            sidebar.classList.add('cr-sidebar--open');
        } else {
            sidebar.classList.remove('cr-sidebar--open');
        }
    };

    const isSidebarOpen = () => {
        const sidebar = document.querySelector('.cr-sidebar');
        return sidebar.classList.contains('cr-sidebar--open');
    };

    return (
        <main className="cr-app bg-light">
            <Sidebar />
            <Content fluid onClick={handleContentClick}>
                <Header />
                {children}
                {/*<Footer />*/}
            </Content>
        </main>
    );
};

export default MainLayout;






// import Container from 'react-bootstrap/Container';
// import Sidebar from './Sidebar';
// import './index.css';
// import {useContext, useEffect} from "react";
// import AuthContext from "~/security/AuthContext";
// import {useNavigate} from "react-router-dom";
//
//
// function AdminLayout({children}) {
//     const {user} = useContext(AuthContext);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         if (!user || !user.roles?.some(item => item.name.includes("ADMIN"))) {
//             navigate("/error-403");
//         }
//     }, [user]);
//     return (
//         <div>
//             <Sidebar/>
//             <Container>
//                 <div className="content">{children}</div>
//             </Container>
//         </div>
//     );
// }
//
// export default AdminLayout;

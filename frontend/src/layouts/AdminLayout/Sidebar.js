import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Nav,
    Navbar,
    NavItem,
    NavLink as BSNavLink,
} from 'reactstrap';
import bn from '~/utils/bemnames';
import logo200Image from '~/assets/img/logo/logo_200.png';
import sidebarBgImage from '~/assets/img/sidebar/sidebar-5.jpg';
import SourceLink from '~/components/SourceLink';
import {FaBox, FaCubes, FaDolly, FaGithub, FaLaptopCode} from 'react-icons/fa';
import {
    MdAccountCircle,
    MdArrowDropDownCircle,
    MdBorderAll,
    MdBrush, MdCategory,
    MdChromeReaderMode,
    MdDashboard,
    MdExtension,
    MdGroupWork,
    MdInsertChart,
    MdKeyboardArrowDown,
    MdNotificationsActive,
    MdPages,
    MdRadioButtonChecked,
    MdSend,
    MdStar,
    MdTextFields,
    MdViewCarousel,
    MdViewDay,
    MdViewList,
    MdWeb,
    MdWidgets,
} from 'react-icons/md';
import {SidebarData} from "~/layouts/AdminLayout/SidebarData";
import SubMenu from "~/layouts/AdminLayout/SubMenu";

const sidebarBackground = {
    backgroundImage: `url("${sidebarBgImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

const navProducts = [
    { to: '/admin/products', name: 'Products', exact: false, Icon: MdViewList },
    { to: '/admin/import-products', name: 'Import', exact: false, Icon: FaDolly },

];


const navItems = [
    { to: '/admin/dashboard', name: 'Dashboard', exact: true, Icon: FaLaptopCode },
    { to: '/admin/categories', name: 'Categories', exact: false, Icon: MdDashboard },
];

const bem = bn.create('sidebar');

const Sidebar = () => {
    const [isOpenProducts, setIsOpenProducts] = useState(true);

    const handleClick = (name) => () => {
        switch (name) {
            case 'Products':
                setIsOpenProducts(!isOpenProducts);
                break;
            default:
                break;
        }
    };

    return (
        <aside className={bem.b()} data-image={sidebarBgImage}>
            <div className={bem.e('background')} style={sidebarBackground} />
            <div className={bem.e('content')}>
                <Navbar>
                    <SourceLink className="navbar-brand col-12 d-flex justify-content-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                             width="80" height="45" alt="logo" />
                    </SourceLink>
                </Navbar>
                <Nav vertical>
                    {navItems.map(({ to, name, exact, Icon }, index) => (
                        <NavItem key={index} className={bem.e('nav-item')}>
                            <BSNavLink
                                id={`navItem-${name}-${index}`}
                                className="text-uppercase"
                                tag={NavLink}
                                to={to}
                                activeClassName="active"
                                exact={exact}
                            >
                                <Icon className={bem.e('nav-item-icon')} />
                                <span className="">{name}</span>
                            </BSNavLink>
                        </NavItem>
                    ))}

                    <NavItem className={bem.e('nav-item')} onClick={handleClick('Products')}>
                        <BSNavLink className={bem.e('nav-item-collapse')}>
                            <div className="d-flex">
                                <FaCubes className={bem.e('nav-item-icon')} />
                                <span className=" align-self-start">PRODUCTS</span>
                            </div>
                            <MdKeyboardArrowDown
                                className={bem.e('nav-item-icon')}
                                style={{
                                    padding: 0,
                                    transform: isOpenProducts ? 'rotate(0deg)' : 'rotate(-90deg)',
                                    transitionDuration: '0.3s',
                                    transitionProperty: 'transform',
                                }}
                            />
                        </BSNavLink>
                    </NavItem>
                    <Collapse isOpen={isOpenProducts}>
                        {navProducts.map(({ to, name, exact, Icon }, index) => (
                            <NavItem key={index} className={bem.e('nav-item ml-5')}>
                                <BSNavLink
                                    id={`navItem-${name}-${index}`}
                                    className="text-uppercase"
                                    tag={NavLink}
                                    to={to}
                                    activeClassName="active"
                                    exact={exact}
                                >
                                    <Icon className={bem.e('nav-item-icon')} />
                                    <span className="">{name}</span>
                                </BSNavLink>
                            </NavItem>
                        ))}
                    </Collapse>
                </Nav>
            </div>
        </aside>
    );
}

export default Sidebar;








// import React, {memo, useState} from "react";
// import styled from "styled-components";
// import {Link} from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
// import {SidebarData} from "./SidebarData";
// import SubMenu from "./SubMenu";
// import {IconContext} from "react-icons/lib";
//
// const Nav = styled.div`
//   background: #000000;
//   height: 80px;
//   display: flex;
//   //position: fixed;
//   //justify-content: flex-start;
//   align-items: center;
//   top: 0;
//   width: 100%;
// `;
//
// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;
//
// const SidebarNav = styled.nav`
//   background: #000000;
//   //color: #000000;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({sidebar}) => (sidebar ? "0" : "-100%")};
//   transition: 350ms;
//   z-index: 10;
// `;
//
// const SidebarWrap = styled.div`
//   width: 100%;
// `;
//
// const Sidebar = () => {
//     console.log("render sidebar")
//     const [sidebar, setSidebar] = useState(false);
//
//     const showSidebar = () => setSidebar(!sidebar);
//
//     return (
//         <>
//             <IconContext.Provider value={{color: "#ffffff"}}>
//                 <Nav>
//                     <NavIcon to="#">
//                         <FaIcons.FaBars onClick={showSidebar}/>
//                     </NavIcon>
//                     <h1
//                         style={{
//                             color: "white",
//                             left: '50%',
//                             transform: 'translate(120%, 0)'
//                         }}
//                     >
//                         Lantern Business Web Application
//                     </h1>
//                 </Nav>
//                 <SidebarNav sidebar={sidebar}>
//                     <SidebarWrap>
//                         <NavIcon to="#">
//                             <FaIcons.FaBars onClick={showSidebar}/>
//                         </NavIcon>
//                         {SidebarData.map((item, index) => {
//                             return <SubMenu item={item} key={index}/>;
//                         })}
//                     </SidebarWrap>
//                 </SidebarNav>
//             </IconContext.Provider>
//         </>
//     );
// };
//
// export default memo(Sidebar);

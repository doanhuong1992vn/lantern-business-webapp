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
import sidebarBgImage from '~/assets/img/sidebar/sidebar-4.jpg';
import SourceLink from '~/components/SourceLink';
import { FaGithub } from 'react-icons/fa';
import {
    MdAccountCircle,
    MdArrowDropDownCircle,
    MdBorderAll,
    MdBrush,
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

const sidebarBackground = {
    backgroundImage: `url("${sidebarBgImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

const navComponents = [
    { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
    {
        to: '/button-groups',
        name: 'button groups',
        exact: false,
        Icon: MdGroupWork,
    },
    { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
    { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
    {
        to: '/dropdowns',
        name: 'dropdowns',
        exact: false,
        Icon: MdArrowDropDownCircle,
    },
    { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
    { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
    { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
    { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
];

const navContents = [
    { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
    { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
];

const pageContents = [
    { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
    {
        to: '/login-modal',
        name: 'login modal',
        exact: false,
        Icon: MdViewCarousel,
    },
];

const navItems = [
    { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
    { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },
    { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
    { to: '/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
];

const bem = bn.create('sidebar');

const Sidebar = () => {
    const [isOpenComponents, setIsOpenComponents] = useState(true);
    const [isOpenContents, setIsOpenContents] = useState(true);
    const [isOpenPages, setIsOpenPages] = useState(true);

    const handleClick = (name) => () => {
        switch (name) {
            case 'Components':
                setIsOpenComponents(!isOpenComponents);
                break;
            case 'Contents':
                setIsOpenContents(!isOpenContents);
                break;
            case 'Pages':
                setIsOpenPages(!isOpenPages);
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
                    <SourceLink className="navbar-brand d-flex">
                        <img src={logo200Image} width="40" height="30" className="pr-2" alt="" />
                        <span className="text-white">
              Reduction <FaGithub />
            </span>
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

                    <NavItem className={bem.e('nav-item')} onClick={handleClick('Components')}>
                        <BSNavLink className={bem.e('nav-item-collapse')}>
                            <div className="d-flex">
                                <MdExtension className={bem.e('nav-item-icon')} />
                                <span className=" align-self-start">Components</span>
                            </div>
                            <MdKeyboardArrowDown
                                className={bem.e('nav-item-icon')}
                                style={{
                                    padding: 0,
                                    transform: isOpenComponents ? 'rotate(0deg)' : 'rotate(-90deg)',
                                    transitionDuration: '0.3s',
                                    transitionProperty: 'transform',
                                }}
                            />
                        </BSNavLink>
                    </NavItem>
                    <Collapse isOpen={isOpenComponents}>
                        {navComponents.map(({ to, name, exact, Icon }, index) => (
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
                    </Collapse>

                    <NavItem className={bem.e('nav-item')} onClick={handleClick('Contents')}>
                        <BSNavLink className={bem.e('nav-item-collapse')}>
                            <div className="d-flex">
                                <MdSend className={bem.e('nav-item-icon')} />
                                <span className="">Contents</span>
                            </div>
                            <MdKeyboardArrowDown
                                className={bem.e('nav-item-icon')}
                                style={{
                                    padding: 0,
                                    transform: isOpenContents ? 'rotate(0deg)' : 'rotate(-90deg)',
                                    transitionDuration: '0.3s',
                                    transitionProperty: 'transform',
                                }}
                            />
                        </BSNavLink>
                    </NavItem>
                    <Collapse isOpen={isOpenContents}>
                        {navContents.map(({ to, name, exact, Icon }, index) => (
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
                    </Collapse>

                    <NavItem className={bem.e('nav-item')} onClick={handleClick('Pages')}>
                        <BSNavLink className={bem.e('nav-item-collapse')}>
                            <div className="d-flex">
                                <MdPages className={bem.e('nav-item-icon')} />
                                <span className="">Pages</span>
                            </div>
                            <MdKeyboardArrowDown
                                className={bem.e('nav-item-icon')}
                                style={{
                                    padding: 0,
                                    transform: isOpenPages ? 'rotate(0deg)' : 'rotate(-90deg)',
                                    transitionDuration: '0.3s',
                                    transitionProperty: 'transform',
                                }}
                            />
                        </BSNavLink>
                    </NavItem>
                    <Collapse isOpen={isOpenPages}>
                        {pageContents.map(({ to, name, exact, Icon }, index) => (
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

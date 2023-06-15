import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Collapse, Nav, Navbar, NavItem, NavLink as BSNavLink,} from 'reactstrap';
import bn from '~/utils/bemnames';
import sidebarBgImage from '~/assets/img/sidebar/sidebar-12.jpg';
import SourceLink from '~/components/SourceLink';
import {FaCubes, FaDolly, FaLaptopCode} from 'react-icons/fa';
import {MdDashboard, MdKeyboardArrowDown, MdViewList,} from 'react-icons/md';

const sidebarBackground = {
    backgroundImage: `url("${sidebarBgImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

const navProducts = [
    {to: '/admin/products', name: 'Products', exact: false, Icon: MdViewList},
    {to: '/admin/import-products', name: 'Import', exact: false, Icon: FaDolly},

];


const navItems = [
    {to: '/admin/dashboard', name: 'Dashboard', exact: true, Icon: FaLaptopCode},
    {to: '/admin/categories', name: 'Categories', exact: false, Icon: MdDashboard},
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
            <div className={bem.e('background')} style={sidebarBackground}/>
            <div className={bem.e('content')}>
                <Navbar>
                    <SourceLink className="navbar-brand col-12 d-flex justify-content-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                             width="80" height="45" alt="logo"/>
                    </SourceLink>
                </Navbar>
                <Nav vertical>
                    {navItems.map(({to, name, exact, Icon}, index) => (
                        <NavItem key={index} className={bem.e('nav-item')}>
                            <BSNavLink
                                id={`navItem-${name}-${index}`}
                                className="text-uppercase"
                                tag={NavLink}
                                to={to}
                                // activeClassName="active"
                                // exact={exact}
                            >
                                <Icon className={bem.e('nav-item-icon')}/>
                                <span className="">{name}</span>
                            </BSNavLink>
                        </NavItem>
                    ))}

                    <NavItem className={bem.e('nav-item')} onClick={handleClick('Products')}>
                        <BSNavLink className={bem.e('nav-item-collapse')}>
                            <div className="d-flex">
                                <FaCubes className={bem.e('nav-item-icon')}/>
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
                        {navProducts.map(({to, name, exact, Icon}, index) => (
                            <NavItem key={index} className={bem.e('nav-item ml-5')}>
                                <BSNavLink
                                    id={`navItem-${name}-${index}`}
                                    className="text-uppercase"
                                    tag={NavLink}
                                    to={to}
                                    // activeClassName="active"
                                    // exact={exact}
                                >
                                    <Icon className={bem.e('nav-item-icon')}/>
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
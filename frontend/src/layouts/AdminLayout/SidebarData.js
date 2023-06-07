import React from "react";
import {FaBox, FaCubes, FaDolly, FaFortAwesome, FaLaptopCode, FaThLarge} from "react-icons/fa";

import {RiArrowDownSFill, RiArrowUpSFill} from "react-icons/ri";
import styles from './Sidebar.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const SidebarData = [
    {
        title: "About Us",
        path: "/admin",
        icon: <FaFortAwesome className={cx('icon-sidebar')}/>,
    },
    {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <FaLaptopCode className={cx('icon-sidebar')}/>,
    },
    {
        title: "Category",
        path: "/admin/categories",
        icon: <FaThLarge className={cx('icon-sidebar')}/>,
    },
    {
        title: "Product",
        icon: <FaBox className={cx('icon-sidebar')}/>,

        iconClosed: <RiArrowDownSFill/>,
        iconOpened: <RiArrowUpSFill/>,

        subNav: [
            {
                title: "Products",
                path: "/admin/products",
                icon: <FaCubes className={cx('icon-sub-nav')}/>,
            },
            {
                title: "Import",
                path: "/admin/import-products",
                icon: <FaDolly className={cx('icon-sub-nav')}/>,
            },
        ],
    },
];
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #ffffff;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    //background: linear-gradient(to bottom, #ea7b33, #d65256, #df4883, #b8559b);
    background: rgba(#ffffff, 0.15);
    
    border-left: 4px solid #ffffff;
    cursor: pointer;
    color: #fbd500;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: linear-gradient(to bottom, #ea7b33, #d65256, #df4883, #b8559b);
  //background: rgba(#ffffff, 0.15);
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    //background: linear-gradient(to right, #ea7b33, #d65256, #df4883, #b8559b);
    background: rgba(#ffffff, 0.15);
    
    cursor: pointer;
    color: #fbd500;
    border-left: 4px solid #ffffff;
  }
`;

const SubMenu = ({ item }) => {
    const [subNav, setSubNav] = useState(false);

    const showSubNav = () => setSubNav(!subNav);

    return (
        <>
            <SidebarLink to={item.path}
                         onClick={item.subNav && showSubNav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subNav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarLink>
            {subNav &&
                item.subNav.map((item, index) => {
                    return (
                        <DropdownLink to={item.path} key={index}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </DropdownLink>
                    );
                })}
        </>
    );
};

export default SubMenu;
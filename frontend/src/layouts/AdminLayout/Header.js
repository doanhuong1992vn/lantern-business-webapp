import React, { useState } from 'react';
import { Button, ListGroup, ListGroupItem, Nav, Navbar, NavItem, NavLink, Popover, PopoverBody } from 'reactstrap';
import { MdClearAll, MdExitToApp, MdHelp, MdInsertChart, MdMessage, MdNotificationsActive, MdNotificationsNone, MdPersonPin, MdSettingsApplications } from 'react-icons/md';
import bn from '~/utils/bemnames';

import Avatar from '~/components/Avatar';
import { UserCard } from '~/components/Card';
import Notifications from '~/components/Notifications';
import SearchInput from '~/components/SearchInput';
import { notificationsData } from '~/demos/header';
import withBadge from '~/hocs/withBadge';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
    size: 'md',
    color: 'primary',
    style: {
        top: -10,
        right: -10,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    children: <small>5</small>,
})(MdNotificationsActive);

const Header = () => {
    const [isOpenNotificationPopover, setIsOpenNotificationPopover] = useState(false);
    const [isNotificationConfirmed, setIsNotificationConfirmed] = useState(false);
    const [isOpenUserCardPopover, setIsOpenUserCardPopover] = useState(false);

    const toggleNotificationPopover = () => {
        setIsOpenNotificationPopover(!isOpenNotificationPopover);

        if (!isNotificationConfirmed) {
            setIsNotificationConfirmed(true);
        }
    };

    const toggleUserCardPopover = () => {
        setIsOpenUserCardPopover(!isOpenUserCardPopover);
    };

    const handleSidebarControlButton = (event) => {
        event.preventDefault();
        event.stopPropagation();

        document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
    };

    return (
        <Navbar light expand className={bem.b('bg-white')}>
            <Nav navbar className="mr-2">
                <Button outline onClick={handleSidebarControlButton}>
                    <MdClearAll size={25} />
                </Button>
            </Nav>
            <Nav navbar>
                <SearchInput />
            </Nav>

            <Nav navbar className={bem.e('nav-right')}>
                <NavItem className="d-inline-flex">
                    <NavLink id="Popover1" className="position-relative">
                        {isNotificationConfirmed ? (
                            <MdNotificationsNone
                                size={25}
                                className="text-secondary can-click"
                                onClick={toggleNotificationPopover}
                            />
                        ) : (
                            <MdNotificationsActiveWithBadge
                                size={25}
                                className="text-secondary can-click animated swing infinite"
                                onClick={toggleNotificationPopover}
                            />
                        )}
                    </NavLink>
                    <Popover
                        placement="bottom"
                        isOpen={isOpenNotificationPopover}
                        toggle={toggleNotificationPopover}
                        target="Popover1"
                    >
                        <PopoverBody>
                            <Notifications notificationsData={notificationsData} />
                        </PopoverBody>
                    </Popover>
                </NavItem>

                <NavItem>
                    <NavLink id="Popover2">
                        <Avatar onClick={toggleUserCardPopover} className="can-click" />
                    </NavLink>
                    <Popover
                        placement="bottom-end"
                        isOpen={isOpenUserCardPopover}
                        toggle={toggleUserCardPopover}
                        target="Popover2"
                        className="p-0 border-0"
                        style={{ minWidth: 250 }}
                    >
                        <PopoverBody className="p-0 border-light">
                            <UserCard
                                title="Jane"
                                subtitle="jane@jane.com"
                                text="Last updated 3 mins ago"
                                className="border-light"
                            >
                                <ListGroup flush>
                                    <ListGroupItem tag="button" action className="border-light">
                                        <MdPersonPin /> Profile
                                    </ListGroupItem>
                                    <ListGroupItem tag="button" action className="border-light">
                                        <MdInsertChart /> Stats
                                    </ListGroupItem>
                                    <ListGroupItem tag="button" action className="border-light">
                                        <MdMessage /> Messages
                                    </ListGroupItem>
                                    <ListGroupItem tag="button" action className="border-light">
                                        <MdSettingsApplications /> Settings
                                    </ListGroupItem>
                                    <ListGroupItem tag="button" action className="border-light">
                                        <MdHelp /> Help
                                    </ListGroupItem>
                                    <ListGroupItem tag="button" action className="border-light">
                                        <MdExitToApp /> Signout
                                    </ListGroupItem>
                                </ListGroup>
                            </UserCard>
                        </PopoverBody>
                    </Popover>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Header;

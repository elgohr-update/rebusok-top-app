import React from 'react';
import {SidebarProps} from './Sidebar.props';
import Menu from "../Menu/Menu";
import Logo from '../logo.svg';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import Search from "../../components/Search/Search";
const Sidebar = ({className,...props}: SidebarProps): JSX.Element => {

    return (
        <div {...props} className={cn(className, styles.sidebar)}>
            <Logo className={styles.logo}/>
            <Search/>
            <Menu/>
        </div>
    );
};

export default Sidebar;
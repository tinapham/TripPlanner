import React from 'react';
import Drawer from 'material-ui/Drawer';
import { spacing, typography } from 'material-ui/styles';
import { white, blue600} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56,
    },
    logo_mgm: {
      width: `100px`
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundImage: 'url(' + require('../images/backgroundAva.jpg') + ')' ,
        backgroundSize: 'cover',
        height: 85
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: white,
        fontWeight: 'bold',
        fontSize: '1em',
        textShadow: '1px 1px #000'
      }
    }
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
      <div style={styles.logo}>
        <span><img style={styles.logo_mgm} src='../images/mgm-logo.svg' alt="mgm-logo" /> </span>
      </div>
      <div style={styles.avatar.div}>
        <Avatar src="../images/defaultAvatar.png"
          size={50}
          style={styles.avatar.icon} />
        <span style={styles.avatar.span}>{props.username}</span>
      </div>
      <div>
        {props.menus.map((menu, index) =>
          <MenuItem
            key={index}
            style={styles.menuItem}
            primaryText={menu.text}
            leftIcon={menu.icon}
            containerElement={<NavLink activeStyle={{ fontWeight: 'bold',color:'#00BCD4'}} to={menu.link} />}
          />
        )}
      </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;

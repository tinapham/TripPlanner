import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../../components/header/index';
import LeftDrawer from '../../components/left-drawer/index';
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth';
import ThemeDefault from '../../theme-default';
import Footer from '../../components/footer/index';
import PropTypes from 'prop-types';
import Data from '../../data';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0,
        minHeight: '76vh'
      },
      footer:{
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 50
      }
    };
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header}
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)} />

          <LeftDrawer navDrawerOpen={navDrawerOpen}
            menus={this.props.isAdmin? Data.adminMenus : Data.menus}
            username={this.props.email}
          />
          <div style={styles.container}>
            {this.props.children}
          </div>
          <Footer styles={styles.footer}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

Container.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(Container);

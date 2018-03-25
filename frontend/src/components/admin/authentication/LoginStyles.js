import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey500} from 'material-ui/styles/colors';

export const themeDefault = getMuiTheme({
  raisedButton: {
    primaryColor: 'rgb(0, 163, 204)'
  }
});

export function getStyles(widthSize, heightSize) {
  let size = widthSize < heightSize ? widthSize : heightSize;
  return {
    logoMgm: {
      display: 'block',
      width: `${size / 10}px`,
      marginLeft: `${size / 30}px`,
      paddingTop: `${size / 100}px`
    },

    loginContainer: {
      width: '100%',
      height: '100vh',
      background: 'url(' + require('../images/login-bg.jpg') + ') no-repeat',
      backgroundSize: 'cover',
      position: 'relative'
    },

    loginForm: {
      minWidth: '20%',
      maxWidth: '500px',
      height: 'auto',
      position: 'absolute',
      top: '15%',
      left: '0',
      right: '0',
      margin: 'auto',
    },

    paper: {
      padding: '20px',
      overflow: 'auto',
    },

    buttonsDiv: {
      textAlign: 'center',
      padding: '10px',
    },

    loginBtn: {
      float: 'right',
    },

    checkRemember: {
      float: 'left',
      maxWidth: '180px',
      paddingTop: '5px',

      labelStyle: {
        color: grey500
      },

      iconStyle: {
        color: grey500,
        borderColor: grey500,
        fill: grey500
      }
    }
  };
}
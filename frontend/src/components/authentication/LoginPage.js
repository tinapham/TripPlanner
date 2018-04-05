import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import {themeDefault, getStyles} from './LoginStyles';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import './style.css'

class LoginPage extends React.Component{

  url = process.env.REACT_APP_BACKEND_URL + "api/user/";

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      checkRememberMe: false,
      emailErrorText: undefined,
      passwordErrorText: undefined
    };
    this.login = this.login.bind(this);
  }

  onEmailChange = (event) => {
    this.setState({
      emailErrorText: (!event.target.value.includes('@') || !event.target.value.includes('.'))
        ? "The email type is incorrect"
        : undefined,
      email: event.target.value
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      passwordErrorText: (event.target.value.length < 4)
        ? "The minimum password length is 4"
        : undefined,
      password: event.target.value
    });
  };

  onRememberMeClick = () => {
    this.setState({
      checkRememberMe: !this.state.checkRememberMe
    })
  };

  async login(){
    let response = await axios({
      method: 'POST',
      url: `${this.url}${this.state.checkRememberMe}`,
      data: {
        ...this.state,
        password: sha256(this.state.password),
      }
    });
    if(response.data !== "USER NOT FOUND"){
      localStorage.setItem("access-token", response.data);
      window.location.href = "/";
    } else {
      this.setState({
        emailErrorText: "Email or password is incorrect"
      });
    }
  }

  render(){

    const styles = getStyles(window.innerWidth, window.innerHeight);
    return (
      <MuiThemeProvider muiTheme={themeDefault}>
        <div style={styles.loginContainer}>
          <div style={styles.loginForm}>
            <Paper style={styles.paper}>
              <form>
                <TextField
                  hintText="E-mail"
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  errorText={this.state.emailErrorText}
                  floatingLabelText="E-mail"
                  fullWidth={true}
                />
                <TextField
                  hintText="Password"
                  value={this.state.password}
                  errorText={this.state.passwordErrorText}
                  onChange={this.onPasswordChange}
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                />

                <div>
                  <Checkbox style={styles.checkRemember}
                    label="Remember me"
                    labelStyle={styles.checkRemember.labelStyle}
                    iconStyle={styles.checkRemember.iconStyle}
                    checked={this.state.checkRememberMe}
                    onCheck={this.onRememberMeClick}
                  />
                  <RaisedButton style={styles.loginBtn}
                                label="Login"
                                primary={true}
                                disabledBackgroundColor={true}
                                onClick={this.login}
                  />
                </div>
              </form>
            </Paper>

            <div style={styles.buttonsDiv}>
              <FlatButton
                label="Register"
                href="/register"
                hoverColor="rgb(0, 184, 230)"
                labelStyle={{color: 'white'}}
                icon={<PersonAdd color="white"/>}
              />

              <FlatButton
                label="Forgot Password?"
                href="/"
                hoverColor="rgb(0, 184, 230)"
                labelStyle={{color: 'white'}}
                icon={<Help color="white"/>}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default LoginPage;
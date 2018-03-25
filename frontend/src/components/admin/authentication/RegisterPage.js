import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Person from 'material-ui/svg-icons/social/person';
import Place from 'material-ui/svg-icons/maps/place';
import TextField from 'material-ui/TextField';
import {themeDefault, getStyles} from './LoginStyles';
import axios from 'axios';
import {sha256} from 'js-sha256';

class RegisterPage extends React.Component{

  url = process.env.REACT_APP_BACKEND_URL + "api/user/add";

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      match: undefined,
      checkPasswordType: undefined,
      checkEmailType: undefined
    };
    this.register = this.register.bind(this)
  }

  onEmailChange = (event) => {
    this.setState({
      checkEmailType: (!event.target.value.includes('@') || !event.target.value.includes('.'))
                                ? "The email type is incorrect"
                                : undefined,
      email: event.target.value
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      match: (this.state.passwordConfirm !== event.target.value)
                                ? "Password does not match the confirm password."
                                : undefined,
      checkPasswordType: (event.target.value.length < 4)
                                ? "The minimum password length is 4"
                                : undefined,
      password: event.target.value
    });
  };

  onPasswordConfirmChange = (event) => {
    this.setState({
      match: (this.state.password !== event.target.value)
                                ? "Password does not match the confirm password."
                                : undefined,
      passwordConfirm: event.target.value
    });
  };

  async register() {
    await this.setState({
      checkEmailType: !this.state.email ? "Email cannot empty" : undefined,
      checkPasswordType: !this.state.password ? "Password cannot empty" : undefined
    });
    let response = (!this.state.checkEmailType && !this.state.checkPasswordType && !this.state.match)
      ? await axios({
          method: 'POST',
          url: `${this.url}`,
          data: {
            email: this.state.email,
            password: sha256(this.state.password),
          }
        })
      : undefined;
    if(response){
      if(response.data === "USER IS EXISTED") {
        this.setState({
          checkEmailType: "User is existed",
          email: "",
          password: "",
          passwordConfirm: ""
        });
      } else if(response.data === "ERROR") {
        this.setState({
          checkEmailType: "Cannot register",
          email: "",
          password: "",
          passwordConfirm: ""
        });
      } else {
        window.location.href = "/admin/login";
      }
    }
  }

  render(){
    const styles = getStyles(window.innerWidth, window.innerHeight);
    return (
      <MuiThemeProvider muiTheme={themeDefault}>
        <div style={styles.loginContainer}>
          <span className="wrapper-logo-mgm"><img style={styles.logoMgm} src='../images/mgm-logo.svg' alt=""/> </span>
          <div style={styles.loginForm}>
            <Paper style={styles.paper}>
              <form>
                <TextField
                  hintText="E-mail"
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  floatingLabelText="E-mail"
                  errorText={this.state.checkEmailType}
                  fullWidth={true}
                  type="email"
                />
                <TextField
                  hintText="Password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  errorText={this.state.checkPasswordType}
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  underlineStyle={{background: `#00a3cc`}}
                />
                <TextField
                  hintText="Confirm Password"
                  errorText={this.state.match}
                  value={this.state.passwordConfirm}
                  onChange={this.onPasswordConfirmChange}
                  floatingLabelText="Confirm Password"
                  fullWidth={true}
                  type="password"
                />
                <div>
                  <RaisedButton style={styles.loginBtn}
                                label="Register"
                                primary={true}
                                onClick={this.register}
                  />
                </div>
              </form>
            </Paper>

            <div style={styles.buttonsDiv}>
              <FlatButton
                label="Login"
                href="/admin/login"
                hoverColor="rgb(0, 184, 230)"
                labelStyle={{color: 'white'}}
                icon={<Person color="white"/>}
              />

              <FlatButton
                label="Dashboard"
                href="/admin"
                hoverColor="rgb(0, 184, 230)"
                labelStyle={{color: 'white'}}
                icon={<Place color="white"/>}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default RegisterPage;
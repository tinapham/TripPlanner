import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {sha256} from 'js-sha256';

class FormAddUser extends React.Component{

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

  reset = () => {
    this.setState({
      email: "",
      password: "",
      passwordConfirm: "",
      match: undefined,
      checkPasswordType: undefined,
      checkEmailType: undefined
    });
  };

  async register(){
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
    if (response) {
      if (response.data === "USER IS EXISTED") {
        this.setState({
          checkEmailType: "User is existed",
          email: "",
          password: "",
          passwordConfirm: ""
        });
      } else if (response.data === "ERROR") {
        this.setState({
          checkEmailType: "Cannot register",
          email: "",
          password: "",
          passwordConfirm: ""
        });
      } else {
        window.location.href = "/admin/users";
      }
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Reset"
        primary={true}
        onClick={this.reset}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.register}
      />,
    ];
    return (
      <Dialog
        title="Add new user"
        actions={actions}
        modal={true}
        open={this.props.open}
      >
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
        </form>
      </Dialog>
    );
  }
}

export default FormAddUser;
import React from 'react';
import AvReplay from 'material-ui/svg-icons/av/replay';
import ContentSave from 'material-ui/svg-icons/content/save';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Tab, Tabs} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

import globalStyles from '../styles';
import styles from '../forms/FormsStyle';
import './UserProfile.css';

import axios from 'axios';
import {sha256} from 'js-sha256';
import {loggedIn} from '../authentication/oauth';

export default class UserProfile extends React.Component {
  url = process.env.REACT_APP_BACKEND_URL + "admin/api/user/update";

  constructor(props) {
    super(props);
    this.state = {
      oldPass: "",
      newPass: "",
      newPassConfirm: "",
      oldPassError: undefined,
      newPassError: undefined,
      newPassConfirmError: undefined,
      tabValue: "",
      message: undefined,
      openMessage: false
    };
  }

  closeMessage = () => {
    this.setState({
      openMessage: false
    });
  };

  reset = () => {
    this.setState({
      oldPass: "",
      newPass: "",
      newPassConfirm: "",
      tabValue: ""
    });
  };

  onOldPasswordChange = (event) => {
    this.setState({
      oldPassError: (event.target.value.length < 4)
        ? "The minimum password length is 4"
        : (event.target.value === this.state.newPass)
          ? "old Password must different from new Password"
          : undefined,
      oldPass: event.target.value
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      newPassError: (event.target.value.length < 4)
        ? "The minimum password length is 4"
        : (event.target.value === this.state.oldPass)
          ? "New Password must different from old Password"
          : undefined,
      newPassConfirmError: (event.target.value !== this.state.newPassConfirm)
        ? "Password does not match the confirm password."
        : undefined,
      newPass: event.target.value
    });
  };

  onPasswordConfirmChange = (event) => {
    this.setState({
      newPassConfirmError: (this.state.newPass !== event.target.value)
        ? "Password does not match the confirm password."
        : undefined,
      newPassConfirm: event.target.value
    });
  };

  updateProfile = async () => {
    if (!this.state.oldPassError && !this.state.newPassError && !this.state.newPassConfirmError &&
      !(this.state.newPass.length < 4) && !(this.state.oldPass.length < 4)) {
      let accessToken = loggedIn();
      if (accessToken === "") {
        window.location.href = "/admin/login";
      }
      let response = await
        axios({
          data: {
            email: this.props.email,
            password: sha256(this.state.oldPass),
            newPassword: sha256(this.state.newPass)
          },
          method: 'POST',
          url: `${this.url}`
        });
      if (response.data === "ERROR") {
        this.setState({
          newPass: "",
          newPassConfirm: "",
          message: "Wrong password!",
          openMessage: true
        });
      } else if (response.data === "ADMIN CAN NOT BE CHANGED") {
        this.reset();
        this.setState({
          message: "Can not change the password of admin!",
          openMessage: true
        })
      } else {
        this.reset();
        this.setState({
          message: "Password changed successfully!",
          openMessage: true
        })
      }
    } else {
      this.setState({
        message: "Please check data on the form correctly!",
        openMessage: true
      })
    }
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.closeMessage}
      />,
    ];
    return (
      <div className="col-md-12">
        <div className="userCard hoveruserCard">
          <div className="userCard-background">
            <img className="userCard-bkimg" alt="" src={this.props.avatar}/>
          </div>
          <div className="useravatar">
            <img alt="" src={this.props.avatar}/>
          </div>
          <div className="userCard-info">
            <span className="userCard-title">{this.props.email}</span>
          </div>
        </div>
        <Tabs
          value={this.state.tabValue}
          onChange={tabValue => {
            this.setState({tabValue})
          }}
        >
          <Tab label="Change Password" value='Change Password'>
            <div>
              <Paper style={globalStyles.paper} className="clearfix">
                <div>
                  <TextField
                    errorText={this.state.oldPassError}
                    floatingLabelText="old Password"
                    fullWidth={true}
                    onChange={this.onOldPasswordChange}
                    type="password"
                    value={this.state.oldPass}/>
                  <TextField
                    errorText={this.state.newPassError}
                    floatingLabelText="new Password"
                    fullWidth={true}
                    onChange={this.onPasswordChange}
                    type="password"
                    value={this.state.newPass}/>
                  <TextField
                    errorText={this.state.newPassConfirmError}
                    floatingLabelText="confirm Password"
                    fullWidth={true}
                    onChange={this.onPasswordConfirmChange}
                    type="password"
                    value={this.state.newPassConfirm}/>

                  <div style={styles.buttons}>
                    <RaisedButton label="Save"
                                  onClick={this.updateProfile}
                                  icon={<ContentSave/>}
                                  secondary={true}
                                  style={styles.saveButton}/>
                    <RaisedButton label="Reset"
                                  onClick={this.reset}
                                  icon={<AvReplay/>}
                                  style={styles.saveButton}/>
                  </div>
                </div>
              </Paper>
            </div>
          </Tab>
        </Tabs>
        <Dialog
          actions={actions}
          modal={true}
          open={this.state.openMessage}
          title="Inform"
        >{this.state.message}
        </Dialog>
      </div>
    );
  }
}
UserProfile.defaultProps = {
  avatar: '../images/defaultAvatar.png'
};
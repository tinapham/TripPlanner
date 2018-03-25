import React, {Component} from 'react';
import '../dashboard/AdminManagement.css';
import update from 'immutability-helper'
import LabelContainer from '../dndScreenLabel/LabelContainer';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentSave from 'material-ui/svg-icons/content/save';
import AvNotInterested from 'material-ui/svg-icons/av/not-interested';
import styles from './FormsStyle'

class AttractionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state ? this.props.location.state.data.id : undefined,
      name: this.props.location.state ? this.props.location.state.data.name : "",
      address: this.props.location.state ? this.props.location.state.data.address : "",
      lat: this.props.location.state ? this.props.location.state.data.lat : undefined,
      lng: this.props.location.state ? this.props.location.state.data.lng : undefined,
      type: this.props.location.state ? this.props.location.state.data.type : "",
      description: this.props.location.state ? this.props.location.state.data.description : "",
      // screens: this.props.location.state ? this.props.location.state.data.screens : [],
      // activatedScreenForm: false,
      // idScreens: this.getIdScreens(this.props.location.state ? this.props.location.state.data.screens : []),
      errorMessage: undefined
    }
    // this.showScreenForm = this.showScreenForm.bind(this);
    // this.addScreen = this.addScreen.bind(this);
    this.saveAttraction = this.saveAttraction.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onLatitudeChange = this.onLatitudeChange.bind(this);
    this.onLongitudeChange = this.onLongitudeChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    // this.inputListener = this.inputListener.bind(this);
    // this.deleteScreen = this.deleteScreen.bind(this);
    // this.updateScreen = this.updateScreen.bind(this);
  }

  // getIdScreens(screens) {
  //   let idScreens = []
  //   if (screens.length > 0) {
  //     screens.map((screen, i) => {
  //       idScreens.push(screen.id)
  //     })
  //   }
  //   return idScreens;
  // }
  //
  // updateScreen(dragIndex, hoverIndex) {
  //   const {screens} = this.state
  //   const dragScreen = screens[dragIndex]
  //   this.setState(
  //     update(this.state, {
  //       screens: {
  //         $splice: [[dragIndex, 1], [hoverIndex, 0, dragScreen]],
  //       },
  //     }),
  //   )
  // }

  // showScreenForm(value, screen) {
  //   this.setState({
  //     activatedScreenForm: value,
  //     screen: screen,
  //     activatedAppForm: false,
  //     app: {}
  //   });
  // }

  // addScreen() {
  //   let defaultScreen = {
  //     id: -Number(new Date()),
  //     type: "Grid-layout",
  //     "animation-type": "slide-right",
  //     rows: 1,
  //     cols: 1,
  //     apps: [{
  //       type: "",
  //       parameters: []
  //     }]
  //   };
  //   this.setState({
  //     screens: [...this.state.screens, defaultScreen],
  //     activatedScreenForm: true,
  //     screen: defaultScreen,
  //     activatedAppForm: false,
  //     app: {}
  //   });
  // }

  saveAttraction() {
    if (this.state.name === "") {
      this.setState({
        errorMessage: "This field is required"
      })
    } else {
      // let {screens} = this.state;
      // screens.map((screen, i) => {
      //   screen.id = this.state.idScreens[i]
      // })
      if (this.state.id) {
        this.props.update(this.state.id, this.state)
      } else {
        this.props.save(this.state);
      }
    }

  }

  onNameChange(event) {
    this.setState({
      name: event.target.value,
      errorMessage: undefined
    });
  }

  onAddressChange(event) {
    this.setState({
      address: event.target.value,
      errorMessage: undefined
    });
  }

  onLatitudeChange(event) {
    this.setState({
      lat: event.target.value,
      errorMessage: undefined
    });
  }

  onLongitudeChange(event) {
    this.setState({
      lng: event.target.value,
      errorMessage: undefined
    });
  }

  onTypeChange(event) {
    this.setState({
      type: event.target.value
    });
  }

  onDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  deleteScreen(position) {
    this.setState({
      screens: [...this.state.screens.slice(0, position),
        ...this.state.screens.slice(position + 1)],
      activatedScreenForm: false,
    });
  }

  // inputListener(type, key, value) {
  //   let data = this.state[type];
  //   data[key] = value;
  //   if (type === "screen") {
  //     this.setState(
  //       update(this.state, {
  //         screen: {
  //           $set: data
  //         },
  //       }),
  //     );
  //   } else {
  //     this.setState(
  //       update(this.state, {
  //         app: {
  //           $set: data
  //         },
  //       }),
  //     );
  //
  //   }
  // }

  render() {
    return (
      <div>
        <PageBase title="Tourist Attraction"
                  navigation="Application / Attraction Form">
          <div>
            <TextField
              id="name"
              name="name"
              floatingLabelText="Name"
              fullWidth={true}
              type="text"
              hintText="eg: Ban Co Peak, Muong Thanh Hotel, ..."
              value={this.state.name}
              onChange={this.onNameChange}
              ref="name"
              errorText={this.state.errorMessage}
            />

            <TextField
              id="address"
              name="address"
              floatingLabelText="Address"
              fullWidth={true}
              type="text"
              hintText="eg: 1 Hai Phong Str., Hai Chau Dist., Da Nang"
              value={this.state.address}
              onChange={this.onAddressChange}
              ref="address"
              errorText={this.state.errorMessage}
            />

            <TextField
              id="latitude"
              name="latitude"
              floatingLabelText="Latitude"
              fullWidth={true}
              type="number"
              hintText="eg: 16.102130"
              value={this.state.lat}
              onChange={this.onLatitudeChange}
              ref="latitude"
              errorText={this.state.errorMessage}
            />

            <TextField
              id="longitude"
              name="longitude"
              floatingLabelText="Longitude"
              fullWidth={true}
              type="number"
              hintText="eg: 108.271949"
              value={this.state.lng}
              onChange={this.onLongitudeChange}
              ref="longitude"
              errorText={this.state.errorMessage}
            />

            <TextField
              floatingLabelText="Type"
              fullWidth={true}
              type="text"
              hintText="Enter type of attraction. eg: Park, Tourist Attraction, Restaurant, ..."
              value={this.state.type}
              min="1"
              onChange={this.onTypeChange}
              ref="displayTime"
            />

            <TextField
              multiLine={true}
              rows={1}
              floatingLabelText="Description"
              fullWidth={true}
              type="text"
              value={this.state.description}
              min="1"
              onChange={this.onDescriptionChange}
              ref="displayTime"
            />

            {/*<div style={styles.toggleDiv}>*/}
              {/*<label>Screens:</label>*/}
              {/*<div className="text-left">*/}
                {/*<div className="tags">*/}
                  {/*<LabelContainer screens={this.state.screens}*/}
                                  {/*deleteScreen={this.deleteScreen}*/}
                                  {/*onClick={this.showScreenForm}*/}
                                  {/*updateScreen={this.updateScreen}/>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*<RaisedButton*/}
              {/*label="Add New Feedback"*/}
              {/*primary={true}*/}
              {/*style={styles.buttonAdd}*/}
              {/*onClick={this.addScreen}*/}
              {/*icon={<ContentAdd/>}*/}
            {/*/>*/}
            {/*<Divider/>*/}

            <div style={styles.buttons}>
              <Link to="/admin/attractions">
                <RaisedButton
                  label="Cancel"
                  icon={<AvNotInterested/>}
                />
              </Link>

              <RaisedButton label="Save"
                            onClick={this.saveAttraction}
                            style={styles.saveButton}
                            type="submit"
                            icon={<ContentSave/>}
                            secondary={true}/>
            </div>
          </div>
        </PageBase>
        {/*<div>*/}
          {/*{*/}
            {/*this.state.activatedScreenForm*/}
              {/*? <ScreenForm activatedAppForm={this.state.activatedAppForm}*/}
                            {/*appData={this.state.app}*/}
                            {/*screen={this.state.screen}*/}
                            {/*onRowsChange={this.onRowsChange}*/}
                            {/*onColsChange={this.onColsChange}*/}
                            {/*showScreenForm={this.showScreenForm}*/}
                            {/*showAppForm={this.showAppForm}*/}
                            {/*onChange={this.inputListener}*/}
              {/*/>*/}
              {/*: undefined*/}
          {/*}*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default AttractionForm;
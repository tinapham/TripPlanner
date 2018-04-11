import React, {Component} from 'react';
import '../Admin.css';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PageBase from '../../components/page-base/index';
import ContentSave from 'material-ui/svg-icons/content/save';
import AvNotInterested from 'material-ui/svg-icons/av/not-interested';
import styles from './styles'

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
      errorMessage: undefined
    }
    this.saveAttraction = this.saveAttraction.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onLatitudeChange = this.onLatitudeChange.bind(this);
    this.onLongitudeChange = this.onLongitudeChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  saveAttraction() {
    if (this.state.name === "") {
      this.setState({
        errorMessage: "This field is required"
      })
    } else {
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
      </div>
    )
  }
}

export default AttractionForm;
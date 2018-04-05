import React, {Component} from 'react';
import PageBase from '../components/PageBase';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import styles from './FormsStyle';
import RaisedButton from 'material-ui/RaisedButton';
import AvNotInterested from 'material-ui/svg-icons/av/not-interested';
import MenuItem from 'material-ui/MenuItem';
class EventForm extends Component {

  constructor(props) {
    super(props);
    this.cancelForm = this.cancelForm.bind(this);
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
    this.onAttractionChange = this.onAttractionChange.bind(this);
  }

  onStartTimeChange(event) {
    this.props.onEventChange("start-time", event.target.value);
  }

  onEndTimeChange(event) {
    this.props.onEventChange("end-time", event.target.value);
  }

  onAttractionChange(event, index, value){
    const result = this.props.attractions.find( attraction => attraction.name === value );
    this.props.onEventChange("attraction", result);
  }

  cancelForm() {
    this.props.showEventForm(false, {});
  }

  render() {
    let listAttraction = [];
    this.props.attractions.map(function (place, index) {
      listAttraction = [...listAttraction, <MenuItem value={place.name} key={index} primaryText={place.name} />];
    });

    return (
      <PageBase title="Event">
        <div>
          <TextField
            id="start-time"
            name="Start-time"
            floatingLabelText="Start time"
            fullWidth={true}
            type="text"
            onChange={this.onStartTimeChange}
            value={this.props.event['start-time']}
          />
          <TextField
            id="end-time"
            name="End-time"
            floatingLabelText="End time"
            fullWidth={true}
            type="text"
            onChange={this.onEndTimeChange}
            value={this.props.event['end-time']}
          />
          <SelectField
            floatingLabelText="Destination"
            value={this.props.event.attraction.name}
            onChange={this.onAttractionChange}
            fullWidth={true}
          >
            {listAttraction}
          </SelectField>
          <TextField
            id="address"
            name="Address"
            floatingLabelText="Address"
            fullWidth={true}
            type="text"
            value={this.props.event.attraction.address}
            disabled={true}
          />
          <TextField
            id="lat"
            name="Latitude"
            floatingLabelText="Latitude"
            fullWidth={true}
            type="text"
            value={this.props.event.attraction.lat}
            disabled={true}
          />
          <TextField
            id="lng"
            name="Longitude"
            floatingLabelText="Longitude"
            fullWidth={true}
            type="text"
            value={this.props.event.attraction.lng}
            disabled={true}
          />
          <TextField
            id="type"
            name="Type"
            floatingLabelText="Type"
            fullWidth={true}
            type="text"
            value={this.props.event.attraction.type}
            disabled={true}
          />
          <TextField
            id="description"
            name="Description"
            floatingLabelText="Description"
            fullWidth={true}
            type="text"
            value={this.props.event.attraction.description}
            disabled={true}
          />
          <br />
          <div style={styles.buttons}>
            <RaisedButton label="Cancel"
                          onClick={this.cancelForm}
                          style={styles.saveButton}
                          icon={<AvNotInterested/>}
            />
          </div>
        </div>
      </PageBase>
    )
  }
}

export default EventForm;
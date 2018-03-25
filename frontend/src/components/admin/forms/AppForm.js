import React, { Component } from 'react';
import AppParams from './AppParams';
import PageBase from '../components/PageBase';
import SelectField from 'material-ui/SelectField';
import styles from './FormsStyle';
import RaisedButton from 'material-ui/RaisedButton';
import AvReplay from 'material-ui/svg-icons/av/replay';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Data from '../data'

class AppForm extends Component {

  constructor(props) {
    super(props);
    this.saveParameters = this.saveParameters.bind(this);
    this.reset = this.reset.bind(this);
    this.typeChangeListener = this.typeChangeListener.bind(this);
    this.addParameter = this.addParameter.bind(this);
  }

  reset() {
    this.props.onChange("app", "type", "");
    this.props.onChange("app", "parameters", []);
  }

  addParameter(type) {
    if (!type) {
      let parameter = {
        key: "",
        value: ""
      }
      let parameters = [...this.props.data.parameters, parameter];
      this.props.onChange("app", "parameters", parameters);
    }else{
      let parameters = [...Data.parameters[type]].map(parameter => ({...parameter}));
      this.props.onChange("app","parameters", parameters)
    }
  }

  saveParameters(position, isKey, value) {
    let parameters = [...this.props.data.parameters];
    if (isKey) {
      parameters[position].key = value;
    } else {
      parameters[position].value = value;
    }
    this.props.onChange("app", "parameters", parameters);
  }

  typeChangeListener(event, index, value) {
    this.props.onChange("app", "type", value);
    this.addParameter(value)
  }

  render() {
    return (
      <PageBase title="App">
        <div>
          <SelectField
            floatingLabelText="Type"
            value={this.props.data.type}
            onChange={this.typeChangeListener}
            fullWidth={true}
          >
            {Data.componentName}
          </SelectField>
          <div>
            <label>Parameter</label>
          </div>
          <div>
            {
              this.props.data.parameters.map(
                (element, index) => <AppParams
                  parameter={element}
                  key={index}
                  index={index}
                  onChange={this.saveParameters} />
              )
            }
          </div>
          <div style={styles.buttons}>
            <RaisedButton
              label="New Parameter"
              primary={true}
              style={styles.buttonAdd}
              onClick={() => { this.addParameter(false) } }
              icon={<ContentAdd />}
            />
            <RaisedButton label="Reset"
              onClick={this.reset}
              style={styles.saveButton}
              icon={<AvReplay />}
            />
          </div>
        </div>
      </PageBase>
    )
  }
}

export default AppForm;
import React, { Component } from 'react';
import AppForm from './AppForm';
import PageBase from '../components/PageBase';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import styles from './FormsStyle';
import RaisedButton from 'material-ui/RaisedButton';
import AvNotInterested from 'material-ui/svg-icons/av/not-interested';
import Data from '../data'
class ScreenForm extends Component {

  min = 1;
  max = 4;

  constructor(props) {
    super(props);
    this.state = {
      errorMessageRows: undefined,
      errorMessageCols: undefined
    };
    this.cancelForm = this.cancelForm.bind(this);
    this.checkRows = this.checkRows.bind(this);
    this.checkCols = this.checkCols.bind(this);
    this.onAnimationChange = this.onAnimationChange.bind(this);
  }

  checkRows(event) {
    let value = parseInt(event.target.value, 10);
    if (value > this.max || value < this.min) {
      this.setState({
        errorMessageRows: `${value} is invalid number for rows. Maximum is ${this.max}`
      });
      return;
    }
    this.props.onRowsChange(value);
    this.setState({
      errorMessageRows: undefined
    });
  }

  checkCols(event) {
    let value = parseInt(event.target.value, 10);
    if (value > this.max || value < this.min) {
      this.setState({
        errorMessageCols: `${value} is invalid number for cols. Maximum is ${this.max}`
      });
      return;
    }
    this.props.onColsChange(value);
    this.setState({
      errorMessageCols: undefined
    });
  }

  onAnimationChange(event, index, value) {
    this.props.onChange("screen", "animation-type", value)
  }

  cancelForm() {
    this.props.showScreenForm(false, {});
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.props.screen.rows; i++) {
      let cells = [];
      for (let j = 0; j < this.props.screen.cols; j++) {
        let num = this.props.screen.cols * i + j;
        let name = this.props.screen.apps[num]
          ? this.props.screen.apps[num].type
          : undefined;
        if (!name) {
          name = <i className="fa fa-plus-circle" style={styles.plusCircle} />;
        }
        cells.push(
          <td className="text-center pointer" key={num}
            onClick={() => this.props.showAppForm(true, this.props.screen.apps[num])}>
            {name}
          </td>
        )
      }
      rows.push(<tr key={i}>{cells}</tr>)
    }
    return (
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12">
          <PageBase title="Screen">
            <div>
              <TextField
                id="type"
                name="Type"
                floatingLabelText="Type"
                fullWidth={true}
                type="text"
                value={this.props.screen.type}
                disabled={true}
              />
              <SelectField
                floatingLabelText="Animation Type"
                value={this.props.screen["animation-type"]}
                onChange={this.onAnimationChange}
                fullWidth={true}
              >
                {Data.animationType}
              </SelectField>
              <TextField
                floatingLabelText="Rows:"
                fullWidth={true}
                type="number"
                hintText="Enter number of rows. Such as: 1,2,3..."
                value={this.props.screen.rows}
                min={this.min}
                max={this.max}
                errorText={this.state.errorMessageRows}
                onChange={this.checkRows}
              />
              <TextField
                floatingLabelText="Columns:"
                fullWidth={true}
                type="number"
                hintText="Enter number of Columns. Such as: 1,2,3..."
                value={this.props.screen.cols}
                min={this.min}
                max={this.max}
                errorText={this.state.errorMessageCols}
                onChange={this.checkCols}
              />
              <div>
                <label style={styles.labelApps}>Apps:</label>
                <div className="col-md-12 text-left">
                  <table className="table table-bordered">
                    <tbody>
                      {rows}
                    </tbody>
                  </table>
                </div>
              </div>
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
        </div>
        <div className="col-md-6 col-sm-12 col-xs-12" >
          {
            this.props.activatedAppForm
              ? <AppForm data={this.props.appData}
                showAppForm={this.props.showAppForm}
                onChange={this.props.onChange}
                addParameter={this.props.addParameter} />
              : undefined
          }
        </div>
      </div>
    )
  }
}

export default ScreenForm;
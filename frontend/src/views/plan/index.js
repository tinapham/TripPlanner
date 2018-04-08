import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PageBase from '../../components/page-base/PageBase';
import ContentSave from 'material-ui/svg-icons/content/save';
import styles from './styles';

class MyPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
        this.savePlan = this.savePlan.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }

    savePlan() {
        if (this.state.name === "") {
            this.setState({
                nameErrorMessage: "This field is required"
            });
            return;
        }
        this.props.save(this.state);

    }

    onNameChange(event) {
        this.setState({
            name: event.target.value,
            nameErrorMessage: undefined
        });
    }

    render() {
        return (
            <div>
                <div className="banner" style={styles.banner}/>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <PageBase title="Hello">
                            <div className="col-md-10 col-sm-12 col-xs-12">
                                <TextField
                                    id="name"
                                    name="name"
                                    floatingLabelText="Name"
                                    fullWidth={true}
                                    type="text"
                                    hintText="eg: Summer Trip, ..."
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                    ref="name"
                                    errorText={this.state.nameErrorMessage}
                                />
                            </div>
                            <div className="col-md-2 col-sm-12 col-xs-12" style={styles.buttons}>
                                <RaisedButton label="Create"
                                              onClick={this.savePlan}
                                              style={styles.saveButton}
                                              type="submit"
                                              icon={<ContentSave/>}
                                              secondary={true}/>
                            </div>
                        </PageBase>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyPlan;
import React, { Component } from 'react';
import ScreenForm from './ScreenForm';
import '../dashboard/AdminManagement.css';
import update from 'immutability-helper'
import LabelContainer from '../dndScreenLabel/LabelContainer';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentSave from 'material-ui/svg-icons/content/save';
import AvNotInterested from 'material-ui/svg-icons/av/not-interested';
import styles from './FormsStyle'

class ScreenPlayForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state ? this.props.location.state.data.id : undefined,
            name: this.props.location.state ? this.props.location.state.data.name : "",
            "display-time": this.props.location.state ? this.props.location.state.data["display-time"] : 1,
            screens: this.props.location.state ? this.props.location.state.data.screens : [],
            activatedScreenForm: false,
            idScreens: this.getIdScreens(this.props.location.state ? this.props.location.state.data.screens : []),
            errorMessage: undefined
        }
        this.showScreenForm = this.showScreenForm.bind(this);
        this.showAppForm = this.showAppForm.bind(this);
        this.addScreen = this.addScreen.bind(this);
        this.saveScreenPlay = this.saveScreenPlay.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDisplayTimeChange = this.onDisplayTimeChange.bind(this);
        this.inputListener = this.inputListener.bind(this);
        this.deleteScreen = this.deleteScreen.bind(this);
        this.onRowsChange = this.onRowsChange.bind(this);
        this.onColsChange = this.onColsChange.bind(this);
        this.updateScreen = this.updateScreen.bind(this);
    }

    getIdScreens(screens) {
        let idScreens = []
        if (screens.length > 0) {
            screens.map((screen, i) => {
                idScreens.push(screen.id)
            })
        }
        return idScreens;
    }

    updateScreen(dragIndex, hoverIndex) {
        const { screens } = this.state
        const dragScreen = screens[dragIndex]
        this.setState(
            update(this.state, {
                screens: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragScreen]],
                },
            }),
        )
    }

    showScreenForm(value, screen) {
        this.setState({
            activatedScreenForm: value,
            screen: screen,
            activatedAppForm: false,
            app: {}
        });
    }

    showAppForm(value, app) {
        if (app.parameters === undefined) {
            app.parameters = [];
        }
        this.setState({
            activatedAppForm: value,
            app: app
        });
    }

    addScreen() {
        let defaultScreen = {
            id: -Number(new Date()),
            type: "Grid-layout",
            "animation-type": "slide-right",
            rows: 1,
            cols: 1,
            apps: [{
                type: "",
                parameters: []
            }]
        };
        this.setState({
            screens: [...this.state.screens, defaultScreen],
            activatedScreenForm: true,
            screen: defaultScreen,
            activatedAppForm: false,
            app: {}
        });
    }

    saveScreenPlay() {
        if (this.state.name === "") {
            this.setState({
                errorMessage: "This field is required"
            })
        } else {
            let { screens } = this.state;
            screens.map((screen, i) => {
                screen.id = this.state.idScreens[i]
            })
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

  onDisplayTimeChange(event){
    this.setState({
      "display-time": event.target.value
    });
  }

    deleteScreen(position) {
        this.setState({
            screens: [...this.state.screens.slice(0, position),
            ...this.state.screens.slice(position + 1)],
            activatedScreenForm: false,
        });
    }

    inputListener(type, key, value) {
        let data = this.state[type];
        data[key] = value;
        if (type === "screen") {
            this.setState(
                update(this.state, {
                    screen: {
                        $set: data
                    },
                }),
            );
        } else {
            this.setState(
                update(this.state, {
                    app: {
                        $set: data
                    },
                }),
            );

        }
    }

    async rowsColsListener(key, value) {
        let data = this.state.screen;
        data[key] = value;
        await this.setState({
            screen: data
        });
        let screen = this.state.screen;
        let currentSize = this.state.screen.apps.length;
        let futureSize = this.state.screen.rows * this.state.screen.cols;
        if (futureSize > currentSize) {
            for (let i = currentSize; i < futureSize; i++) {
                let app = {
                    type: "",
                    parameters: []
                }
                screen.apps = [...screen.apps, app];
            }
        }
        if (futureSize < currentSize) {
            for (let i = futureSize; i < currentSize; i++) {
                screen.apps = [...screen.apps.slice(0, screen.apps.length - 1)]
            }
        }
        this.setState(
            update(this.state, {
                screen: {
                    apps:{ $set: screen.apps}
                },
            }),
        )
    }
    async onRowsChange(value){
        await this.rowsColsListener('rows', value);
    }

    async onColsChange(value){
        await this.rowsColsListener('cols', value);
    }
    render() {
        return (
            <div>
                <PageBase title="ScreenPlay"
                    navigation="Application / Screen Page">
                    <div>
                        <TextField
                            id="nameScreenPlay"
                            name="name"
                            floatingLabelText="Name"
                            fullWidth={true}
                            type="text"
                            hintText="Such as: Danang, Hamburg, ..."
                            value={this.state.name}
                            onChange={this.onNameChange}
                            ref="name"
                            errorText={this.state.errorMessage}
                        />

                        <TextField
                            floatingLabelText="Period Time"
                            fullWidth={true}
                            type="number"
                            hintText="Enter Display Time (second). Such as: 10, 20, ..."
                            value={this.state["display-time"]}
                            min="1"
                            onChange={this.onDisplayTimeChange}
                            ref="displayTime"
                        />
                        <div style={styles.toggleDiv}>
                            <label>Screens:</label>
                            <div className="text-left">
                                <div className="tags">
                                    <LabelContainer screens={this.state.screens}
                                        deleteScreen={this.deleteScreen}
                                        onClick={this.showScreenForm}
                                        updateScreen={this.updateScreen} />
                                </div>
                            </div>
                        </div>
                        <RaisedButton
                            label="Add New Screen"
                            primary={true}
                            style={styles.buttonAdd}
                            onClick={this.addScreen}
                            icon={<ContentAdd />}
                        />
                        <Divider />

                        <div style={styles.buttons}>
                            <Link to="/admin">
                                <RaisedButton
                                    label="Cancel"
                                    icon={<AvNotInterested />}
                                />
                            </Link>

                            <RaisedButton label="Save"
                                onClick={this.saveScreenPlay}
                                style={styles.saveButton}
                                type="submit"
                                icon={<ContentSave />}
                                secondary={true} />
                        </div>
                    </div>
                </PageBase>
                <div>
                    {
                        this.state.activatedScreenForm
                            ? <ScreenForm activatedAppForm={this.state.activatedAppForm}
                                appData={this.state.app}
                                screen={this.state.screen}
                                onRowsChange={this.onRowsChange}
                                onColsChange={this.onColsChange}
                                showScreenForm={this.showScreenForm}
                                showAppForm={this.showAppForm}
                                onChange={this.inputListener}
                            />
                            : undefined
                    }
                </div>
            </div>
        )
    }
}

export default ScreenPlayForm;
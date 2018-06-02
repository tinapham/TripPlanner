import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PageBase from '../../components/page-base/index';
import ContentSave from 'material-ui/svg-icons/content/save';
import {Card, CardText, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import styles from './styles';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
        };
    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value,
            nameErrorMessage: undefined
        });
    };

    savePlan = () => {
        if (this.state.name === "") {
            this.setState({
                nameErrorMessage: "This field is required"
            });
            return;
        }
        this.props.save(this.state);

    };

    render() {
        return (
            <div>
                <div className="banner" style={styles.banner}/>
                <div className="row">
                    <div  className="col-md-12 col-sm-12 col-xs-12">
                        <PageBase title="Start planning your trip">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="col-md-10 col-sm-12 col-xs-12" style={{ paddingBottom: 50}}>
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
                                    <RaisedButton label="Create new plan"
                                                  onClick={this.savePlan}
                                                  style={styles.saveButton}
                                                  type="submit"
                                                  icon={<ContentSave/>}
                                                  secondary={true}/>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <Card>
                                        <CardMedia
                                            overlay={<CardTitle title="About Da Nang City"/>}
                                        >
                                            <img src={require('../../static/resources/image/plan1.jpg')} alt=""
                                                 style={{height : 300}}/>
                                        </CardMedia>
                                        <CardText>
                                            Da Nang city lies in the Midlands of Viet Nam, from which Ha Noi capitol in the north and Ho Chi Minh city in the south are almost equally spaced. Da Nang is also the central point connecting three UNESCO ...
                                        </CardText>
                                        <CardActions>
                                            <RaisedButton label="More details"/>
                                        </CardActions>
                                    </Card>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <Card>
                                        <CardMedia
                                            overlay={<CardTitle title="Da Nang Weather"/>}
                                        >
                                            <img src={require('../../static/resources/image/plan2.jpg')} alt=""
                                                 style={{height : 300}}/>
                                        </CardMedia>
                                        <CardText>
                                            Da Nang has a tropical monsoon climate, typically high and rather invariable temperature. There are two seasons annually: rainy season lasting from August to December and dry season from January to July.
                                        </CardText>
                                        <CardActions>
                                            <RaisedButton label="More details"/>
                                        </CardActions>
                                    </Card>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <Card>
                                        <CardMedia
                                            overlay={<CardTitle title="Da Nang History"/>}
                                        >
                                            <img src={require('../../static/resources/image/plan3.jpg')} alt=""
                                                 style={{height : 300}}/>
                                        </CardMedia>
                                        <CardText>
                                            In the middle of the 16th century, when Hoi An was a busy center of the south, Danang was only a small port for goods in transit and ship repair. It gradually developed into a commercial port replacing ...
                                        </CardText>
                                        <CardActions>
                                            <RaisedButton label="More details"/>
                                        </CardActions>
                                    </Card>
                                </div>
                            </div>
                        </PageBase>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {green600, white} from "material-ui/styles/colors";
import RaisedButton from 'material-ui/RaisedButton';
import axios from "axios/index";

class CreditCard extends Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "api/plan/token/";

    constructor(props) {

        super(props);

        this.state = {
            finished: false,
            cardNumber: '2831 3023 9012 2016',
            cvc: '582',
            expireDate: '02/19',
            cardOwner: 'Marc Lewis',
        };

        this.pay = this.pay.bind(this);
    }

    async pay() {

        let response = await axios.get(this.url_backend + this.props.id);

        if (response.data) {
            this.props.getToken(response.data);
        }

    };

    render() {
        return (
            <Card>
                <CardHeader
                    title="CREDIT/ DEBIT CARD"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <TextField
                        floatingLabelText="Card Number"
                        fullWidth={true}
                        type="text"
                        value={this.state.cardNumber}
                    />
                    <TextField
                        floatingLabelText="Expire Date"
                        fullWidth={true}
                        type="text"
                        value={this.state.expireDate}
                    />
                    <TextField
                        floatingLabelText="CVC"
                        fullWidth={true}
                        type="text"
                        value={this.state.cvc}
                    />
                    <TextField
                        floatingLabelText="Card Holder"
                        fullWidth={true}
                        type="text"
                        value={this.state.cardOwner}
                    />
                    <RaisedButton
                        label='Pay Now'
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.pay}
                        backgroundColor={green600}
                        labelColor={white}
                        style={{marginLeft: '90%'}}
                    />
                </CardText>
            </Card>
        );
    }
}

export default CreditCard;
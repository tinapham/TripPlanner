import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import styles from './styles';

class CurrentAttractionCard extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            param: this.props.attraction.description.split('*')
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.attraction !== prevProps.attraction) {
            this.setState({
                param: this.props.attraction.description.split('*')
            });
        }
    }

    render() {
        console.log(this.state);
        return (

            <Card style={styles.gridList}>
                <CardMedia
                    overlay={<CardTitle title={this.props.attraction.name}
                                        subtitle={this.props.attraction.address}/>}
                >
                    <img src={require(`../../static/resources/image/attraction/${this.props.attraction.id}.jpg`)} alt=""/>
                </CardMedia>
                <CardTitle title="Description"/>
                <CardText>
                    {this.state.param.map((para, index) => {
                        return <p key={index}>{para.trim()}</p>;
                    })}
                </CardText>
            </Card>
        );
    }

}

export default CurrentAttractionCard;
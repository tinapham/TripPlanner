import React from 'react';
import {Card, CardMedia, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import styles from './styles';

class CurrentAttractionCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            param: this.props.attraction.description.split('*')
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.attraction !== prevProps.attraction) {
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
                    children=
                        {
                            <IconButton>
                                {
                                    this.props.attraction.favorite.choose ?
                                        <Star color="white"/> : <StarBorder color="white"/>
                                }
                            </IconButton>
                        }
                    overlay={<CardTitle title={this.props.attraction.name}
                                        subtitle={this.props.attraction.address}/>}
                >
                    <img src={require(`../../static/resources/image/attraction/${this.props.attraction.id}.jpg`)}
                         alt=""/>
                </CardMedia>
                <CardText>
                    <IconButton>
                        {
                            this.props.attraction.favorite.choose ?
                                <Star color="black"/> : <StarBorder color="black"/>
                        }
                    </IconButton>
                </CardText>
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
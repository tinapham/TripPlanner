import React from 'react';
import {Card, CardMedia, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';

class CurrentAttractionCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            param: this.props.attraction.description.split('*'),
            isChoose: this.props.attraction.favorite.choose,
            comments: this.props.attraction.feedbacks,
            rating: 0,
        };
        this.addFavorite = this.addFavorite.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.attraction !== prevProps.attraction) {
            this.setState({
                param: this.props.attraction.description.split('*'),
                isChoose: this.props.attraction.favorite.choose,
                comments: this.props.attraction.feedbacks,
            });
        }
    }

    async addFavorite() {
        await this.setState({
            isChoose: !this.state.isChoose
        });
        this.props.addFavorite(this.props.attraction.id);
    };

    render() {
        return (
            <Card style={styles.gridList}>
                <CardMedia
                    overlay={<CardTitle title={this.props.attraction.name}
                                        subtitle={this.props.attraction.address}/>}
                >
                    <img src={require(`../../static/resources/image/attraction/${this.props.attraction.id}.jpg`)}
                         alt=""/>
                </CardMedia>
                <CardText>
                    <IconButton onClick={this.addFavorite}>
                        {
                            this.state.isChoose ?
                                <Star color="black"/> : <StarBorder color="black"/>
                        }
                    </IconButton>
                    Add to favourite
                </CardText>
                <CardTitle title="Description"/>
                <CardText>
                    <p>* You have visited
                        {this.props.attraction.favorite ? ' '+this.props.attraction.favorite.score + ' ' : ' 0 '}
                         time(s)
                    </p>
                    {this.state.param.map((para, index) => {
                        return <p style={{ textAlign: 'justify'}} key={index}>{para.trim()}</p>;
                    })}
                </CardText>
                <Divider/>
                <CardTitle title="Comment"/>
                <CardText>
                    <Card>
                        <CardText>
                            <TextField
                                hintText="Please leave a feedback"
                                fullWidth={true}
                                multiLine={true}
                                rows={1}
                            />
                        </CardText>
                        <CardActions>
                            <RaisedButton label="Send" secondary={true} style={{marginLeft: '70%'}}/>
                        </CardActions>
                    </Card>
                </CardText>
                <CardText>
                    {this.state.comments.map((param, index) => {
                        return <Card key={index} style={{marginBottom: 15}}>
                            <CardHeader
                                avatar={require(`../../static/resources/image/avatar.jpeg`)}
                                title={param.username}
                                subtitle={param['created-at']}
                            />
                            <CardText>
                                {param.content}
                            </CardText>
                        </Card>
                    })}
                </CardText>
            </Card>
        );
    }

}

export default CurrentAttractionCard;
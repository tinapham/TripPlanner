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
            content: undefined,
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

    onContentChange = (event) => {
        this.setState({
            content: event.target.value
        });
    };

    toLocalDate = (date) => {
        let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    };

    saveFeedback = () => {
        let data = {
            content: this.state.content,
            rating: this.state.rating,
            username: this.props.username,
            "created-at": this.toLocalDate(new Date())
        };
        this.props.addFeedback(data);
        this.setState({
            comments: [...this.state.comments, data],
            content: '',
        });
    };

    render() {
        return (
            <Card style={styles.gridList}>
                <CardMedia
                    overlay={<CardTitle title={this.props.attraction.name}
                                        subtitle={this.props.attraction.address}
                    />}
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
                    {
                        this.props.attraction.type ?
                            <p>* Type:
                                {' ' + this.props.attraction.type}
                            </p> : undefined
                    }
                    <p>* You have visited
                        {this.props.attraction.favorite ? ' ' + this.props.attraction.favorite.score + ' ' : ' 0 '}
                        time(s)
                    </p>
                    {this.state.param.map((para, index) => {
                        return <p style={{textAlign: 'justify'}} key={index}>{para.trim()}</p>;
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
                                value={this.state.content}
                                onChange={this.onContentChange}
                            />
                        </CardText>
                        <CardActions>
                            <RaisedButton label="Send" secondary={true}
                                          style={{marginLeft: '70%'}}
                                          onClick={this.saveFeedback}
                            />
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
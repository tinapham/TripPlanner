import React from 'react';
import ChatBot from 'react-simple-chatbot';
import {ThemeProvider} from 'styled-components';
import {Link} from 'react-router-dom';


class Chatbot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            plan: this.props.plans ? this.props.plans[this.props.plans.length - 1] : {},
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.plans !== this.props.plans) {
            this.setState({plan: this.props.plans[this.props.plans.length - 1]});
        }
    }

    render() {
        console.log(this.state.plan.name);
        const theme = {
            background: '#f5f8fb',
            fontFamily: 'Helvetica Neue',
            headerBgColor: 'rgb(30, 136, 229)',
            headerFontColor: '#fff',
            headerFontSize: '15px',
            botBubbleColor: 'rgb(30, 136, 229)',
            botFontColor: '#fff',
            userBubbleColor: '#fff',
            userFontColor: '#4a4a4a',
        };

        let steps = [
            {
                id: '1',
                message: `What would you want to know?`,
                trigger: '2',
            },
            {
                id: '2',
                options: [
                    {value: 1, label: 'My Plans', trigger: '3'},
                    {value: 2, label: 'Food & Drink', trigger: '4'},
                    {value: 3, label: 'Attractions', trigger: '5'},
                ],
            },
            {
                id: '3',
                component: (
                    <div>
                        {this.state.plan? this.state.plan.name:""}
                    </div>
                ),
                trigger: '2',
            },
            {
                id: '4',
                component: (
                    <Link to="/home/explore">
                        Explore
                    </Link>
                ),
                trigger: '2',
            },
            {
                id: '5',
                message: 'Awesome! You are a telepath!',
                trigger: '2',
                // end: true,
            },

        ];

        return (
            <ThemeProvider theme={theme}>
                <ChatBot
                    handleEnd={this.handleEnd}
                    headerTitle='Instruction'
                    floating={true}
                    style={{
                        margin: 0,
                        top: 'auto',
                        right: 25,
                        bottom: 50,
                        left: 'auto',
                        position: 'fixed',
                        color: 'blue',
                    }}
                    steps={steps}
                />
            </ThemeProvider>
        );
    }
}

export default Chatbot;

import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import MultipleScreen from '../multipleScreen/MultipleScreen';
import './TogglePages.css';

class TogglePages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screens: this.getPages(),
      displayTime: this.getTime(),
      animations: this.getAnimations()
    }
  }

  getTime() {
    return this.props.url['display-time'];
  }

  getPages() {
    let pages = [];
    let url = this.props.url['screens'];
    for (let i = 0; i < url.length; i++) {
      pages.push(<MultipleScreen key={i}
        rows={url[i].rows}
        cols={url[i].cols}
        apps={url[i].apps}
      />)
    }
    return pages;
  }

  getAnimations() {
    let animation = [];
    let url = this.props.url['screens'];
    for (let i = 0; i < url.length; i++) {
      animation.push(url[i]['animation-type']);
    }
    return animation;
  }

  timer() {
    this.setState({
      screens: [...this.state.screens.slice(1), this.state.screens[0]],
      animations: [...this.state.animations.slice(1), this.state.animations[0]]
    })
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), this.state.displayTime * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  
  render() {
    var Child = this.state.screens[0];
    return (
      <div>
        <CSSTransitionGroup
          className="animation-container"
          component="div"
          transitionName={this.state.animations[0]}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {Child}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default TogglePages;
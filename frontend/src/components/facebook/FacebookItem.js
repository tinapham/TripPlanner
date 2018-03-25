import React, { Component } from 'react';
import { getFacebookPostStyle } from './FacebookStyle';

class FacebookItem extends Component {

  loadMediaItem() {
    return this.props.item.type === "video"
      ? <iframe
        title="fb-video"
        className="embed-responsive-item fb-video"
        src={this.props.item.source}
      />
      : <img
        className="fb-photo"
        src={this.props.item.full_picture}
        alt=""
      />;
  }

  render() {
    let style = getFacebookPostStyle(this.props.item.message || ' ', (this.props.item.full_picture !== undefined), this.props.heightSize, this.props.widthSize);
    return (
      <div className="col-sm-6 fb-post">
        <div className="panel panel-default" style={{ height: '100%', marginTop: '4%', marginBottom: '0%' }}>
          <div className="panel-heading clearfix" style={style.postHeader}>
            {this.props.item.name}
            <span className="pull-right" style={{ fontWeight: 'bold' }}>{this.props.item.created_time.substring(0, 10)}</span>
          </div>
          <div className="panel-body" style={style.postBody}>
            <p style={style.postDesc}>{this.props.item.message}</p>
            <div className="media" style={style.postMedia}>
              {this.loadMediaItem()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FacebookItem;
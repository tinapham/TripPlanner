import React from 'react';

const ErrorMessage = (props) => {
  if (props.message !== "") {
    return (
      <div className="alert alert-danger">
        {props.message}
      </div>
    );
  } else {
    return (
      <div/>
    );
  }
}

export default ErrorMessage;
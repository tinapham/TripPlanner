import React from 'react';

const ScreenLabel = (props) => {
  let name = props.screen.type;
  if (props.screen.apps.length === 1 && props.screen.apps[0].type !== "") {
    name = props.screen.apps[0].type;
  }
  const deleteScreen = () => {
    props.deleteScreen(props.index);
  }
  return (
    <span className="label label-success">
      <strong onClick={() => props.onClick(true, props.screen)}>
        {name}
      </strong>
      <button className="btn btn-success" onClick={deleteScreen}><i
          className="fa fa-times"/></button>
    </span>
  )
}

export default ScreenLabel;
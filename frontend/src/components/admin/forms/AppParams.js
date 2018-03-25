import React from 'react';
import TextField from 'material-ui/TextField';

const AppForm = (props) => {
  return (
    <div className="row">
      <div className="col-md-4">
        <TextField
          id="Key"
          name="Key"
          floatingLabelText="Key"
          fullWidth={true}
          type="text"
          value={props.parameter.key}
          onChange={evt => props.onChange(props.index, true, evt.target.value)}
        />
      </div>
      <div className="col-md-8">
        <TextField
          id="Value"
          name="Value"
          floatingLabelText="Value"
          fullWidth={true}
          type="text"
          onChange={evt => props.onChange(props.index, false, evt.target.value)}
          value={props.parameter.value}
        />
      </div>
    </div>
  )
}

export default AppForm;
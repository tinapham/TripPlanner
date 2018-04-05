import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import globalStyles from '../styles';

const PageBase = (props) => {

    const {title, navigation} = props;
    const styles ={
      screenplay_title: {
        color: `#023370`,
        textAlign: `center`,
        paddingBottom: `1%`,
        fontSize: `35px`,
      }
    }
    return (
      <div>
        <span style={globalStyles.navigation}>{navigation}</span>

        <Paper style={globalStyles.paper}>
          <h3 style={styles.screenplay_title}>{title}</h3>

          <Divider/>
          {props.children}

          <div style={globalStyles.clear}/>

        </Paper>
      </div>
    );
};

PageBase.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  children: PropTypes.element
};

export default PageBase;

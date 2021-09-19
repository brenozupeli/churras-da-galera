import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import OutdoorGrillOutlinedIcon from '@material-ui/icons/OutdoorGrillOutlined';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '20vh',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#F1F1F1',
  },
}));

export default function BarbecueCard(props) {
  const classes = useStyles();
  const history = useHistory();

  function handleClick() {
    history.push(`/create`);
  }

  return (
    <Paper elevation={3} style={{ width: '90%' }}>
      <div className={classes.root} onClick={handleClick}>
        <OutdoorGrillOutlinedIcon
          fontSize='inherit'
          style={{
            color: 'black',
            width: '100px',
            height: '100px',
            backgroundColor: '#FFD836',
            borderRadius: '50%',
            padding: '5%',
            marginTop: '5%',
          }}
        />
        <div>
          <text>Adicionar Churras</text>
        </div>
      </div>
    </Paper>
  );
}

import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '20vh',
    width: '100%',
    margin: '0% 5%',
    position: 'relative',
    marginBottom: '10%',
    cursor: 'pointer',
  },
  header: {
    position: 'absolute',
    top: '5%',
  },
  participants_container: {
    position: 'absolute',
    bottom: '10%',
    left: '5%',
    display: 'flex',
    alignItems: 'center',
  },
  total_value_container: {
    position: 'absolute',
    bottom: '10%',
    right: '15%',
    display: 'flex',
    alignItems: 'center',
  },
  date_text: {
    fontFamily: 'Raleway',
    fontSize: '28px',
    fontStyle: 'normal',
    fontWeight: 800,
    lineHeight: '33px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  description_text: {
    fontFamily: 'Raleway',
    fontSize: '21px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '25px',
  },
  participants_text: {
    fontFamily: 'Raleway',
    fontSize: '21px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '25px',
    marginLeft: '10px',
  },
  total_text: {
    fontFamily: 'Raleway',
    fontSize: '21px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '25px',
    marginLeft: '10px',
  },
}));

export default function BarbecueCard(props) {
  const classes = useStyles();
  const history = useHistory();

  console.log(props.infos.date, new Date(props.infos.date));

  function handleClick() {
    history.push(`/details/${props.infos._id}`);
  }

  return (
    <Paper elevation={3} style={{ width: '90%' }}>
      <div className={classes.root} onClick={handleClick}>
        <div className={classes.header}>
          <div className={classes.date_container}>
            <text className={classes.date_text}>
              {new Date(props.infos.date).toLocaleDateString('pt-BR')}
            </text>
          </div>
          <div className={classes.description_container}>
            <text className={classes.description_text}>
              {props.infos.description}
            </text>
          </div>
        </div>

        <div className={classes.participants_container}>
          <PeopleOutlineOutlinedIcon style={{ color: '#FFD836' }} />
          <text className={classes.participants_text}>
            {props.infos.participants?.length}
          </text>
        </div>
        <div className={classes.total_value_container}>
          <MonetizationOnIcon style={{ color: '#FFD836' }} />
          <text className={classes.total_text}>
            {props.infos.participants
              ?.reduce((acc, item) => acc + item.value, 0)
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </text>
        </div>
      </div>
    </Paper>
  );
}

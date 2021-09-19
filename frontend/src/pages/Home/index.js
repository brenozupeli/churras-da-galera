import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import api from '../../services/api';
import BarbecueCard from '../../components/BarbecueCard';
import NewBarbecueCard from '../../components/NewBarbecueCard';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  banner: {
    height: '100vh',
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  title_container: {
    paddingTop: '10%',
    paddingBottom: '5%',
    backgroundColor: '#FFD836',
    width: '100%',
    textAlign: 'center',
  },
  title_text: {
    fontSize: '5vmin',
  },
  list_container: {
    width: '85%',
    marginTop: '-1%',
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [barbecuelist, setBarbecuelist] = useState([]);

  useEffect(() => {
    api.get('/barbecue/list').then(({ data }) => {
      setBarbecuelist(data);
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.title_container}>
        <text className={classes.title_text}>Agenda de Churras</text>
      </div>
      <div className={classes.list_container}>
        <div className={classes.list}>
          <Grid container className={classes.chipsBar}>
            {barbecuelist?.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <BarbecueCard infos={item} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3} key={'new'}>
              <NewBarbecueCard />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RemoveIcon from '@material-ui/icons/Remove';
import Checkbox from '@material-ui/core/Checkbox';
import api from '../../services/api';

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
  details_container: {
    width: '85%',
    marginTop: '-1%',
  },
  header_line: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  paper_root: {
    padding: '2%',
  },
  right_container: {
    display: 'flex',
    alignItems: 'center',
    width: '150px',
  },
  total_value_container: {
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
  participant_value: {
    float: 'right',
  },
  participant_value_paid: {
    float: 'right',
    textDecoration: 'line-through',
  },
  participan_line: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#FFD836',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
  },
  participan_name_container: {
    display: 'flex',
    alignItems: 'center',
  },
  add_participant_container: {
    display: 'flex',
  },
  add_participant_fields: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  add_participant_options: {
    width: '10%',
    float: 'left',
  },
  page_options_container: {
    display: 'flex',
    marginTop: '3%',
  },
}));

const YellowCheckbox = withStyles({
  root: {
    color: '#FFD836',
    '&$checked': {
      color: '#FFD836',
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

export default function SignInSide(props) {
  const history = useHistory();
  const classes = useStyles();
  const [details, setDetails] = useState({ participants: [] });
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    value: '0',
  });

  function handleCheckbox(index, checked) {
    details.participants[index].paid = checked;
    setDetails({ ...details });
  }

  function handleRemoveParticipant(index) {
    details.participants.splice(index, 1);
    setDetails({ ...details });
  }

  function handleChangeNewParticipant(event) {
    setNewParticipant((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function handleAddParticipant() {
    if (newParticipant.name === '') return;
    details.participants.push({
      name: newParticipant.name,
      value: parseFloat(newParticipant.value),
      paid: false,
    });
    setDetails({ ...details });
    setNewParticipant({ name: '', value: 0 });
  }

  async function handleSave() {
    console.log(details);
    if (!details.date || !details.description) return;
    await api.post('/barbecue/create', { ...details });
    backHome();
  }

  function backHome() {
    history.push('/home');
  }

  return (
    <div className={classes.root}>
      <div className={classes.title_container}>
        <text className={classes.title_text}>Agenda de Churras</text>
      </div>
      <div className={classes.details_container}>
        <Paper elevation={3}>
          <div className={classes.paper_root}>
            <div className={classes.header}>
              <div className={classes.header_line}>
                <div className={classes.date_container}>
                  <TextField
                    id='date'
                    label='Data'
                    type='date'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setDetails({ ...details, date: e.target.value });
                    }}
                  />
                </div>
                <div className={classes.right_container}>
                  <PeopleOutlineOutlinedIcon style={{ color: '#FFD836' }} />
                  <text className={classes.participants_text}>
                    {details.participants?.length ?? 0}
                  </text>
                </div>
              </div>
              <div className={classes.header_line}>
                <div className={classes.date_container}>
                  <TextField
                    id='standard-textarea'
                    label='Descrição'
                    multiline
                    style={{ width: '50vw' }}
                    onChange={(e) => {
                      setDetails({ ...details, description: e.target.value });
                    }}
                  />
                </div>
                <div className={classes.right_container}>
                  <MonetizationOnIcon style={{ color: '#FFD836' }} />
                  <text className={classes.total_text}>
                    {(details.participants ?? [])
                      .reduce((acc, item) => acc + item.value, 0)
                      .toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                  </text>
                </div>
              </div>
            </div>
            <div className={classes.paper_body_container}>
              {details.participants?.map((element, index) => (
                <div key={index} className={classes.participan_line}>
                  <div className={classes.participan_name_container}>
                    <FormControlLabel
                      control={
                        <YellowCheckbox
                          defaultChecked={element.paid}
                          onChange={(event) =>
                            handleCheckbox(index, event.target.checked)
                          }
                          name='paid'
                        />
                      }
                    />

                    <text className={classes.participant_name}>
                      {element.name}
                    </text>
                  </div>
                  <text
                    className={
                      element.paid
                        ? classes.participant_value_paid
                        : classes.participant_value
                    }
                  >
                    {element.value?.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                    <IconButton
                      aria-label='remove'
                      className={classes.margin}
                      onClick={() => handleRemoveParticipant(index)}
                    >
                      <RemoveIcon fontSize='inherit' style={{ color: 'red' }} />
                    </IconButton>
                  </text>
                </div>
              ))}
              <br />
              <br />
              Adicionar participante
              <div className={classes.add_participant_container}>
                <div className={classes.add_participant_fields}>
                  <TextField
                    id='name'
                    label='Nome'
                    name='name'
                    fullWidth
                    onChange={handleChangeNewParticipant}
                    value={newParticipant.name}
                  />
                  <TextField
                    id='value'
                    label='Valor'
                    name='value'
                    type='number'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ marginLeft: '5%' }}
                    onChange={handleChangeNewParticipant}
                    value={newParticipant.value}
                  />
                </div>
                <div className={classes.add_participant_options}>
                  <IconButton
                    aria-label='delete'
                    className={classes.margin}
                    onClick={handleAddParticipant}
                  >
                    <DoneIcon fontSize='inherit' />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    className={classes.margin}
                    onClick={() => setNewParticipant({ name: '', value: 0 })}
                  >
                    <ClearIcon fontSize='inherit' />
                  </IconButton>
                </div>
              </div>
              <div className={classes.page_options_container}>
                <Button variant='outlined' color='secondary' onClick={backHome}>
                  Cancelar
                </Button>
                <Button
                  variant='outlined'
                  style={{ marginLeft: '1%' }}
                  onClick={handleSave}
                >
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

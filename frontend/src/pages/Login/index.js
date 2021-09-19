import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFD836',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: '100%',
  },
  banner: {
    height: '100vh',
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  title_container: {
    marginTop: '10%',
    marginBottom: '5%',
  },
  title_text: {
    fontSize: '5vmin',
  },
  form_container: {
    backgroundColor: '#FFF',
    width: '40%',
    padding: '5% 1%',
    borderRadius: '5%',
  },
}));

const SubmitButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#000'),
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#333',
    },
  },
}))(Button);

export default function SignInSide() {
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/home');
    }
  }, [history]);

  useEffect(() => {
    setError(false);
    setHelperText('');
  }, [user, password]);

  async function handleLogin(e) {
    setLoading(true);
    e.preventDefault();
    setError(false);
    try {
      const { data } = await api.post('/login', {
        email: user,
        password,
      });
      localStorage.setItem('token', data.token);
      history.push('/home');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setHelperText('Falha no login, por favor verifique as credenciais.');
      setError(true);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.title_container}>
        <text className={classes.title_text}>Agenda de Churras</text>
      </div>
      <div className={classes.form_container}>
        <form className={classes.form} noValidate>
          <FormControl
            component='fieldset'
            error={error}
            className={classes.formControl}
          >
            <TextField
              error={error}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='user'
              label='E-mail'
              name='user'
              autoComplete='user'
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              error={error}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='senha'
              label='Senha'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText>{helperText}</FormHelperText>
            <SubmitButton
              type='submit'
              fullWidth
              variant='contained'
              color='#000'
              className={classes.submit}
              disabled={loading}
              onClick={handleLogin}
              style={{ height: 46 }}
            >
              {loading ? <CircularProgress size={25} /> : 'Entrar'}
            </SubmitButton>
          </FormControl>
          <div className={classes.register_container}>
            <text className={classes.register_text}>
              Não possui conta?{' '}
              <Link to='/cadastro' style={{ color: '#FFD836' }}>
                Cadastre-se
              </Link>
            </text>
          </div>
        </form>
      </div>
    </div>
  );
}

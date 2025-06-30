import React, { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { injectIntl, IntlShape } from 'react-intl';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Alert, Box, Stack, TextField } from '@mui/material';
import Link from '@mui/material/Link';
import { Container } from '@mui/system';

import { isValidEmail, isValidPassword } from '../../../helpers/sign';
import fetchData from '../../../utils/fetchData';

import {
  INVALID,
  NOT_MATCH,
  ROUTES,
  REGISTER_AS_ADMIN,
  ADMIN,
  USER,
  REGISTRATION_FAILED
} from '../../../constants';

interface SigInProps {
  intl: IntlShape;
}

const Login: React.FC<SigInProps> = ({ intl }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const { formatMessage } = intl;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError('');
      setEmailError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);
      if (!isValidEmail(email)) {
        setEmailError(true);
      }
      if (!isValidPassword(password)) {
        setPasswordError(true);
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError(true);
      }
      if (emailError || passwordError || confirmPasswordError) {
        throw new Error();
      }
      const data = { email, password, role: isAdmin ? ADMIN : USER };
      const user = await fetchData({ url: ROUTES.USER_REGISTER, method: 'post', data });
      if (user) {
        navigate(`/${ROUTES.LOGIN}`);
      }
    } catch (error: any) {
      // if (error?.response?.status === STATUS_CODES.CONFLICT) {
      setEmailError(true);
      // }
      setError(formatMessage({ id: REGISTRATION_FAILED }));
    }
  };

  return (
    <>
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          height: '95%'
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            width: '25%'
          }}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column'
              }}>
              <TextField
                id="standard-basic"
                label={formatMessage({ id: 'register.form.email' })}
                variant="standard"
                required
                error={emailError}
                value={email}
                helperText={emailError ? formatMessage({ id: INVALID }) : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label={formatMessage({ id: 'register.form.password' })}
                type={'password'}
                variant="standard"
                required
                error={passwordError}
                value={password}
                helperText={passwordError ? formatMessage({ id: INVALID }) : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label={formatMessage({ id: 'register.form.password.confirm' })}
                type={'password'}
                variant="standard"
                required
                error={confirmPasswordError}
                value={confirmPassword}
                helperText={confirmPasswordError ? formatMessage({ id: NOT_MATCH }) : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAdmin}
                      onChange={() => {
                        setIsAdmin(!isAdmin);
                      }}
                    />
                  }
                  label={formatMessage({ id: REGISTER_AS_ADMIN })}
                />
              </FormGroup>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginTop: '20px',
                  marginBottom: '20px'
                }}>
                {formatMessage({ id: 'register.form.register' })}
              </Button>
              <Link component={ReactRouterLink} to={`/${ROUTES.LOGIN}`} sx={{ margin: '0 auto' }}>
                {formatMessage({ id: 'login.form.login' })}
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default injectIntl(Login);

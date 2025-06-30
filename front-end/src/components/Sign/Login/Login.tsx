import React, { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { injectIntl, IntlShape } from 'react-intl';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Alert, Container, TextField } from '@mui/material';
import { Stack } from '@mui/system';

import { isValidEmail } from '../../../helpers/sign';
import fetchData from '../../../utils/fetchData';

import { INVALID, ROUTES } from '../../../constants';

interface SigInProps {
  intl: IntlShape;
}

const Login: React.FC<SigInProps> = ({ intl }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const { formatMessage } = intl;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError('');
      setEmailError(false);
      setPasswordError(false);
      if (!isValidEmail(email)) {
        setEmailError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
      if (!emailError && !passwordError) {
        const data = { email, password };
        const user = await fetchData({ url: ROUTES.AUTH_LOGIN, method: 'post', data });
        const { accessToken, refreshToken }: { accessToken: string; refreshToken: string } =
          user.data;
        if (accessToken) {
          localStorage.setItem('food-service-acces-token', accessToken);
          localStorage.setItem('food-service-refresh-token', refreshToken);
          navigate(`${ROUTES.HOMEPAGE}`);
        }
      }
    } catch (error: any) {
      setError(formatMessage({ id: error.response.data.message }));
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
                label={formatMessage({ id: 'login.form.email' })}
                variant="standard"
                required
                error={emailError}
                value={email}
                helperText={emailError ? formatMessage({ id: INVALID }) : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label={formatMessage({ id: 'login.form.password' })}
                type={'password'}
                variant="standard"
                required
                error={passwordError}
                value={password}
                helperText={passwordError ? formatMessage({ id: INVALID }) : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginTop: '20px',
                  marginBottom: '20px'
                }}>
                {formatMessage({ id: 'login.form.login' })}
              </Button>
            </Box>
          </form>
          <Link component={ReactRouterLink} to={`/${ROUTES.REGISTER}`} sx={{ margin: '0 auto' }}>
            {formatMessage({ id: 'register.form.register' })}
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default injectIntl(Login);

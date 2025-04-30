import { useRequest } from "../../hooks/useRequest";
import Router from "next/router";
import { useEffect } from "react";
import { Box, Container, Typography, CircularProgress, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const SignOut = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <Container component="main" maxWidth="xs" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <LogoutIcon sx={{ fontSize: 60, color: '#5D3FD3', mb: 2 }} />
        <Typography variant="h5" component="h1" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
          Signing you out...
        </Typography>
        <CircularProgress size={40} sx={{ color: '#5D3FD3' }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
          You'll be redirected to the homepage in a moment.
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignOut;

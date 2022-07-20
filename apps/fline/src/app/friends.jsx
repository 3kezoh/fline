import React, { Fragment, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';
import { useApi, useLocalStorage } from '@fline/hooks';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Friends() {
  const [{ data, isLoading, error }, requestApi] = useApi();
  const [{ data: friendData, isLoading: friendIsLoading, error: friendError }, requestFriendApi] = useApi();
  const [token] = useLocalStorage('accessToken');

  useEffect(() => {
    const getRealFriends = async () => {
      requestApi('/friend', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };

    getRealFriends();
  }, []);

  useEffect(() => {
    data && data.map( ({ friendId }) => {
      requestFriendApi(`/user/${friendId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  }, [data]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Paper square sx={{ pb: '50px' }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0 }}
          >
            Inbox
          </Typography>
          <List sx={{ mb: 2 }}>
            {friendData && Object.values(friendData).map(
              ({ id, email, firstName, lastName }) => (
                <Fragment key={id}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt="D" src={'/'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${firstName} ${lastName}`}
                      secondary={email}
                    />
                  </ListItem>
                </Fragment>
              )
            )}
          </List>
        </Paper>
      </ThemeProvider>
    </>
  );
}

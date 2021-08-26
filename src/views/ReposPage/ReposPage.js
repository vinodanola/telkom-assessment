import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import AppBar from '../../components/Surfaces/AppBar.js';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Alert from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    margin: 0
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  itemGrid: {
    background: '#f7f8ff'
  },
  title: {
    margin: '30px 20px',
    marginTop: '5px',
    textAlign: 'center'
  },
  listItemText: {
    wordWrap: 'break-word',
    width: '70%',
    fontSize: '12px'
  },
  rootAvatar: {
    display: 'block',
    '& > *': {
      margin: theme.spacing(1)
    },
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(13)
  },
  avatar: {
    display: 'inline-flex',
    // display: 'inline-box',
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  avatarDialog: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  small: {
    width: '30px',
    height: '30px'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -8,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: '10px'
  }
}))(Badge);

const peoples = ['user01@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, peoples, title } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <List>
        {peoples.map(people => (
          <ListItem
            button
            onClick={() => handleListItemClick(people)}
            key={people}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatarDialog}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={people} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default function InteractiveList() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [valueSearch, setValueSearch] = React.useState('facebook');

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [peoples, setPeoples] = React.useState([]);
  const timeoutRef = useRef(null);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = repo => {
    setOpen(true);
    // fetch(
    //   'https://api.github.com/repos/' +
    //     valueSearch +
    //     '/' +
    //     repo +
    //     '/contributors'
    // )
    //   .then(res => res.json())
    //   .then(
    //     result => {
    //       setIsLoaded(true);
    //       setPeoples(result);
    //       setOpen(true);
    //     },
    //     error => {
    //       setIsLoaded(true);
    //       setError(error);
    //     }
    //   );
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;

      fetch('https://api.github.com/users/' + valueSearch)
        .then(res => res.json())
        .then(
          result => {
            setIsLoaded(true);
            setUsers(result);
          },
          error => {
            setIsLoaded(true);
            setError(error);
          }
        );

      fetch('https://api.github.com/users/' + valueSearch + '/repos')
        .then(res => res.json())
        .then(
          result => {
            setIsLoaded(true);
            setItems(result);
          },
          error => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }, 1000);
  }, [valueSearch]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.root}>
        <AppBar
          valueSearch={valueSearch}
          handleChangeSearch={e => setValueSearch(e.target.value)}
        />
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          peoples={peoples}
        />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={8} className={classes.itemGrid}>
            <div className={classes.rootAvatar} xs={12} md={8}>
              {users && (
                <Avatar
                  alt={users.login}
                  src={users.avatar_url}
                  className={classes.avatar}
                />
              )}
            </div>
            <Typography variant="h6" className={classes.title}>
              {valueSearch + (valueSearch ? "'s repositories" : '')}
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {!items.id && items.message ? (
                  <Alert severity="error">{items.message}</Alert>
                ) : (
                  ''
                )}
                {items.length > 0 &&
                  items.map(item => (
                    <ListItem key={item.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.full_name}
                        secondary={
                          <div className={classes.listItemText}>
                            {item.description}
                          </div>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Stargazers" placement="top">
                          <IconButton>
                            <StyledBadge
                              badgeContent={item.stargazers_count}
                              color="primary"
                            >
                              <StarIcon />
                            </StyledBadge>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Watchers" placement="top">
                          <IconButton>
                            <StyledBadge
                              badgeContent={item.watchers_count}
                              color="primary"
                            >
                              <VisibilityIcon />
                            </StyledBadge>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download" placement="top">
                          <IconButton
                            edge="end"
                            target="_blank"
                            href={
                              'https://api.github.com/repos/' +
                              valueSearch +
                              '/' +
                              item.name +
                              '/' +
                              'zipball'
                            }
                          >
                            <CloudDownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

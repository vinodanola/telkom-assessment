import React, { useState, useEffect } from 'react';
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    margin: 0
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: '50px 20px'
  },
  listItemText: {
    wordWrap: 'break-word',
    width: '70%'
  },
  rootAvatar: {},
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

export default function InteractiveList() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [valueSearch, setValueSearch] = React.useState('facebook');

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
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
  }, [valueSearch]);

  console.log(items);

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
          defaultValue="octokit"
        />
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              {valueSearch + "'s"} repositories
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {!items.id ? <span>{items.message}</span> : ''}
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
                          <IconButton edge="end">
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

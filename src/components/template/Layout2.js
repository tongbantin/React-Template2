import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import * as Icon from '@material-ui/icons';
import {  Link } from "react-router-dom";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  statusbar: {

      padding:'10'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function PermanentDrawerLeft(props) {
  const classes = useStyles();
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <div className={classes.root}>
        
      <CssBaseline />
          
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >--LOGO--
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[
          {text:'Form',link:'/form2',icon:''}
          ,{text:'MultiForm',link:'/form',icon:''}
          ,{text:'Table',link:'/table',icon:''}
          ,{text:'Logout',link:'/',icon:''}
        ].map((el) => (
            <ListItem button component={Link} to={el.link} key={el.text} >
              <ListItemIcon> <Icon.AllInboxOutlined/></ListItemIcon>
              <ListItemText primary={el.text} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      <main className={classes.content}>
            <div className={classes.toolbar} >
                <Typography component="h2" color="textPrimary">Header</Typography>
            </div>
            <div className={classes.statusbar} >
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" href="/" onClick={handleClick}>
                <HomeIcon className={classes.icon} />
                Home
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                Form
                </Link>
                <Typography color="textPrimary">Test</Typography>
            </Breadcrumbs>
            </div>
            
        {props.children}
      </main>
    </div>
  );
}

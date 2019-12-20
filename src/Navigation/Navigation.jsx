import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ButtonWithMenu from '../Common/ButtonWithMenu';
import Link from '../shared/Link/Link';
import './Navigation.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation({isLogged}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // const handleChange = event => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className="navbar" position="static">
        <Toolbar>
          <ButtonWithMenu title={<MenuIcon />}>     

            {!!isLogged &&<MenuItem>><Link to="/tasks">Tasks</Link></MenuItem>}
            {!isLogged &&<MenuItem><Link to="/login">Login</Link></MenuItem>}
            {!isLogged &&<MenuItem ><Link to="/register">Register</Link></MenuItem>}
          </ButtonWithMenu>
          {!isLogged && <Button ><Link className="btn-nav" to="/login">Login</Link></Button>}
          {!isLogged && <Button ><Link className="btn-nav" to="/register">Register</Link></Button>}
          <Typography variant="h6" className="nav-title">
              
          </Typography>
          {isLogged && (
            <div>
              <Button ><Link className="btn-nav" to="/logout">Logout</Link></Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem><Link to="/profile">My Profile</Link></MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

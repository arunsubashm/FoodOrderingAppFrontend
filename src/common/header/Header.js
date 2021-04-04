import React, { Component } from 'react';
import './Header.css'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    input: {
      color: "white"
    },
    underlineInput: {
        "&:after": {
            // focused
            borderBottom: `2px solid white`
        },
    }
  };

class Header extends Component {

    constructor() {
        super();
    }

    render() {
        const { classes } = this.props;

        return (
        <div className="header">
            <div className="header-logo">
            <FastfoodIcon htmlColor="white" fontSize="large"/>
            </div>
            <div className="header-search">
                <InputLabel htmlFor="search"></InputLabel>
                <Input classes={{input: classes.input, underline: classes.underlineInput }} id="search" fullWidth="true" placeholder="Search by Restaurant Name" aria-describedby="my-helper-text" startAdornment={
                <InputAdornment position="start"><SearchIcon htmlColor="white"/></InputAdornment> } /> 
            </div>
            <div className="header-login">
                <div className="login-box">
                    <AccountCircleIcon fontSize="large"/>
                    <Button>Login</Button>
                </div>
            </div>
        </div>
        )
    }
}

export default withStyles(styles)(Header)
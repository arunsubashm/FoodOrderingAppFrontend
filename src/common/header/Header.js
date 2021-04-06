import React, { Component } from 'react';
import './Header.css'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { blue } from '@material-ui/core/colors';

const styles = {
    input: {
      color: "white"
    },
    underlineInput: {
        "&:after": {
            // focused
            borderBottom: `2px solid white`
        },
    },
    app: {
        backgroundColor: blue,
    },
  };

class Header extends Component {

    constructor() {
        super();
        this.state = {
            searchTerm:'',
            modalIsOpen:false,
            tabIndex:0,
        }
        this.searchHandler = this.searchHandler.bind(this);
    }

    /* Collect the search key and send to Home Page */
    searchHandler = (e) => {
        this.setState({searchTerm : e.target.value});
        //Pass the event to avoid delay due to setState
        this.props.onSearchSubmit(e);
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };
    
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    handleChange = (event, newValue) => {
        this.setState({tabIndex: newValue});
    };

    render() {
        const { classes } = this.props;

        return (
        <div className="header">
            <div className="header-logo">
            <FastfoodIcon htmlColor="white" fontSize="large"/>
            </div>
            <div className="header-search">
                <InputLabel htmlFor="search"></InputLabel>
                <Input onChange={this.searchHandler} classes={{input: classes.input, underline: classes.underlineInput }} id="search" fullWidth="true" placeholder="Search by Restaurant Name" aria-describedby="my-helper-text" startAdornment={
                <InputAdornment position="start"><SearchIcon htmlColor="white"/></InputAdornment> } /> 
            </div>
            <div className="header-login">
                <div className="login-box">
                    <AccountCircleIcon fontSize="large"/>
                    <Button onClick={this.openModal}>Login</Button>
                    <Modal className = {classes.root, "myModal"} isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                        <AppBar position="static">
                            <Tabs onChange={this.handleChange}>
                                <Tab label="LOGIN"></Tab>
                                <Tab label="SIGNUP"></Tab>
                            </Tabs>
                        </AppBar>
                        <div role="tabpanel" hidden={this.state.tabIndex !== 0}>Login</div>
                        <div role="tabpanel" hidden={this.state.tabIndex !== 1}>Signup</div>
                    </Modal>
                </div>
            </div>
        </div>
        )
    }
}

export default withStyles(styles)(Header)
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
import { blue, red } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import { Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

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
    errMsg: {
        color: red,
    },
  };

class Header extends Component {

    constructor() {
        super();
        this.state = {
            searchTerm:'',
            modalIsOpen: false,
            tabIndex:0,
            contactNumber: "",
            password: "",
            contactNumberError: false,
            passwordError: false,
            authFailure: false,
            loggedin:false,
            firstName:"",
            lastName:"",
            email:"",
            contactSNumber:"",
            passwordS:"",
            firstNameError: false,
            emailError: false,
            contactNumberSError: false,
            passwordSError: false,
            signupFailure: false,
            accessToken:"",
            customerDetails:"",
            failureMessage:"",
            loggedinMsgDisp:false,
            menuOpen:false,
            anchorEl:"",
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

    msgClose = () => {
        this.setState({ loggedinMsgDisp: false });
    };

    menuClose = () => {
        this.setState({ menuOpen: false });
    };

    menuOpenHandler = () => {
        this.setState({ menuOpen: true });
    }

    handleProfile = () => {
        this.setState({ menuOpen: false });
        let page = "/profile/";
        //this.props.history.push(page, true);
    }

    handleLogout = () => {
        this.setState({menuOpen: false });

        this.setState({accessToken: ""});
        this.setState({customerDetails: ""});
        this.setState({loggedin: false});
        this.setState({loggedinMsgDisp: false});
        
    }

    handleChange = (event, newValue) => {
        this.setState({tabIndex: newValue});
    };

    /* Handle Username and password inputs */
    contactNumberChangeHandler = event => {
        this.setState({contactNumber: event.target.value });
        this.setState({contactNumberError: false});
        this.setState({authFailure: false});
    }
        
    passwordChangeHandler = event => {
        this.setState({password: event.target.value });
        this.setState({passwordError: false});
        this.setState({authFailure: false});
    }

    firstNameChangeHandler = event => {
        this.setState({firstName: event.target.value });
        this.setState({firstNameError: false});
        this.setState({signupFailure: false});
    }

    emailChangeHandler = event => {
        this.setState({email: event.target.value });
        this.setState({emailError: false});
        this.setState({signupFailure: false});
    }

    contactNumberSChangeHandler = event => {
        this.setState({contactSNumber: event.target.value });
        this.setState({contactNumberSError: false});
        this.setState({signupFailure: false});
    }

    passwordSChangeHandler = event => {
        this.setState({passwordS: event.target.value });
        this.setState({passwordSError: false});
        this.setState({signupFailure: false});
    }

    authHandler = () => {
        let error = false;
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        let encodedAuth="";

        if (this.state.contactNumber === "") {
            this.setState({contactNumberError: true});
            error = true;
        }
        
        if (this.state.password === "") {
            this.setState({passwordError: true});
            error = true;
        }

        if (error === false) {
            encodedAuth = btoa(this.state.contactNumber + ":" + this.state.password);
            console.log(encodedAuth);
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (this.status == 200) {
                        that.setState({accessToken: this.getResponseHeader("access-token")});
                        that.setState({customerDetails: JSON.parse(this.responseText)});
                        that.setState({ modalIsOpen: false });
                        that.setState({loggedin: true});
                        that.setState({loggedinMsgDisp: true});
                    } else {
                        that.setState({failureMessage: JSON.parse(this.responseText).message});
                        that.setState({authFailure: true});
                    }
                }
            });
            xhr.open("POST", "http://localhost:8080/api/customer/login");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("authorization","Basic "+encodedAuth);
            xhr.send(data);
        }
    }

    signupHandler = () => {
        let error = false;

        if (this.state.firstName === "") {
            this.setState({firstNameError: true});
            error = true;
        }
        
        if (this.state.email === "") {
            this.setState({emailError: true});
            error = true;
        }

        if (this.state.contactSNumber === "") {
            this.setState({contactNumberSError: true});
            error = true;
        }

        if (this.state.passwordS === "") {
            this.setState({passwordSError: true});
            error = true;
        }

        if (error === false) {
            this.setState({signupFailure: true});
        }
    }

    render() {
        const { classes } = this.props;
        
        return (
        <div className="header">
            <div className="header-logo">
            <FastfoodIcon htmlColor="white" fontSize="large"/>
            </div>

            { this.props.type === "Home" ?
                (<div className="header-search">
                    <InputLabel htmlFor="search"></InputLabel>
                    <Input onChange={this.searchHandler} classes={{input: classes.input, underline: classes.underlineInput }} id="search" fullWidth="true" placeholder="Search by Restaurant Name" aria-describedby="my-helper-text" startAdornment={
                    <InputAdornment position="start"><SearchIcon htmlColor="white"/></InputAdornment> } /> 
                </div>) : null 
            }

            { this.state.loggedin === true ?
                (<div className="header-loggedin">
                    <div className="loggedin-box">
                        <Button className = "buttonStyle" onClick={this.menuOpenHandler}> 
                            <AccountCircleIcon fontSize="large"/>
                            &nbsp; {this.state.customerDetails.first_name} 
                        </Button>
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
                            autoHideDuration={10000}
                            open={this.state.loggedinMsgDisp}
                            onClose={this.msgClose}
                            message="Logged in successfully! " />
                        <Menu  anchorEl={null} keepMounted open={this.state.menuOpen} onClose={this.menuClose}>
                            <MenuItem onClick={this.handleProfile}>My Profile</MenuItem>
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                    </div>) : (
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
                            <div role="tabpanel" hidden={this.state.tabIndex !== 0}>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="contact_number" required="true">Contact No</InputLabel>
                                        <Input id="contact_number" onChange={this.contactNumberChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.contactNumberError ? <span style={{color: "red"}}>required</span> : ''} 
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="password" required="true">Password</InputLabel>
                                        <Input id="password" onChange={this.passwordChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.passwordError ? <span style={{color: "red"}}>required</span> : ''} 
                                </FormControl>
                                <br /><br />
                                <p className="errMsg">{this.state.failureMessage}</p>
                                <br /><br />
                                <FormControl className={classes.buttonControl}>
                                    <Button onClick={() => this.authHandler()} variant="contained" color="primary">
                                        LOGIN
                                    </Button>
                                </FormControl>
                                <br /><br />
                            </div>
                            <div role="tabpanel" hidden={this.state.tabIndex !== 1}>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="first_name" required="true">First Name</InputLabel>
                                        <Input id="first_name" onChange={this.firstNameChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.firstNameError ? <span style={{color: "red"}}>required</span> : ''} 
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="last_name" required="true">Last Name</InputLabel>
                                        <Input id="last_name" onChange={this.lastNameChangeHandler} aria-describedby="my-helper-text" /> 
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="Email" required="true">Email</InputLabel>
                                        <Input id="Email" onChange={this.emailChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.emailError ? <span style={{color: "red"}}>required</span> : ''} 
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="password" required="true">Password</InputLabel>
                                        <Input id="password" onChange={this.passwordSChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.passwordSError ? <span style={{color: "red"}}>required</span> : ''} 
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="contact_numbers" required="true">Contact No</InputLabel>
                                        <Input id="contact_numbers" onChange={this.contactNumberSChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.contactNumberSError ? <span style={{color: "red"}}>required</span> : ''} 
                                </FormControl>
                                <br /><br />
                                <br /><br />
                                <FormControl className={classes.buttonControl}>
                                    <Button onClick={() => this.signupHandler()} variant="contained" color="primary">
                                        SIGNUP
                                    </Button>
                                </FormControl>
                                <br /><br />
                                </div>
                        </Modal>
                    </div>
                </div>
                )
            }
        </div>
        )
    }
}

export default withStyles(styles)(Header)
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
            tabIndex:0, // Index to switch between Login and Sign up
            // Details used for Login TAB
            contactNumber: "",
            password: "",
            contactNumberError: false,
            contactNumberValidationErr:false,
            passwordError: false,
            passwordValidationErr: false,
            authFailure: false,
            loggedin:false,
            // Details used for Sign up TAB
            firstName:"",
            lastName:"",
            email:"",
            contactSNumber:"",
            passwordS:"",
            firstNameError: false,
            emailError: false,
            emailValidationErr: false,
            contactNumberSError: false,
            contactNumberSValidationErr: false,
            passwordSError: false,
            passwordSValidationErr: false,
            signupFailure: false,
            signupFailureMessage:"",
            // Logged in customer details
            accessToken:"",
            customerDetails:"",
            customerId:"",
            failureMessage:"",
            signedUpNotify:false,
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

    // Cleanup all the login related details when we close modal or logged in
    cleanupLoginDetails = () => {

        this.setState({ contactNumber: "" });
        this.setState({ password: "" });
        this.setState({ contactNumberError: false });
        this.setState({ contactNumberValidationErr: false });
        this.setState({ passwordError: false });
        this.setState({ passwordValidationErr: false });
        this.setState({ authFailure: false });
        this.setState({ failureMessage: "" });
    }

    // cleanup all the signup related details when we close modal or signed up successfully
    cleanupSigninDetails = () => {

        this.setState({ firstName: "" });
        this.setState({ lastName: "" });
        this.setState({ email: "" });
        this.setState({ contactSNumber: "" });
        this.setState({ passwordS: "" });
        this.setState({ firstNameError: false });
        this.setState({ emailError: false });
        this.setState({ emailValidationErr: false });
        this.setState({ contactNumberSError: false });
        this.setState({ contactNumberSValidationErr: false });
        this.setState({ passwordSError: false });
        this.setState({ passwordSValidationErr: false });
        this.setState({ signupFailure: false });
        this.setState({ signupFailureMessage: "" });

    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };
    
    closeModal = () => {
        this.setState({ modalIsOpen: false });
        // Make sure it always starts with Login TAB
        this.setState({ tabIndex: 0 });
        // Clean up all state information for both Login and Signup
        this.cleanupLoginDetails();
        this.cleanupSigninDetails();
    };

    msgClose = () => {
        this.setState({ loggedinMsgDisp: false });
    };

    msgSClose = () => {
        this.setState({ signedUpNotify: false });
    };

    menuClose = () => {
        this.setState({ menuOpen: false });
    };

    menuOpenHandler = (e) => {
        this.setState({ menuOpen: true });
        this.setState({ anchorEl:e.currentTarget});
    }

    // Re-direct to the profile page
    handleProfile = () => {
        this.setState({ menuOpen: false });
        let page = "/profile/";
        this.props.history.push(page, true);
    }

    // Handling logout event
    handleLogout = () => {
        this.setState({menuOpen: false });

        this.setState({accessToken: ""});
        this.setState({customerDetails: ""});
        this.setState({loggedin: false});
        this.setState({loggedinMsgDisp: false});
        this.setState({anchorEl:""});

        this.props.onLogout();
        
    }

    // Move between login and sign up TAB's
    handleChange = (event, newValue) => {
        this.setState({tabIndex: newValue});
    };

    /* Handle contact number and password inputs */
    contactNumberChangeHandler = event => {
        this.setState({contactNumber: event.target.value });
        this.setState({contactNumberError: false});
        this.setState({contactNumberValidationErr: false});
        this.setState({authFailure: false});
        this.setState({failureMessage: ""});

        // Remove error message when no value is entered or deleted
        if (event.target.value.length === 0)
            this.setState({contactNumberValidationErr: false});
    }
        
    passwordChangeHandler = event => {
        this.setState({password: event.target.value });
        this.setState({passwordError: false});
        this.setState({authFailure: false});
        this.setState({failureMessage: ""});
    }

    /* Handle contact number, password, first, last name inputs */
    firstNameChangeHandler = event => {
        this.setState({firstName: event.target.value });
        this.setState({firstNameError: false});
        this.setState({signupFailure: false});
        this.setState({signupFailureMessage: ""});
    }

    lastNameChangeHandler = event => {
        this.setState({lastName: event.target.value });
        this.setState({signupFailure: false});
        this.setState({signupFailureMessage: ""});
    }

    emailChangeHandler = event => {
        this.setState({email: event.target.value });
        this.setState({emailError: false});
        this.setState({signupFailure: false});
        this.setState({emailValidationErr: false});
        this.setState({signupFailureMessage: ""});
        
        // Remove error message when no value is entered or deleted
        if (event.target.value.length === 0)
            this.setState({emailValidationErr: false});
    }

    contactNumberSChangeHandler = event => {
        this.setState({contactSNumber: event.target.value });
        this.setState({contactNumberSError: false});
        this.setState({signupFailure: false});
        this.setState({contactNumberSValidationErr: false});
        this.setState({signupFailureMessage: ""});

        // Remove error message when no value is entered or deleted
        if (event.target.value.length === 0)
            this.setState({contactNumberSValidationErr: false});
    }

    passwordSChangeHandler = event => {
        this.setState({passwordS: event.target.value });
        this.setState({passwordSError: false});
        this.setState({signupFailure: false});
        this.setState({passwordSValidationErr: false});
        this.setState({signupFailureMessage: ""});

        // Remove error message when no value is entered or deleted
        if (event.target.value.length === 0)
            this.setState({passwordSValidationErr: false});
    }

    /* Handle login */
    authHandler = () => {
        let error = false;
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        let encodedAuth="";

        if (this.state.contactNumber === "") {
            this.setState({contactNumberError: true});
            error = true;
        } else { /* Check if valid phone number is entered */
            let phoneno = /^\d{10}$/;
            if (this.state.contactNumber.match(phoneno) === null) {
                this.setState({contactNumberValidationErr: true});
                error = true;
            }
        }

        if (this.state.password === "") {
            this.setState({passwordError: true});
            error = true;
        }

        if (error === false) {
            encodedAuth = btoa(this.state.contactNumber + ":" + this.state.password);
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (this.status === 200) { // Success
                        that.setState({accessToken: this.getResponseHeader("access-token")});
                        that.setState({customerDetails: JSON.parse(this.responseText)});
                        that.setState({ modalIsOpen: false });
                        that.setState({loggedin: true});
                        that.setState({loggedinMsgDisp: true});
                        // Clean up all state information for both Login and Signup
                        that.cleanupLoginDetails();
                        that.cleanupSigninDetails();
                        // Make sure it comes back in Login TAB
                        that.setState({ tabIndex: 0 });
                        that.props.onLogin(that.state.accessToken, that.state.customerDetails);
                    } else { // failure - display the error message received
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

    /* Handle sign up */
    signupHandler = () => {
        let error = false;
        let requestData = {"contact_number":"", "email_address":"", "first_name":"", "last_name":"", "password":""}
        let xhr = new XMLHttpRequest();
        let that = this;
        let data = null;

        if (this.state.firstName === "") {
            this.setState({firstNameError: true});
            error = true;
        }
        
        if (this.state.email === "") {
            this.setState({emailError: true});
            error = true;
        } else { // check if proper email format is entered
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (this.state.email.match(mailformat) === null) {
                this.setState({emailValidationErr: true});
                error = true;
            }
        }

        if (this.state.contactSNumber === "") {
            this.setState({contactNumberSError: true});
            error = true;
        } else { // Check if phone no format is correct
            var phoneno = /^\d{10}$/;
            if (this.state.contactSNumber.match(phoneno) === null) {
                this.setState({contactNumberSValidationErr: true});
                error = true;
            }
        }

        if (this.state.passwordS === "") {
            this.setState({passwordSError: true});
            error = true;
        } else { // Check for proper password format
            var passwordFormat =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            if (this.state.passwordS.match(passwordFormat) === null) {
                this.setState({passwordSValidationErr: true});
                error = true;
            }
        }

        if (error === false) {
            
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if ((this.status === 200) || 
                        (this.status === 201)) { // Success
                        that.setState({customerId: this.getResponseHeader("id")});
                        // Move to Login TAB
                        that.setState({ tabIndex: 0 });
                        that.setState({signupFailure: false});
                        // Need to notify that user has successfuly signed up
                        that.setState({signedUpNotify: true});
                        // cleanup all states pertaining to Signin
                        that.cleanupSigninDetails();
                    } else { // Request Failed, display the reason for failure
                        that.setState({signupFailureMessage: JSON.parse(this.responseText).message});
                        that.setState({signupFailure: true});
                    }
                }
            });
            xhr.open("POST", "http://localhost:8080/api/customer/signup");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("charset", "UTF-8");
            // Filll in the signup details
            requestData["contact_number"]=this.state.contactSNumber;
            requestData["email_address"]=this.state.email;
            requestData["first_name"]=this.state.firstName;
            requestData["last_name"]=this.state.lastName;
            requestData["password"]=this.state.passwordS;
            data = JSON.stringify(requestData);
            xhr.send(data);
        }
    }

    render() {
        const { classes } = this.props;
        
        return (
        <div className="header">
            <div className="header-logo">
            <FastfoodIcon htmlColor="white" fontSize="large"/>
            </div>

            {/* Display restaurant search if only in home page */}
            { this.props.type === "Home" ?
                (<div className="header-search">
                    <InputLabel htmlFor="search"></InputLabel>
                    <Input onChange={this.searchHandler} classes={{input: classes.input, underline: classes.underlineInput }} id="search" fullWidth="true" placeholder="Search by Restaurant Name" aria-describedby="my-helper-text" startAdornment={
                    <InputAdornment position="start"><SearchIcon htmlColor="white"/></InputAdornment> } /> 
                </div>) : null 
            }

            {/* Notify successful sign up at the Left Bottom Corner */}
            { this.state.signedUpNotify === true ? (
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
                    autoHideDuration={10000}
                    open={this.state.signedUpNotify}
                    onClose={this.msgSClose}
                    message="Registered successfully! Please login now!" />
                    ) : null
            }

            {/* Notify successful Login at the Left Bottom Corner */}
            { this.state.loggedin === true ?
                (<div className="header-loggedin">
                    <div className="loggedin-box">
                        <Button color="inherit" className = "buttonStyle" onClick={this.menuOpenHandler}> 
                            <AccountCircleIcon fontSize="large"/>
                            &nbsp; {this.state.customerDetails.first_name} 
                        </Button>
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
                            autoHideDuration={10000}
                            open={this.state.loggedinMsgDisp}
                            onClose={this.msgClose}
                            message="Logged in successfully! " />
                        <Menu  anchorEl={this.state.anchorEl} keepMounted open={this.state.menuOpen} onClose={this.menuClose}>
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
                                        <Input id="contact_number" value={this.state.contactNumber} onChange={this.contactNumberChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.contactNumberError ? <span style={{color: "red", textAlign:"left"}}>required</span> : ''} 
                                        {this.state.contactNumberValidationErr ? <span style={{color: "red", textAlign:"left"}}>Invalid Contact</span> : ''}
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="password" required="true">Password</InputLabel>
                                        <Input id="password" value={this.state.password} onChange={this.passwordChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.passwordError ? <span style={{color: "red", textAlign:"left"}}>required</span> : ''} 
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
                                        <Input id="first_name" value={this.state.firstName} onChange={this.firstNameChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.firstNameError ? <span style={{color: "red", textAlign:"left"}}>required</span> : ''} 
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="last_name" required="true">Last Name</InputLabel>
                                        <Input id="last_name" value={this.state.lastName} onChange={this.lastNameChangeHandler} aria-describedby="my-helper-text" /> 
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="Email" required="true">Email</InputLabel>
                                        <Input id="Email" value={this.state.email} onChange={this.emailChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.emailError ? <span style={{color: "red", textAlign:"left"}}>required</span> : ''} 
                                        {this.state.emailValidationErr ? <span style={{color: "red", textAlign:"left"}}>Invalid Email</span> : ""}
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="password" required="true">Password</InputLabel>
                                        <Input id="password" value={this.state.passwordS} onChange={this.passwordSChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.passwordSError ? <span style={{color: "red", textAlign:"left"}}>required</span> : ''} 
                                        {this.state.passwordSValidationErr ? <span style={{color: "red", textAlign:"left", overflowWrap:"break-word"}}>
                                        Password must contain 
                                        <br></br> atleast one capital 
                                        <br></br> letter, one small letter,
                                        <br></br> one number, and one 
                                        <br></br> special character
                                        </span> : ''}
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="contact_numbers" required="true">Contact No</InputLabel>
                                        <Input id="contact_numbers" value={this.state.contactSNumber} onChange={this.contactNumberSChangeHandler} aria-describedby="my-helper-text" />
                                        {this.state.contactNumberSError ? <span style={{color: "red", textAlign:"left"}}>required</span> : ''} 
                                        {this.state.contactNumberSValidationErr ? <span style={{color: "red", textAlign:"left"}}>
                                            Contact No. must
                                            <br></br> contain only numbers add
                                            <br></br> and must be 10 digits 
                                            <br></br>long</span> : ""}
                                </FormControl>
                                <br /><br />
                                <p className="errMsg">{this.state.signupFailureMessage}</p>
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
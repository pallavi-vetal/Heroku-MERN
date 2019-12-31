import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitFeedback } from "../_actions/usersActions";
import SendIcon from '@material-ui/icons/Send';
import {  green } from '@material-ui/core/colors';
import HomeNavBar from "./HomeNavBar";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
const useStyles = theme => ({
 
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      success: {
        backgroundColor: green[600],
        opacity: 0.9,
    marginRight: theme.spacing(1),
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
      icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
      },
  });
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit">
          HackerEarth
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
class Feedback extends Component{
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      feedback: "",
      errors: {},
      isSubmit:false,
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newFeedback = {
      name: this.state.name,
      email: this.state.email,
      feedback: this.state.feedback,

    };

    this.props.submitFeedback(newFeedback, this.props.history);
    this.setState({isSubmit:true})
  };

    render(){
        const {classes} = this.props;
        const { errors } = this.state;
        
        return(
        <div>
            <HomeNavBar onClick={this.onLogoutClick}/>
            <Container component="main" maxWidth="xs">
              
          
     
      <div className={classes.paper}>
      {this.state.isSubmit && (<div> 
       
       <SnackbarContent
       autoHideDuration={6000}
     className={classes.success}
     aria-describedby="feedback-snackbar"
     message={
       <span id="feedback-snackbar" className={classes.message}>
         <CheckCircleIcon className={clsx(classes.icon, classes.iconVariant)} />
         {"Your Feedback submitted successfully!"}
       </span>
     }
    
   />
  </div>)}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Feedback
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Your Name"
                autoFocus
                onChange = {this.onChange}
              />
              <label htmlFor="name"></label>
        <Typography variant="h8" color="error">{errors.name}</Typography> 
            </Grid>
           
            <Grid item xs={12}>
            <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Your Email Address"
                autoFocus
                onChange = {this.onChange}
              />
              <label htmlFor="email"></label>
        <Typography variant="h8" color="error">{errors.email}</Typography>
            </Grid>
            <Grid item xs={12}>
            <TextField
                autoComplete="feedback"
                name="feedback"
                variant="outlined"
                required
                fullWidth
                multiline
                rows={10}
                id="feedback"
                label="Feedback"
                autoFocus
                onChange = {this.onChange}
              />
              <label htmlFor="feedback"></label>
        <Typography variant="h8" color="error">{errors.feedback}</Typography> 
            </Grid>
           </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<SendIcon />}
          >
            Submit Feedback
          </Button>
         
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
        </div>
            
        );
    }
}
Feedback.propTypes = {
  submitFeedback: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps,{ submitFeedback })(withStyles(useStyles)(Feedback));
import React, { Component } from "react";
import HomeNavBar from "./HomeNavBar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../_actions/usersActions";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
const styles = theme => ({
  snack: {
    width:"50%",
    backgroundColor: theme.palette.error.dark,
    margin: theme.spacing(2),
  },
  message: {
    display: "flex",
    alignItems: "center",
    size: "small"
  }
});
function MySnackbarContentWrapper(props) {
  const {classes} = props.classes;
 
console.log(localStorage.get('user'))
  return (
    <SnackbarContent
      className={classes.error}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <ErrorIcon />{" "}
          {"  No Restaurants available!"} 
        </span>
      }
      
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.setUserLocation();
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };
  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10
      };
      this.setState({
        viewport: newViewport,
        userLocation: setUserLocation
      });
    });
  };
  render() {
    const {classes} = this.props;
   
    console.log(this.state.userLocation);
    return (
      <div >
        <HomeNavBar onClick={this.onLogoutClick} />
        <br></br>
        <Tooltip title="Latitude">
        <Chip
          avatar={<Avatar>L</Avatar>}
          label={this.state.userLocation.lat}
          variant="outlined"
        />
       
      </Tooltip>
        {" "}
        <Tooltip title="Longitude">
        <Chip
          avatar={<Avatar>L</Avatar>}
          label={this.state.userLocation.long}
          variant="outlined"
        />
        </Tooltip>
        <SnackbarContent 
      className={classes.snack}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <ErrorIcon />
          {"No Restaurants available!"}
        </span>
      }
      
    />
      </div>
    );
  }
}
Home.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Home));

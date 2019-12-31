import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Link from '@material-ui/core/Link';
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});
class HomeNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      auth: false
    };
  }

  handleChange = event => {
    this.setState({
      anchorEl: event.target.checked
    });
  };

  handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };
  

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" href="/" color='inherit' style={{textDecoration: "none"}}>Home</Link>
            </Typography>
            
            {this.props.auth.isAuthenticated && (
              <div>
                {user.name.split(" ")[0]}
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.props.onClick}>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
             {!(this.props.auth.isAuthenticated) && (
              <div>
               
              
               <Typography variant="h7" className={classes.title}>
              <Link to="/login" href="/login" color='inherit' style={{textDecoration: "none"}}>Sign In</Link>
            </Typography>
            
                
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
HomeNavBar.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(
  withStyles(styles)(HomeNavBar)
);

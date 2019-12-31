import React,{Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {logoutUser} from '../_actions/usersActions';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import GitHubIcon from '@material-ui/icons/GitHub';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HomeNavBar from "./HomeNavBar";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Link from '@material-ui/core/Link';

const useStyles = theme => ({
  card: {
    maxWidth: 345,
    marginLeft:'5%'
  },
  media: {
    height: 2,
    paddingTop: '100.55%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded:false
        }
    }
   
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/");
      };
   handleExpandClick = () => {
    this.setState({
        expanded:!this.state.expanded
    })
  };
  render(){
      const {classes} = this.props;
      return(
          <div>
              <HomeNavBar onClick={this.onLogoutClick}/>
              <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            P
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Pallavi Vetal"
        subheader="Sofware Developer, UBS"
      />
      <CardMedia
        className={classes.media}
        image="profile.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Software Developer, UBS
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link href='https://www.linkedin.com/in/pallavi-vetal-21031996/'>
        <IconButton aria-label="add to favorites">
          <LinkedInIcon />
        </IconButton>
        </Link>
        <Link href="https://github.com/pallavi-vetal">
        <IconButton aria-label="share">
          <GitHubIcon />
        </IconButton>
        </Link>
        
      </CardActions>
     
    </Card>
              </div>
      )
      
  }
  
}
About.propTypes = {
    logoutUser : PropTypes.func.isRequired,
  };
  const mapStateToProps = state => ({
    restaurants: state.restaurants
  });
export default connect(mapStateToProps, {logoutUser})(withStyles(useStyles)(About));
  
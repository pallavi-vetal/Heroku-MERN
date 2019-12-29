import React, { Component } from "react";
import HomeNavBar from "./HomeNavBar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {logoutUser} from '../_actions/usersActions';
import {
  fetchRestaurantByID,
  fetchRestaurantAddress,
} from "../_actions/restaurantsActions";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import MapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import NavigationIcon from "@material-ui/icons/Navigation";
import clsx from "clsx";
import { Box } from "@material-ui/core";

const useStyles = theme => ({
  card: {
    maxWidth: "100%",
    
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  navStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
    color: "blue",
    fontSize:10
  },
  large :{
    height:'100%'
  },
  paper:{
    padding:theme.spacing(2),
    textAlign: 'left',
    height : '100%',
    color:theme.palette.text.secondary
  }
});
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+"
};
function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ""}>
      <span {...other} />
    </Tooltip>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired
};
class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 15,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null,

    };
  }
  renderPopup(index) {
    return (
       (
        <Popup
          tipSize={5}
          anchor="bottom-right"
          latitude={this.state.viewport.latitude}
          longitude={this.state.viewport.longitude}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          <p>
            
            {this.props.restaurants.restaurantID.map(row => {
              return (<p>
                <b>Latitude : </b>{this.state.viewport.latitude}<br></br>
                <b>Longitude : </b>{this.state.viewport.longitude}
              </p>);
            })}
          </p>
        </Popup>
      )
    );
  }
  handleExpandClick = () => {
    this.props.restaurants.address.map(row => {
      this.setState({
        viewport: {
          width: 800,
          height: 400,
          latitude: row["Latitude"],
          longitude: row["Longitude"],
          zoom: 16
        },
        expanded: !this.state.expanded
      }
      );
     return null;
    });
   
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };
  componentDidMount() {
    this.props.fetchRestaurantByID(parseInt(this.props.match.params.id));
    this.props.fetchRestaurantAddress(parseInt(this.props.match.params.id));
  }
  componentWillMount() {}
  render() {
    const { classes } = this.props;
    return (
      <div>
        <HomeNavBar onClick={this.onLogoutClick} />
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={this.props.restaurants.restaurantID.map(row => {
              return row["Restaurant Name"];
            })}
            subheader={this.props.restaurants.restaurantID.map(row => {
              return row["Cuisines"];
            })}
          />
          <CardMedia
            className={classes.media}
            image="https://www.alexane-hotel-spa.com/sites/default/files/styles/mgm_1920_header/public/2019-02/mgm-restaurant-fabio21920-1080.jpg?h=eb99619b&itok=fq8z5IH7"
            title={this.props.restaurants.restaurantID.map(row => {
              return row["Restaurant Name"];
            })}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <Chip
                label={this.props.restaurants.restaurantID.map(row => {
                  return "Online Delivery : " + row["Has Online delivery"];
                })}
                variant="outlined"
              />{" "}
              <Chip
                label={this.props.restaurants.restaurantID.map(row => {
                  return "Table booking : " + row["Has Table booking"];
                })}
                variant="outlined"
              />{" "}
              <Chip
                label={this.props.restaurants.restaurantID.map(row => {
                  return "Avg Cost for 2 : " + row["Average Cost for two"];
                })}
                variant="outlined"
              />{" "}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Rating
              name="hover-tooltip"
              value={this.props.restaurants.restaurantID.map(row => {
                return row["Aggregate rating"];
              })}
              precision={0.5}
              IconContainerComponent={IconContainer}
            />

            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item sm={6} height={'500'}>
                  <Typography paragraph>Restaurant address</Typography>
                  <Box height="100%" >
                    {
                      this.props.restaurants.address.map((row)=>{
                      return(<Paper className={classes.paper}>{row['Address']}
                      <p><b>Locality: </b>{row['Locality']}</p>
                      <p><b>City: </b>{row['City']}</p>
                      </Paper>) 
                      })
                    }
                    </Box> 
                </Grid>
              <Grid item sm={6} paragraph>
                <Typography paragraph>Map of our Location</Typography>
                <MapGL
                  mapboxApiAccessToken="pk.eyJ1IjoicmVkd3VpZSIsImEiOiJjazRreDk4ZXgwNHRpM21ud2JxeGNsNmtjIn0.5Dfi-FMQNumMsiOwRuoNQA"
                  width={'100%'}
                  height={400}
                  latitude={this.state.viewport.latitude}
                  longitude={this.state.viewport.longitude}
                  zoom={15}
                  onViewportChange={viewport => this.setState({ viewport })}
                  mapStyle="mapbox://styles/mapbox/streets-v10"
                >
                  <div  className={classes.navStyle}>
                    <NavigationControl
                      onViewportChange={viewport => this.setState({ viewport })}
                    />
                    <Marker
                      latitude={this.state.viewport.latitude}
                      longitude={this.state.viewport.longitude}
                    >
                     
                      <NavigationIcon
                        name="restaurant"
                        size="big"
                        onMouseEnter={() => this.setState({ popupInfo: true })}
                        onMouseLeave={() => this.setState({ popupInfo: null })}
                      />
                    </Marker>{this.renderPopup(1)}
                  </div>
                </MapGL>
              </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}
RestaurantDetails.propTypes = {
  fetchRestaurantByID: PropTypes.func.isRequired,
  restaurants: PropTypes.object.isRequired,
  fetchRestaurantAddress: PropTypes.func.isRequired,
  logoutUser : PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  restaurants: state.restaurants
});
export default connect(mapStateToProps, {
  fetchRestaurantByID,
  fetchRestaurantAddress,
  logoutUser
})(withStyles(useStyles)(RestaurantDetails));

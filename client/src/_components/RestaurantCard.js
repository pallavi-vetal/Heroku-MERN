import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRestaurants } from "../_actions/restaurantsActions";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { amber, green } from "@material-ui/core/colors";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { Link } from "react-router-dom";
const tableIcons = {
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
};
const styles = theme => ({
  icon: {
    marginRight: theme.spacing(0),
    fontSize: 10
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "50%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "46.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(0)
  },
  message: {
    display: "flex",
    alignItems: "center",
    size: "small"
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

class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5
    };
  }
  componentDidMount() {
    this.props.fetchRestaurants();
  }
  componentWillMount() {
    this.props.fetchRestaurants();
  }
  

  render() {
    const { classes } = this.props;
    const columns = [
      {
        title: "Restaurants",
        field: "Restaurant Name",
        render: rowData => (
          <Card className={classes.card} key={rowData["Restaurant Name"]}>
            <Link href="/restaurants" to={{pathname:`/restaurants/${rowData["Restaurant ID"]}`}} trim="trim">
              <CardMedia
              className={classes.cardMedia}
              image="https://i.ndtvimg.com/i/2016-06/chinese-625_625x350_81466064119.jpg"
              title="Image title"
            /></Link>
            <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h5' component="h2">
                {rowData["Restaurant Name"]}
              </Typography>
              <Typography>
                This restaurant primaraly provide {rowData.Cuisines} Cuisines.
              </Typography>
            </CardContent>

            <CardActions>
              <Tooltip
                title={
                  "Online delivery Available : " +
                  rowData["Has Online delivery"]
                }
              >
                <Button size="small" color="primary">
                  <RestaurantIcon />
                </Button>
              </Tooltip>
              <Tooltip
                title={"Has Table booking : " + rowData["Has Table booking"]}
              >
                <Button size="small" color="primary">
                  <StorefrontIcon  />
                </Button>
              </Tooltip>
            </CardActions>
          </Card>
        ),
        headerStyle: {
          backgroundColor: "#673ab7",
          color: "#ffffff"
        }
      },
      {
        title: "Cost For Two",
        field: "Average Cost for two",
        render: rowData => (
          <Tooltip
            title={
              "Average Cost for two : " +
              rowData["Average Cost for two"] +
              " Currency is: " +
              rowData["Currency"]
            }
          >
          <Chip label={rowData["Average Cost for two"]} variant="outlined" />
          </Tooltip>
        ),
        headerStyle: {
          backgroundColor: "#673ab7",
          color: "#ffffff"
        }
      },
      {
        title: "Aggregate Ratings",
        field: "Aggregate rating",
        render: rowData => (
          <Rating
            name="hover-tooltip"
            value={rowData["Aggregate rating"]}
            precision={0.5}
            IconContainerComponent={IconContainer}
          />
        ),
        headerStyle: {
          backgroundColor: "#673ab7",
          color: "#ffffff"
        }
      },
      {
        title: "Votes",
        field: "Votes",
        headerStyle: {
          backgroundColor: "#673ab7",
          color: "#ffffff"
        },
        render: rowData => (
          <Tooltip title={"Total Votes : " + rowData["Votes"]}>
            <Chip
              label={rowData["Votes"]}
              variant="outlined"
              icon={<FaceIcon />}
              justify={"center"}
            />
          </Tooltip>
        )
      }
    ];
    return (
      <div>
        <MaterialTable
          title="Restaurant List"
          columns={columns}
          data={this.props.restaurants.restaurants}
          icons={tableIcons}
          options={{
            sorting: true,
            filtering: true
          }}
        />
      </div>
    );
  }
}
RestaurantCard.propTypes = {
  restaurants: PropTypes.object.isRequired,
  fetchRestaurants: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  restaurants: state.restaurants
});
export default connect(mapStateToProps, { fetchRestaurants })(
  withStyles(styles)(RestaurantCard)
);

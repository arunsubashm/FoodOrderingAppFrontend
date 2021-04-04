import React, { Component } from 'react';
import Header from '../../common/header/Header'
import './Home.css'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';


const styles = theme => ({
    root: {
        margin: '20px',
    },
    media: {
        paddingTop: '100%',
    },
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurantDetails: [],
            currRestaurantDetails: [],
            searchTerm:' ',
        }
    }

    /* Find all images matching the search string */
    updateRestaurantRecords = (event) => {
        this.setState({searchTerm : event.target.value});
        var newAr = this.state.restaurantDetails.filter(function (e) {
            return e.restaurant_name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        this.setState({currRestaurantDetails : newAr});
    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    restaurantDetails: JSON.parse(this.responseText).restaurants
                });
                // Loop thru the entire data
                for( let i=0; i<that.state.restaurantDetails.length; i++) {
                }
                that.setState({currRestaurantDetails : that.state.restaurantDetails});
            }
        });
        xhr.open("GET", "http://localhost:8080/api/restaurant");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    render() {
        const { classes } = this.props;

        return (
        <div>
            <Header onSearchSubmit={this.updateRestaurantRecords}/>
            <div className="grid-container">
                {this.state.currRestaurantDetails.map((restaurants) => (
                    <div key={restaurants.id}>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image={restaurants.photo_URL}
                            />
                             <CardContent>
                                <Typography variant="h5" color="textPrimary" component="h5">
                                    {restaurants.restaurant_name} 
                                </Typography>
                             </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
        )
    }
}

export default withStyles(styles)(Home);

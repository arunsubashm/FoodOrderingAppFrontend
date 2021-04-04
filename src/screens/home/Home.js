import React, { Component } from 'react';
import Header from '../../common/header/Header'

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
    updateRestaurantRecords = (str) => {
        this.setState({searchTerm : str.searchTerm});
        var newAr = this.state.restaurantDetails.filter(function (e) {
            return e.restaurant_name.toLowerCase().includes(str.searchTerm.toLowerCase());
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
                    //console.log(that.state.restaurantDetails[i].restaurant_name);
                }
            }
        });
        xhr.open("GET", "http://localhost:8080/api/restaurant");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    render() {
        return (
        <div>
            <Header onSearchSubmit={this.updateRestaurantRecords}/>
        </div>
        )
    }
}

export default Home

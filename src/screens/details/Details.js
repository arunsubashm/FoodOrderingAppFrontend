import React ,{Component, Fragment} from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import StarRateIcon from '@material-ui/icons/StarRate';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Snackbar from '@material-ui/core/Snackbar';
import Divider from '@material-ui/core/Divider';

class Details extends Component {

    constructor(){
        super();
        this.handleSnackClose = this.handleSnackClose.bind(this);
        this.state = {
            openAddToCartSnack:false,
            openRemoveFromCartSnack : false,
            vertical : 'bottom',
            horizontal : 'left', 
           items_total_amount : 0,
           selected_item_list :[], 
          
           restaurant_details : null
        }
    }

    componentDidMount(){
       let restaurant_id  = this.props.match.params.restaurantId;
       //alert(restaurant_id);
       var xhttp = new XMLHttpRequest();
       var currentThis = this;
       xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             currentThis.setState({
                 restaurant_details : JSON.parse(this.responseText)
            })
         }
       };
       //restaurant_id = "1dd86f90-a296-11e8-9a3a-720006ceb890";
       // http://localhost:3000/restaurant/1dd86f90-a296-11e8-9a3a-720006ceb890
       let url = "http://localhost:8080/api/restaurant/"+restaurant_id;
       xhttp.open("GET", url, true);
       xhttp.send();
     
    }

    redirectToCheckoutPage(){
        this.props.history.push("/checkout");
    }

    addItemToCart(id){
        let selectedALLItemList = this.state.selected_item_list;
        let currentItemToBeAdded = {};
        
        this.state.restaurant_details.categories.map(eachCategoryDetails =>{
             eachCategoryDetails.item_list.forEach(eachItemListDetails => {
                 if(eachItemListDetails.id == id){
                    currentItemToBeAdded = eachItemListDetails;
                 }
             })
        })

        let isItemAdded = false;
        let newSelectedItemList = selectedALLItemList.map(eachSelectedItem => {
             
             if(eachSelectedItem.id == currentItemToBeAdded.id){
                 eachSelectedItem.quantity = eachSelectedItem.quantity + 1;
                 isItemAdded = true; 
            }
            return eachSelectedItem;
        })

        if(!isItemAdded){
            currentItemToBeAdded.quantity = 1;  
            selectedALLItemList.push(currentItemToBeAdded);       
            this.setState({
                selected_item_list : selectedALLItemList
            })  
        }else{
            this.setState({
                selected_item_list : newSelectedItemList
            }) 
        }
        let totalAmount = 0;
        this.state.selected_item_list.map(eachItemList =>{
            totalAmount += eachItemList.price * eachItemList.quantity;
        }) 
        this.setState({
            items_total_amount : totalAmount,
            openAddToCartSnack : true 
        })
       
    }

    deleteItemFromCart(id){
        let selectedALLItemList = this.state.selected_item_list;
        let newSelectedItemList = selectedALLItemList.filter(eachSelectedItem => {
            if(eachSelectedItem.id == id){
               if(eachSelectedItem.quantity != 1){
                   eachSelectedItem.quantity = eachSelectedItem.quantity - 1;
                   return true;
               }else{
                   return false;
               }
            }else{
                 return true;
             }
            
        })

        this.setState({
            selected_item_list : newSelectedItemList
        }) 

        let totalAmount = 0;
        newSelectedItemList.map(eachItemList =>{
            totalAmount += eachItemList.price * eachItemList.quantity;
        }) 
        this.setState({
            items_total_amount : totalAmount ,
            openAddToCartSnack : false,
            openRemoveFromCartSnack:true
        })

    }

    handleSnackClose(){
        this.setState({
            openAddToCartSnack : false,
            openRemoveFromCartSnack : false
        })
    }

    render(){
        const {restaurant_details,selected_item_list,openAddToCartSnack,vertical,horizontal,openRemoveFromCartSnack} = this.state;
         
        return(
            <Fragment>
                <Header/>
                {restaurant_details == null ? " No Restaurant details found " : <div>
                  <div className="restaurant-main">
                      <div ><img  className="restaurant_part1" src={restaurant_details.photo_URL}/></div> 
                      <div className="restaurant_part2">
                          
                          <h2> {restaurant_details.restaurant_name}</h2>
                          
                          <p>{restaurant_details.address.locality.toUpperCase()}</p>
                          
                          <p>{restaurant_details.categories.map(eachCategory =>{
                              return eachCategory.category_name +", "
                          })}</p>

                          <div className="rating_and_avg">
                              <div >
                                  <p className="rowFlex">
                                  
                                      <span><StarRateIcon/></span>

                                      <span>{restaurant_details.customer_rating}</span>
                                  </p>
                                  <p>AVERAGE RATING BY </p> 
                                  <p>{restaurant_details.number_customers_rated} CUSTOMERS</p>
                              </div>

                              <div>                            
                                  <p className="rowFlex"> 
                                      <span> <StarRateIcon/> </span>
                                      <span>{restaurant_details.average_price}</span>
                                  </p>
                                  <p>AVERAGE COST FOR</p> 
                                  <p>TWO PEOPLE</p>
                                  
                              </div>
                          </div>
                      </div>

                  </div>

                  <div className="restaurant_category_details">
                      <div className="restaurant_category_details_1">
                          {restaurant_details.categories.map(eachCategoryDetails =>{
                              return <div>
                                  <p style={{marginTop:"30px"}}>{eachCategoryDetails.category_name.toUpperCase()}</p>
                                  <Divider />
                                  {eachCategoryDetails.item_list.map(eachItemList =>{
                                      return <div className="eachItemList">
                                            <span style={{width:"180px"}} className="rowFlex">
                                                  {eachItemList.item_type == 'VEG' || eachItemList.item_type == 'veg' ?
                                                      <FiberManualRecordIcon htmlColor="green"/> :  <FiberManualRecordIcon htmlColor="red"/> 
                                                  }
                                                  {eachItemList.item_name}
                                          </span>
                                          
                                          <span style={{width:"20px"}}>₹{eachItemList.price}</span>
                                          
                                          <span style={{width:"20px",cursor:"pointer"}} onClick={()=>this.addItemToCart(eachItemList.id)}><AddIcon/></span>
                                      </div>
                                  })}
                              </div>
                          }
                          )}
                      </div>

                      <div className="restaurant_category_details_2">
                          <Card>
                              <CardContent>
                                  <div className="rowFlex"><ShoppingCartIcon/> <span style={{paddingLeft:"10px"}}><h3>My Cart</h3></span></div>
                                  <div style={{marginTop:"10px",marginBottom:"10px"}}>
                                      {selected_item_list.length > 0 && selected_item_list.map(eachSelectedItemList => {
                                          return <div className="rowFlexSpaceBetween">
                                              <span style={{width:"180px"}} className="rowFlex">
                                                  {eachSelectedItemList.item_type == 'VEG' ?
                                                      <FiberManualRecordIcon htmlColor="green"/> :  <FiberManualRecordIcon htmlColor="red"/> 
                                                  }
                                                  {eachSelectedItemList.item_name}</span>
                                              <span className="rowFlex">
                                                  <span style={{cursor:"pointer",marginRight:"10px"}} onClick={()=>this.deleteItemFromCart(eachSelectedItemList.id)}><RemoveIcon/></span>
                                                  <span>{eachSelectedItemList.quantity}</span>
                                                  <span style={{cursor:"pointer",marginLeft:"10px"}} onClick={()=>this.addItemToCart(eachSelectedItemList.id)}><AddIcon/></span>
                                              </span>
                                              <span>₹{eachSelectedItemList.quantity * eachSelectedItemList.price}</span>
                                          </div>
                                      })}
                                  </div>
                                  <div className="rowFlexSpaceBetween">
                                      <span><b>Total Amount</b></span>
                                      <span><b>₹{this.state.items_total_amount}</b></span>
                                  </div>
                              </CardContent>
                              <CardActions>
                              <Button style={{width:"100%"}} variant="contained" color="primary" onClick={this.redirectToCheckoutPage}>
                                  Checkout
                              </Button>
                              </CardActions>
                              </Card>
                      </div>
                  </div>
                  <Snackbar
                      anchorOrigin= {{ vertical, horizontal }}
                      open={openAddToCartSnack}
                      autoHideDuration={1000}
                      onClose={this.handleSnackClose}
                      message="Item added to cart!"
                      key={vertical + horizontal}
                  />
                  <Snackbar
                      anchorOrigin= {{ vertical, horizontal }}
                      open={openRemoveFromCartSnack}
                      autoHideDuration={1000}
                      onClose={this.handleSnackClose}
                      message="Item quantity decreased by 1!"
                      key={vertical + horizontal}
                  /> </div> 
            }
            </Fragment>
        )
    }

}

export default Details;
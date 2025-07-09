import React,{useContext} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import Food from '../FoodItem/Food';
const FoodDisplay = ({category}) => {

   const {food_list} = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
      <h2>Top seed near you</h2>
     <div className="food-display-list">
      {food_list.map((item,index)=>{
        if(category === 'All' || category === item.category){
          // If the category is 'All' or matches the item's category, display the item{
           return <Food key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
        }


        
      })}
     </div>
    </div>
  )
}

export default FoodDisplay
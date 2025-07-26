import React from "react";
import "../ExploreMenuFolder/ExploreMenu.css";
import "../DisplayFolder/FoodDisplay.css"
import { useContext,useState } from "react";
import { StoreContext } from '../../context/StoreContext';
import Food from '../FoodItem/Food';
import { menu_list } from "../../assets/assets";
const CategoryC = () => {
    const { food_list } = useContext(StoreContext);
    const [category, setCategory] = useState("All");
    return (
        <>
            <div className="explore-menu" id="explore-menu">
                <h1>Explore Our Menu</h1>
                <p className="explore-menu-text">
                    seedskraft is a one-stop destination for all your gardening needs. We offer a wide range of high-quality seeds. Whether you're a seasoned gardener or just starting out, we have everything from flower seeds to vegetable seeds, indoor plants to outdoor plants, we have it all. Our products are sourced from trusted suppliers and are guaranteed to be fresh and viable.
                </p>
                <div className="explore-menu-list">
                    {menu_list.map((item, index) => {
                        return (
                            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item ">
                                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        );
                    })}
                </div>
                <hr />
            </div>
            <div className='food-display' id='food-display'>
                <h2>Top seed near you</h2>
                <div className="food-display-list">
                    {food_list.map((item, index) => {
                        if (category === 'All' || category === item.category) {
                            // If the category is 'All' or matches the item's category, display the item{
                            return <Food key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                        }



                    })}
                </div>
            </div>
        </>
    );
};

export default CategoryC;

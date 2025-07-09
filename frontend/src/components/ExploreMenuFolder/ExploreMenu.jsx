import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
       seedskraft is a one-stop destination for all your gardening needs. We offer a wide range of high-quality seeds. Whether you're a seasoned gardener or just starting out, we have everything from flower seeds to vegetable seeds, indoor plants to outdoor plants, we have it all. Our products are sourced from trusted suppliers and are guaranteed to be fresh and viable.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item ">
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/HeaderFolder/Header'
import ExploreMenu from '../../components/ExploreMenuFolder/ExploreMenu'
import FoodDisplay from '../../components/DisplayFolder/FoodDisplay'
import AppDownload from '../../components/AppDownlodFolder/AppDownload'
import Notice from '../../components/NoticeFolder/Notice'
const Home = () => {
  
   const [category, setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <Notice/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
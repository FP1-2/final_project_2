import React from 'react'
import Header from '../../components/Header/header'
import Favourites from '../../components/Favourites/favourites'
import './FavPage.scss'

const FavPage = () => {
  return (
    <Header pageName='Favourites'> <Favourites/> </Header>
    // <Favourites/>
  )
}

export default FavPage

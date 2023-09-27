import React from 'react'
import Header from '../../components/Header/header'
import styles from './FavPage.module.scss'
import Favourites from '../../components/Favourites/favourites'

const FavPage = () => {
  return (
      <Header pageName='Favourites'> <Favourites /> </Header>
  )
}

export default FavPage

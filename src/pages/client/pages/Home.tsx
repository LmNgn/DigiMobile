import React from 'react'
import Banner from '../components/Layout/Banner'
import RenderImage from '../components/Product/RenderImage'
import NewContent from '../components/Product/NewContent'
import ProductDetail from '../components/Product/ProductDetail'

const Home = () => {
  return (
    <div>
        <Banner/>
        <RenderImage/>
        <NewContent/>
        <ProductDetail/>
    </div>
  )
}

export default Home
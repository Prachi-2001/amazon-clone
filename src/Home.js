import React from 'react'
import "./Home.css"
import Product from './Product'
import Product1 from "./images/amazon-product2.webp";



function Home() {
  return (
    <div className='home'>
      <div className='home-container'>
        <img className="home-image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" />
        <div className="home-row">
            
            <Product 
              id="23457"
              title="Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers
              "
              price={499.0}
              rating={4}
              image="https://m.media-amazon.com/images/I/41ezRvTwcaL._SX300_SY300_QL70_FMwebp_.jpg"
            />
            <Product
            id="23458"
               title="The Power of Your Subconscious Mind"
               price={19.99}
               rating={4}
               image="https://m.media-amazon.com/images/I/51QnuLIY2uL._SX322_BO1,204,203,200_.jpg"
            />    
        </div>
        <div className="home-row">
        <Product 
              id="23456"
              title="How to Win Friends and Influence People [Original Edition (Complete), PREMIUM PAPERBACK]"
              price={29.99}
              rating={5}
              image={Product1}
            />
            <Product
             id="23459"
             title="Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)"
             price={800.0}
             rating={5}
             image="https://m.media-amazon.com/images/I/41kyuER2HjL._SX300_SY300_QL70_FMwebp_.jpg"
            />
            <Product
            id="23461"
            title="boAt Airdopes 141 Bluetooth Truly Wireless in Ear Earbuds with mic, 42H Playtime, Beast Mode(Low Latency Upto 80ms) for Gaming, ENx Tech, ASAP Charge, IWP, IPX4 Water Resistance (Bold Black)"
            price={800.0}
            rating={5}
            image="https://m.media-amazon.com/images/I/51HBom8xz7L._SX466_.jpg"
            />
        </div>
        <div className="home-row">
            <Product 
            id="23460"
            title="Redmi 80 cm (32 inches) Android 11 Series HD Ready Smart LED TV | L32M6-RA/L32M7-RA (Black)"
            price={800.0}
            rating={5}
           image="https://m.media-amazon.com/images/I/71L-lTQnJiL._SX466_.jpg"
           />
            
        </div>
      </div>
    </div>
  )
}

export default Home

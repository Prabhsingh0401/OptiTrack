import { useState } from 'react'
import './index.scss'
import image from "../assets/image.png"
import image1 from '../assets/inventory.png'
import { Link } from 'react-router-dom'

export default function IndexPage(){

  return (
    <>
    <div className="container">
       <div className='glass'>
      <img className ='img' src={image}></img>
      </div>
      <div className='glass'>
      <Link to='/Inventory'> <img className='img1' src={image1}></img></Link>
      </div>

    </div>
    </>
  );
}

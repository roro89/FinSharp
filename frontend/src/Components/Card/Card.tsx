import React from 'react'
import "./Card.css";

interface Props {
    companyName: string;
    ticker: string;
    price: number;
}

const Card = ({companyName, ticker, price}: Props) => {
  return (
    <div className='card'>
        <img src='https://static.vecteezy.com/system/resources/thumbnails/025/284/015/small_2x/close-up-growing-beautiful-forest-in-glass-ball-and-flying-butterflies-in-nature-outdoors-spring-season-concept-generative-ai-photo.jpg' alt='Image'/>
        <div className='details'>
            <h2>{companyName} ({ticker})</h2>
            <p>${price}</p>
        </div>
        <p className='info'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, deserunt.</p>

    </div>
  )
}

export default Card
import React, { SyntheticEvent } from 'react'
import "./Card.css";
import { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';

interface Props {
    id: string;
    searchResult: CompanySearch;
    onPortfolioCreate : (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({id, searchResult, onPortfolioCreate}: Props) : JSX.Element=> {
  return (
    <div className='card'>
        <img src='https://static.vecteezy.com/system/resources/thumbnails/025/284/015/small_2x/close-up-growing-beautiful-forest-in-glass-ball-and-flying-butterflies-in-nature-outdoors-spring-season-concept-generative-ai-photo.jpg' alt='CompanyLogo'/>
        <div className='details'>
            <h2>{searchResult.name} ({searchResult.symbol})</h2>
            <p>${searchResult.currency}</p>
        </div>
        <p className='info'>
          {searchResult.exchangeShortName} - {searchResult.stockExchange}
        </p>
        <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol}/>
    </div>
  )
}

export default Card
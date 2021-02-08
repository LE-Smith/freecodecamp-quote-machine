import React from 'react'
import './Quote.scss';

const Quotes = props => {


    return (
        <div id="quote-box">
            <p id="text"><i class="fa fa-quote-left"></i>{props.text}</p>
            <p id="author">{props.author}</p>
            <button id="new-quote">New Quote</button>
        </div>
    )

} 

export default Quotes;
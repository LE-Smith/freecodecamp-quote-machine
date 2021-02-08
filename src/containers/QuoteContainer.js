import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import Quote from '../components/Quote';

const QuoteContainer = props => {
    const [quoteData, setQuoteData] = useState([]);
    const [quoteState, setQuoteState] = useState({
      text: '',
      author: '',
    });
    
    const fetchQuotes = useCallback(async () => {
      if (quoteData.length === 0) {
        const fetched = await fetchQuoteData();
        setQuoteData(fetched);
      }},[quoteData.length])
      
      const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
      const changeQuote = useCallback(() => {
        if (quoteData.length > 0) {
          const randomIndex = getRandomInt(0, quoteData.length);
          setQuoteState({
            text: quoteData[randomIndex].text,
            author: quoteData[randomIndex].author,
          })
        }
      },[quoteData]);
      
    useEffect(() => {
      fetchQuotes();
        }, [fetchQuotes]);

    useEffect(() => {
      changeQuote();
    }, [quoteData, changeQuote]);  

    const fetchQuoteData = () => new Promise((resolve, reject) => {
      axios.get('https://type.fit/api/quotes')
      .then(result => {
        resolve(result.data);
          })
      .catch((error) => {
        reject(error.message)
      })
    })


    const newQuoteClickedHandler = () => {
      changeQuote();
    }


  return (
    <Quote
      text={quoteState.text}
      author={quoteState.author}
      color={props.color}
      newQuoteClicked={newQuoteClickedHandler}
    />
  );
};

export default QuoteContainer;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Quote from '../components/Quote';
import './QuoteContainer.scss';
const QuoteContainer = props => {
  const [quoteData, setQuoteData] = useState([]);
  const [quoteState, setQuoteState] = useState({
    text: '',
    author: '',
  });
  const [primaryColor, setPrimaryColor] = useState("#EC357E");
  const colors = ["#EC357E","#431024","#4229A8","#666273","#2B8F9E","#2B8F9E","#658A55","#658A55","#658A55","#3E140A"];
  const [opacity, setOpacity] = useState(1);

  const fetchQuotes = useCallback(async () => {
    if (quoteData.length === 0) {
      const fetched = await fetchQuoteData();
      setQuoteData(fetched);
    }
  }, [quoteData.length]);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const changeQuote = useCallback(() => {
    if (quoteData.length > 0) {
      const randomQuoteIndex = getRandomInt(0, quoteData.length);
      setQuoteState({
        text: quoteData[randomQuoteIndex].text,
        author: quoteData[randomQuoteIndex].author,
      });
    }
  }, [quoteData]);
  
  const changeColor = () => {
    const randomColorIndex = getRandomInt(0, colors.length);
    setPrimaryColor(colors[randomColorIndex]);
  }

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  useEffect(() => {
    changeQuote();
  }, [quoteData, changeQuote]);

  const fetchQuoteData = () =>
    new Promise((resolve, reject) => {
      axios
        .get('https://type.fit/api/quotes')
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          reject(error.message);
        });
    });

  const newQuoteClickedHandler = () => {
    setOpacity(0);
    setTimeout(() => {
      changeQuote();
      setOpacity(1);
      changeColor()
    }, 1000);
  };

  const styles = {
    wrapper: {
      backgroundColor: primaryColor,
      color: primaryColor,
      transition: 'background-color ease-in-out 1s',
    }
  }

  return (
    <div id="wrapper" style={styles.wrapper}>
      <Quote
        text={quoteState.text}
        author={quoteState.author}
        color={primaryColor}
        opacity={opacity}
        newQuoteClicked={newQuoteClickedHandler}
      />
    </div>
  );
};

export default QuoteContainer;

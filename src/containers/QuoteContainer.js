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
  const colors = ["#27AE60","#EC357E","#431024","#4229A8","#666273","#2B8F9E","#2B8F9E","#658A55","#658A55","#658A55","#3E140A", "#16A085", "#BDBB99"];
  const [opacity, setOpacity] = useState(1);

  const fetchQuotes = useCallback(async () => {
    if (quoteData.length === 0) {
      const fetched = await fetchQuoteData();
      console.log(fetched.quotes);
      setQuoteData(fetched.quotes);
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
        text: quoteData[randomQuoteIndex].quote,
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
        .get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          reject(error.message);
        });
    });

  const newQuoteClickedHandler = () => {
    setOpacity(0);
    changeColor()
    setTimeout(() => {
      changeQuote();
      setOpacity(1);
    }, 500);
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

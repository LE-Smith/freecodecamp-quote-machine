import React from 'react';
import './Quote.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Quotes = props => {
  const styles = {
    btn: {
      backgroundColor: props.color,
      transition: 'background-color ease-in-out 1s',
      border: 'none',
    },
    text: {
      color: props.color,
      opacity: props.opacity,
      transition: 'color ease-in-out 1s, opacity ease-in-out 1s',
    },
  };

  return (
    <div id="quote-box">
      <p style={styles.text} id="text">
        <FontAwesomeIcon className="fa-icon" icon={faQuoteLeft} />
        {props.text}
      </p>
      <p style={styles.text} id="author">
        - {props.author}
      </p>
      <div id="buttons">
        <Button
          className="bootstrap-btn"
          style={styles.btn}
          id="test"
          onClick={props.twitterClicked}
          href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${props.text}.${props.author}`}
        >
          <FontAwesomeIcon icon={faTwitter} /></Button>
        <Button
          className="bootstrap-btn"
          style={styles.btn}
          id="new-quote"
          onClick={props.newQuoteClicked}
        >
          New Quote
        </Button>
      </div>
    </div>
  );
};

export default Quotes;

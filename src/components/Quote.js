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
      border: 'none',
    },
    text: {
      color: props.color,
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
          id="new-quote"
          onClick={props.twitterClicked}
        >
          <FontAwesomeIcon className="fa-icon" icon={faTwitter} />
        </Button>
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

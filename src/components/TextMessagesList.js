import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/textmessagelist.css';
// import $ from 'jquery';
// import ButtonCopy from './ButtonCopy';

class TextMessagesList extends Component {
  constructor(props) {
    super(props);

  }

  // handleClick() {
  //   const toCopy = $('button').prev();
  //   toCopy.select();
  //   document.execCommand('copy');
  // }

  render(){
    return(
      <div className={styles.messageList}>
        {!this.props.messages ? null :
          <ul>
            {this.props.messages.map((message, index) =>
              <div
                key={index}
                className={styles.message}>
                <li>{message}</li>
                <button>Copier</button>
                {/* <ButtonCopy message={message} /> */}
              </div>
            )}
          </ul>
        }
      </div>
    );
  }
}

TextMessagesList.propTypes = {
  messages: PropTypes.array
};

export default TextMessagesList;

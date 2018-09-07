import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../css/addtextmessage.css';
// import TextMessagesList from './TextMessagesList';



class AddTextMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      messageContent: '',
      messages: []
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  openModal() {
    this.setState({
      modalIsOpen: true,
    }) && this.props.user.messages.length === 0 ?
      null :
      this.setState({

        messages: this.props.user.messages
      });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  handleChange(e) {
    this.setState({
      messageContent: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    const oldMessages = this.state.messages;
    const newMessage = this.state.messageContent;
    if(!newMessage) return;
    oldMessages.push(newMessage);
    this.setState({
      messages: oldMessages
    });

    const { messages } = this.state;

    axios.put('/api/users/' + this.props.user._id,
      { messages })
      .then(res => {
        console.log(res.data, 'Message Added!'); {/* eslint-disable-line */}
      })
      .then(this.setState({
        modalIsOpen: false,
        messageContent: ''
      })
      )
      .catch(err => {
        console.log(err, 'Message not added...'); {/* eslint-disable-line */}
      });
  }

  render() {
    return(
      <div className={styles.app}>
        <button
          onClick={this.openModal}
          className={styles.addButton}>
          Nouveau Message
        </button>
        <Modal
          isOpen={this.state.modalIsOpen} >
          <form onSubmit={this.handleSubmit}>
            <textarea rows="10" cols="40"
              value={this.state.messageContent}
              onChange={this.handleChange}>
                Nouveau Message !
            </textarea>
            <button
              type="submit">
                Ajouter Message
            </button>
          </form>
          <hr />
          <button onClick={this.closeModal}>Fermer</button>
        </Modal>
      </div>
    );
  }
}

AddTextMessage.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    messages: PropTypes.array
  })
};


export default AddTextMessage;

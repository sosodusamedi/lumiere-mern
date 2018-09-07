import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../css/deleteuser.css';

Modal.setAppElement('#root');

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  handleClick() {
    axios.delete('/api/users/' + this.props.user._id)
      .then(res => {
        console.log(res.data); {/* eslint-disable-line */}
      })
      .then(this.setState({
        modalIsOpen: false
      }))
      .catch((err) => {
        console.log(err); {/* eslint-disable-line */}
      });
  }

  render(){
    return(
      <div className={styles.app}>
        <button
          type="submit"
          onClick={this.openModal}
          className={styles.button}>
          Supprimer Utilisateur
        </button>
        <Modal
          isOpen={this.state.modalIsOpen} >
          <div id={styles.deleteUserForm}>
            <h4>Etes-vous sûr de vouloir supprimer {this.props.user.name} ?</h4>
            <button
              onClick={this.closeModal}
              className={styles.button}>
              Non
            </button>
            <button
              onClick={this.handleClick}
              className={styles.button}>
              Oui
            </button>
            <hr />
            <button
              onClick={this.closeModal}
              className={styles.button}>
              Fermer
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

DeleteUser.propTypes = {
  user: PropTypes.object
};

export default DeleteUser;

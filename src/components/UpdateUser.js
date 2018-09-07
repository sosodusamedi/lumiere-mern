import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios';
import UpdateInterestList from './UpdateInterestList';
import UpdateDisInterestList from './UpdateDisInterestList';
import styles from '../css/updateuser.css';

Modal.setAppElement('#root');

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      telephone: '',
      location: '',
      disponibilities: '',
      price: '',
      likes: [],
      dislikes: [],
      likesContent: '',
      dislikesContent: '',
      modalIsOpen: false,
      lastIdLikes: '',
      lastIdDisLikes: ''
    };
    this.handleLikesChange = this.handleLikesChange.bind(this);
    this.handleLikesClick = this.handleLikesClick.bind(this);
    this.handleDisLikesChange = this.handleDisLikesChange.bind(this);
    this.handleDisLikesClick = this.handleDisLikesClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInterestClick = this.handleInterestClick.bind(this);
    this.handleDisInterestClick = this.handleDisInterestClick.bind(this);
  }

  openModal() {
    this.props.user.dislikes.length === 0 && this.props.user.likes.length === 0 ?
      this.setState({
        modalIsOpen: true,
        name: this.props.user.name,
        telephone: this.props.user.telephone,
        location: this.props.user.location,
        disponibilities: this.props.user.disponibilities,
        price: this.props.user.price,
        likes: this.props.user.likes,
        dislikes: this.props.user.dislikes
      })
      : this.props.user.dislikes.length === 0 && this.props.user.likes.length !== 0 ?
        this.setState({
          modalIsOpen: true,
          name: this.props.user.name,
          telephone: this.props.user.telephone,
          location: this.props.user.location,
          disponibilities: this.props.user.disponibilities,
          price: this.props.user.price,
          likes: this.props.user.likes,
          dislikes: this.props.user.dislikes,
          lastIdLikes: this.props.user.likes[this.props.user.likes.length - 1].id
        })
        : this.props.user.dislikes.length !== 0 && this.props.user.likes.length === 0 ?
          this.setState({
            modalIsOpen: true,
            name: this.props.user.name,
            telephone: this.props.user.telephone,
            location: this.props.user.location,
            disponibilities: this.props.user.disponibilities,
            price: this.props.user.price,
            likes: this.props.user.likes,
            dislikes: this.props.user.dislikes,
            lastIdDisLikes: this.props.user.dislikes[this.props.user.dislikes.length - 1].id
          })
          : this.setState({
            modalIsOpen: true,
            name: this.props.user.name,
            telephone: this.props.user.telephone,
            location: this.props.user.location,
            disponibilities: this.props.user.disponibilities,
            price: this.props.user.price,
            likes: this.props.user.likes,
            dislikes: this.props.user.dislikes,
            lastIdLikes: this.props.user.likes[this.props.user.likes.length - 1].id,
            lastIdDisLikes: this.props.user.dislikes[this.props.user.dislikes.length - 1].id
          });
  }


  closeModal() {
    this.setState({
      modalIsOpen: false
    });
    console.log(this.state.lastIdLikes); {/* eslint-disable-line */}
    console.log(this.state.lastIdDisLikes); {/* eslint-disable-line */}
  }

  handleLikesChange(e) {
    this.setState({
      likesContent: e.target.value
    });
  }


  handleLikesClick() {
    const oldLikes = this.state.likes;
    const newLikes = this.state.likesContent;
    let previousId = this.state.lastIdLikes;
    if(!newLikes) return;
    oldLikes.push({
      content: newLikes,
      id: ++previousId
    });
    this.setState({
      likes: oldLikes,
      likesContent: '',
      lastIdLikes: previousId
    });
    console.log('Interest added!'); {/* eslint-disable-line */}
    console.log(oldLikes); {/* eslint-disable-line */}
    console.log(oldLikes[oldLikes.length - 1].id); {/* eslint-disable-line */}
  }

  handleInterestClick(e) {
    const idToRemove = Number(e.target.dataset['item']);
    const newArray = this.state.likes.filter((listitem) => {
      return listitem.id !== idToRemove;
    });
    this.setState({
      likes: newArray
    });
  }


  handleDisLikesChange(e) {
    this.setState({
      dislikesContent: e.target.value
    });
  }


  handleDisLikesClick() {
    const oldDisLikes = this.state.dislikes;
    const newDisLikes = this.state.dislikesContent;
    let previousId = this.state.lastIdDisLikes;
    if(!newDisLikes) return;
    oldDisLikes.push({
      content: newDisLikes,
      id: ++previousId
    });
    this.setState({
      dislikes: oldDisLikes,
      dislikesContent: '',
      lastIdDisLikes: previousId
    });
    console.log('Disinterest added!'); {/* eslint-disable-line */}
  }

  handleDisInterestClick(e) {
    const idToRemove = Number(e.target.dataset['item']);
    const newArray = this.state.dislikes.filter((listitem) => {
      return listitem.id !== idToRemove;
    });
    this.setState({
      dislikes: newArray
    });
  }


  handleChange(e) {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      name,
      telephone,
      location,
      disponibilities,
      price,
      likes,
      dislikes
    } = this.state;

    axios.put('/api/users/' + this.props.user._id, {
      name,
      telephone,
      location,
      disponibilities,
      price,
      likes,
      dislikes
    })
      .then(res => {
        console.log(res.data, 'User updated!'); {/* eslint-disable-line */}
      })
      .then(this.setState({
        modalIsOpen: false,
        name: '',
        telephone: '',
        location: '',
        disponibilities: '',
        price: '',
        likes: [],
        dislikes: [],
        likesContent: '',
        dislikesContent: ''
      }))
      .catch(err => {
        console.log(err, 'User not updated...'); {/* eslint-disable-line */}
      });
  }



  render() {
    return (
      <div className={styles.app}>
        <button
          type="submit"
          onClick={this.openModal}
          className={styles.button}>
          Modifier Utilisateur
        </button>
        <Modal
          isOpen={this.state.modalIsOpen} >
          <form id={styles.updateUserForm} onSubmit={this.handleSubmit}>
            <legend>Modifier Utilisateur</legend>
            <fieldset>
              <div>
                <input
                  type="text"
                  placeholder="Nom Complet"
                  name="name"
                  value={this.state.name}
                  id="name"
                  onChange={this.handleChange}
                  required />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Numéro de Téléphone"
                  name="telephone"
                  value={this.state.telephone}
                  id="telephone"
                  onChange={this.handleChange}
                  required />
              </div>
              <div>
                <input
                  type="text"
                  name="location"
                  value={this.state.location}
                  placeholder="Ville, Quartier"
                  id="location"
                  onChange={this.handleChange}
                  required />
              </div>
              <div>
                <input
                  type="text"
                  name="disponibilities"
                  value={this.state.disponibilities}
                  placeholder="Moments Libres"
                  id="disponibilities"
                  onChange={this.handleChange}
                  required />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Prix maximum accepté"
                  name="price"
                  value={this.state.price}
                  id="price"
                  onChange={this.handleChange}
                  required />
              </div>
            </fieldset>
            <legend>Centres d&apos;intérêt</legend>
            <fieldset>
              <div className="rowTab">
                <div className="labels">
                  <label htmlFor="like" id="like-label">Aime :</label>
                </div>
                <div className="rightTab like">
                  <UpdateInterestList
                    items={this.state.likes}
                    onClick={this.handleInterestClick} />
                  <input
                    type="text"
                    name="like"
                    value={this.state.likesContent}
                    onChange={this.handleLikesChange}
                    className="like-input" />
                  <button
                    type="button"
                    name="button"
                    className="like-plus"
                    onClick={this.handleLikesClick}>+</button>
                </div>
              </div>
              <div className="rowTab">
                <div className="labels">
                  <label htmlFor="dislike" id="dislike-label">N&apos;aime pas :</label>
                </div>
                <div className="rightTab dislike">
                  <UpdateDisInterestList
                    items={this.state.dislikes}
                    onClick={this.handleDisInterestClick} />
                  <input
                    type="text"
                    name="dislike"
                    value={this.state.dislikesContent}
                    onChange={this.handleDisLikesChange}
                    className="dislike-input" />
                  <button
                    type="button"
                    name="button"
                    className="dislike-plus"
                    onClick={this.handleDisLikesClick}>+</button>
                </div>
              </div>
            </fieldset>
            <button
              type="submit"
              className={styles.button}>
              Modifier !
            </button>
          </form>
          <hr />
          <button
            onClick={this.closeModal}
            className={styles.button} >
            Fermer
          </button>
        </Modal>
      </div>
    );
  }
}

UpdateUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    telephone: PropTypes.string,
    location: PropTypes.string,
    disponibilities: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.string,
    _id: PropTypes.string,
    likes: PropTypes.array,
    dislikes: PropTypes.array
  }),
  _id: PropTypes.number
};

export default UpdateUser;

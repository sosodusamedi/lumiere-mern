import React, { Component } from 'react';
import AddInterestList from './AddInterestList';
import AddDisInterestList from './AddDisInterestList';
import NavBar from './NavBar';
import axios from 'axios';
import styles from '../css/adduser.css';

class AddUser extends Component  {
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
      dislikesContent: ''
    };
    this.handleLikesChange = this.handleLikesChange.bind(this);
    this.handleLikesClick = this.handleLikesClick.bind(this);
    this.handleDisLikesChange = this.handleDisLikesChange.bind(this);
    this.handleDisLikesClick = this.handleDisLikesClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lastIdLikes = -1;
    this.lastIdDisLikes = -1;
  }

  handleLikesChange(e) {
    this.setState({
      likesContent: e.target.value
    });
  }


  handleLikesClick() {
    const oldLikes = this.state.likes;
    const newLikes = this.state.likesContent;
    if(!newLikes) return;
    oldLikes.push({
      content: newLikes,
      id: ++this.lastIdLikes
    });
    this.setState({
      likes: oldLikes,
      likesContent: ''
    });
    console.log('Interest added !'); {/* eslint-disable-line */}
  }



  handleDisLikesChange(e) {
    this.setState({
      dislikesContent: e.target.value
    });
  }


  handleDisLikesClick() {
    const oldDisLikes = this.state.dislikes;
    const newDisLikes = this.state.dislikesContent;
    if(!newDisLikes) return;
    oldDisLikes.push({
      content: newDisLikes,
      id: ++this.lastIdDisLikes
    });
    this.setState({
      dislikes: oldDisLikes,
      dislikesContent: ''
    });
    console.log('Disinterest added !'); {/* eslint-disable-line */}
  }


  handleChange(e) {
    const newState = { ...this.state };
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

    axios.post('/api/users/add', {
      name,
      telephone,
      location,
      disponibilities,
      price,
      likes,
      dislikes
    })
      .then(res => {
        console.log(res.data, 'User added!'); {/* eslint-disable-line */}
      })
      .catch(err => {
        console.log(err, 'User not added...'); {/* eslint-disable-line */}
      });

    this.setState({
      name: '',
      telephone: '',
      location: '',
      disponibilities: '',
      price: ''
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <NavBar />
        <form id={styles.addUserForm} onSubmit={this.handleSubmit}>
          <legend>Informations Utilisateur</legend>
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
                <AddInterestList items={this.state.likes} />
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
                <AddDisInterestList items={this.state.dislikes} />
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
          <button type="submit" id="submit">Ajouter !</button>
        </form>
      </div>
    );
  }
}

export default AddUser;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';
import InterestList from './InterestList';
import DisInterestList from './DisInterestList';
import AddTextMessage from './AddTextMessage';
import TextMessagesList from './TextMessagesList';
import NavBar from './NavBar';
import styles from '../css/user.css';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get('/api/users/' + this.props.match.params.id)
      .then(response => {
        const data = response.data;
        this.setState({
          user: data.user[0]
        });
      });
  }



  render(){
    return(
      <div className={styles.app}>
        <NavBar />
        <div className={styles.userProfile}>
          <div className={styles.userDetail}>
            <h3 id={styles.userName}>{this.state.user.name}</h3>
            <ul className={styles.userInfos}>
              <div className={styles.userInfo}>
                <legend>Telephone :</legend>
                <li>{this.state.user.telephone}</li>
              </div>
              <div className={styles.userInfo}>
                <legend>Localisation :</legend>
                <li>{this.state.user.location}</li>
              </div>
              <div className={styles.userInfo}>
                <legend>Dispponibilités :</legend>
                <li>{this.state.user.disponibilities}</li>
              </div>
              <div className={styles.userInfo}>
                <legend>Prix accepté :</legend>
                <li>{this.state.user.price}</li>
              </div>
            </ul>
            {!this.state.user.likes ?
              null :
              <div>
                <legend>Centres dintérêt :</legend>
                <InterestList items={this.state.user.likes} />
              </div>
            }
            {!this.state.user.likes ?
              null :
              <div>
                <legend>N&apos;aime pas :</legend>
                <DisInterestList items={this.state.user.dislikes} />
              </div>
            }
            <hr />
            <DeleteUser user={this.state.user}/>
            <UpdateUser user={this.state.user}/>
          </div>
          <div  className={styles.messagesSide}>
            <AddTextMessage user={this.state.user} />
            <h3>Messages :</h3>
            <TextMessagesList messages={this.state.user.messages}/>
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      telephone: PropTypes.string,
      location: PropTypes.string,
      disponibilities: PropTypes.string,
      price: PropTypes.string,
      id: PropTypes.string
    })
  })
};

export default User;

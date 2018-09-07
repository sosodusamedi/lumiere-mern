import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../css/userlist.css';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('/api/users')
      .then(response => {
        const data = response.data;
        this.setState({
          users: data.users
        });
      });
  }


  render() {
    const data = Array.from(this.state.users);
    return (
      <div className={styles.list}>
        <h2>Utilisateurs</h2>
        {data.map((user, index) =>
          <li key={index}>
            <Link to={`/user/${user._id}`}>{user.name}</Link>
          </li>
        )}
      </div>
    );
  }
}

UsersList.propTypes = {
  initialUsers: PropTypes.array
};


export default UsersList;

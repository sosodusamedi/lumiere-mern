import React from 'react';
import PropTypes from 'prop-types';


const DisInterestList = props => (
  <ul>
    {props.items.map(item =>
      <li
        key={item.id}
        data-item={item.id} >
        {item.content}
      </li>
    )}
  </ul>
);

DisInterestList.propTypes = {
  items: PropTypes.array
};

export default DisInterestList;

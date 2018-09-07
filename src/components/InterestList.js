import React from 'react';
import PropTypes from 'prop-types';


const InterestList = props => (
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

InterestList.propTypes = {
  items: PropTypes.array
};

export default InterestList;

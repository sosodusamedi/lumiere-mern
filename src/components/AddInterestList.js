import React from 'react';
import PropTypes from 'prop-types';


const AddInterestList = props => (
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

AddInterestList.propTypes = {
  items: PropTypes.array
};

export default AddInterestList;

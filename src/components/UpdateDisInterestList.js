import React from 'react';
import PropTypes from 'prop-types';


const UpdateDisInterestList = props => (
  <ul>
    {props.items.map(item =>
      <li
        key={item.id}
        data-item={item.id}
        onClick={props.onClick} >
        {item.content}
      </li>
    )}
  </ul>
);


UpdateDisInterestList.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func
};

export default UpdateDisInterestList;

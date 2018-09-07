import React from 'react';
import PropTypes from 'prop-types';


const AddDisInterestList = props => (
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

AddDisInterestList.propTypes = {
  items: PropTypes.array
};

export default AddDisInterestList;

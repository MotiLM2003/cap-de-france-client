import React from 'react';
import { statuses } from '../utils/static_data';
const SelectCampaign = ({ name, value, onChange }) => {
  return (
    <select value={value} onChange={onChange} name={name}>
      <option value='0'>-- Any status --</option>
      {statuses.map((status, index) => (
        <option key={index + 1} value={index + 1}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default SelectCampaign;

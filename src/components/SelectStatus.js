import React from 'react';
import { statuses } from '../utils/static_data';
const SelectCampaign = ({ name, value, onChange, withAnyOption = true }) => {
  return (
    <select value={value} onChange={onChange} name={name}>
      {withAnyOption && <option value='-1'>-- Any status --</option>}
      {statuses.map((status, index) => (
        <option key={index} value={index}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default SelectCampaign;

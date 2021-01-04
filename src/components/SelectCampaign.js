import React from 'react';
import { campaigns } from '../utils/static_data';
const SelectCampaign = ({ value, onChange, name }) => {
  return (
    <select value={value} onChange={onChange} name={name}>
      <option value='0'>-- Any campaign --</option>
      {campaigns.map((campaign, index) => (
        <option key={index + 1} value={index + 1}>
          {campaign}
        </option>
      ))}
    </select>
  );
};

export default SelectCampaign;

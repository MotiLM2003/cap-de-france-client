import React from 'react';
import moment from 'moment';
import { campaigns, statuses } from '../../../utils/static_data';
const CustomerItem = ({ customer, index }) => {
  const className = index % 2 === 0 ? '' : 'customers__alt';
  let statusClassName = '';
  switch (customer.status) {
    case 0: {
      statusClassName = 'bg-gray-light';
      break;
    }
    case 1: {
      statusClassName = 'bg-warning';
      break;
    }
    case 2: {
      statusClassName = 'bg-success';
      break;
    }
    case 3: {
      statusClassName = 'bg-blue';
      break;
    }
    case 4: {
      statusClassName = 'bg-info';
      break;
    }
    case 5: {
      statusClassName = 'bg-info';
      break;
    }
    case 6: {
      statusClassName = 'bg-success';
      break;
    }
    case 7: {
      statusClassName = 'bg-blue-light';
      break;
    }
    case 8: {
      statusClassName = 'bg-blue-light';
      break;
    }
  }
  return (
    <tr className={className}>
      <td>
        <input type='checkbox' />
      </td>
      <td>{index + 1}</td>
      <td>{moment(customer.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
      <td>{customer.firstName}</td>
      <td>{customer.lastName}</td>
      <td>{customer.phone}</td>
      <td>
        <div className={statusClassName}>{statuses[customer.status]}</div>
      </td>
      <td>{customer.email}</td>
      <td>{customer.country}</td>
      <td>{customer.owner.firstName}</td>
      <td>0</td>
      <td>{campaigns[customer.campaign]}</td>
    </tr>
  );
};

export default CustomerItem;

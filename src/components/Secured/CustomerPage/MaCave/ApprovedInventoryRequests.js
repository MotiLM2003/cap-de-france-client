import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { tdItem, tdOpacityVariant } from '../variations';
import { formatMoney } from '../../../../utils/formatting';
const ApprovedInventoryRequests = (props) => {
  const { headers } = props;
  const [currentGroups, setCurrentGroups] = useState(null);

  useEffect(() => {
    const groups = props.customer.inventories
      .filter((x) => x.status === 1)
      .map((group) => group.inventory);
    setCurrentGroups(groups);
  }, []);
  const renderHeaders = () => {
    return (
      headers &&
      headers.map((header) => {
        return <th>{header}</th>;
      })
    );
  };

  const renderInventory = () => {
    return (
      currentGroups &&
      currentGroups.map((group) => {
        return (
          <motion.tr key={group._id} variants={tdItem}>
            {group.items.map((item, index) => {
              let text = item.text;
              if (index === 3) {
                text = formatMoney(item.text);
              }
              return (
                <AnimatePresence>
                  <motion.td variants={tdOpacityVariant}>{`${text}`}</motion.td>
                </AnimatePresence>
              );
            })}
            <td className='home-page-container__add-item' onClick={() => {}}>
              Action
            </td>
          </motion.tr>
        );
      })
    );
  };

  return (
    <div>
      <table className='cards-container__inventory-list'>
        <thead>
          <tr>
            {renderHeaders()}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderInventory()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps)(ApprovedInventoryRequests);

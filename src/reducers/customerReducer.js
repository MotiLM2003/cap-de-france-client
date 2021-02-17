export default (state = {}, action) => {
  switch (action.type) {
    case 'CUSTOMER_LOG_IN': {
      return { ...action.payload };
    }
    case 'CUSTOMER_LOG_OUT': {
      return {
        ...state,
      };
    }
    case 'ADD_INVENTORY': {
      // state.inventories.push()
      return { ...state, inventories: [...state.inventories, action.payload] };
    }
    case 'UPDATE_GROUP_STATUS': {
      const { groupId, updates } = action.payload;
      const inv = state.inventories.map((group) => {
        if (group._id === groupId._id) {
          return { ...group, status: updates.status };
        } else {
          return group;
        }
      });

      const newState = { ...state, inventories: inv };

      return newState;
    }

    case 'DELETE_INVENTORY_OFFER': {
      const { group, offerId } = action.payload;
      group.offers = group.offers.filter((x) => x._id !== offerId);
      console.log('state', state);
      const newInv = { ...state }.inventories.map((g) => {
        if (g._id == group._id) {
          g.offers = group.offers;
        }
        return g;
      });
      // setGroups(groups.map((g) => (g._id == group._id ? group : g)));
      return { ...state, inventories: newInv };
    }
    case 'GET_ALL': {
      return state;
    }
    default:
      return state;
  }
};

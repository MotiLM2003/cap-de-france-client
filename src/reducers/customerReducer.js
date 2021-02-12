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
    case 'GET_ALL': {
      return state;
    }
    default:
      return state;
  }
};

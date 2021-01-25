const initialState = {
  basket: {
    items_ids: [],
    user_id: ''
  },
};

const createBasketReducer = (state = initialState, action) => {
  console.log(action.payload)
  switch (action.type) {
    case 'ADD_TO BASKET': {
      
      return {
        ...state,
        basket: {
          items_ids: [...state.basket.items_ids, action.payload.basket.items_ids],
          user_id: action.payload.basket.user_id,
        },
      };
    }
    
    default:
      return state;
  }
};

export default createBasketReducer;

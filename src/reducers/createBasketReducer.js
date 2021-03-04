const initialState = {
  basket: {
    items_ids: [],
    user_id: "",
    date: "",
    value: [],
  },
};

const createBasketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO BASKET": {
      return {
        ...state,
        basket: {
          items_ids: [
            ...state.basket.items_ids,
            action.payload.basket.items_ids,
          ],
          user_id: action.payload.basket.user_id,
          value: [...state.basket.value, action.payload.basket.value],
        },
      };
    }
    case "REMOVE_FROM_BASKET": {
      return {
        ...state,
        basket: {
          items_ids: [...state.basket.items_ids].filter(index => index !== action.payload.basket.item_id),
          user_id: action.payload.basket.user_id,
          value: [...state.basket.value].filter(value => value !== action.payload.basket.value),
        },
      };
    }

    default:
      return state;
  }
};

export default createBasketReducer;

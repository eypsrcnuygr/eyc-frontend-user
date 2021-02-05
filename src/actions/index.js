export const createAdmin = admin => ({
  type: 'CREATE_ADMIN',
  payload: admin,
});

export const loginAdmin = admin => ({
  type: 'LOGIN_ADMIN',
  payload: admin,
});

export const logoutAdmin = () => ({
  type: 'LOGOUT_ADMIN',
});

export const addtoBasket = basket => ({
  type: 'ADD_TO BASKET',
  payload: basket
});

export const removeFromBasket = (basket) => ({
  type: 'REMOVE_FROM_BASKET',
  payload: basket
});
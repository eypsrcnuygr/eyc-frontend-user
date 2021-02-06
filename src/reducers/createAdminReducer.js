const initialState = {
  admin: {
    email: '',
    password: '',
    password_confirmation: '',
    uidForAdmin: '',
    clientForAdmin: '',
    access_tokenForAdmin: '',
    id: ''
  },
  isLoggedIn: false,
};

const createAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ADMIN': {
      return {
        ...state,
        admin: {
          email: action.payload.admin.email,
          password: action.payload.admin.password,
          password_confirmation:
            action.payload.admin.password_confirmation,
          uidForAdmin: action.payload.admin.uidForAdmin,
          clientForAdmin: action.payload.admin.clientForAdmin,
          access_tokenForAdmin: action.payload.admin.access_tokenForAdmin,
          id: action.payload.admin.id
        },
        isLoggedIn: true,
      };
    }
    case 'LOGIN_ADMIN':
      return {
        ...state,
        admin: {
          email: action.payload.admin.email,
          password: action.payload.admin.password,
          id: action.payload.admin.id
        },
        isLoggedIn: true,
      };
    case 'LOGOUT_ADMIN':
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default createAdminReducer;

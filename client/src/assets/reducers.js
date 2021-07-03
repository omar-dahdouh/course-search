function providerReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.key];
    case 'delete':
      return state.filter((key) => key !== action.key);
    default:
      throw new Error();
  }
}

function adminReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.number];
    case 'delete':
      return state.filter((num) => num !== action.number);
    default:
      throw new Error();
  }
}

function userReducer(state, action) {
  switch (action.type) {
    case 'edit':
      return state.map((user) => {
        return user.id === action.id
          ? { ...user, [action.key]: action.value }
          : user;
      });
    case 'delete':
      return state.filter((user) => user.id !== action.id);
    case 'replace':
      return action.data;
    default:
      throw new Error();
  }
}

module.exports = {
  adminReducer,
  userReducer,
  providerReducer,
};

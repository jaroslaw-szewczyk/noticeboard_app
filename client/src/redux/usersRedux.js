const createActionName = name => `app/users/${name}`;

const LOG_IN = createActionName('LOG_IN');

export const logIn = payload => ({
  payload,
  type: LOG_IN
});

const usersReducer = (statePart = null, action ) => {
  console.log('Received action:', action); 
  switch(action.type) {
    case LOG_IN:
      console.log(action.payload)
      return {
        ...statePart,
        isLoggedIn: true,
        username: action.payload.username
      };
    default:
      return statePart;
  }
};

export default usersReducer;
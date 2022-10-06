const initialstate = {
  totalUsers: 5,
  users: [{
    'id':'1',
    'name':'Hinall',
    'lastname': 'Patel',
    'email': 'hinal@gmail.com',
    'phone': '2323232323',
    'gender': 'female'
  },{
    'id':'2',
    'name':'Vidhi',
    'lastname': 'Patel',
    'email': 'vidhi@gmail.com',
    'phone': '2323232323',
    'gender': 'female'
  },{
    'id':'3',
    'name':'Sejal',
    'lastname': 'Patel',
    'email': 'sejal@gmail.com',
    'phone': '2323232323',
    'gender': 'female'
  },{
    'id':'4',
    'name':'Riya',
    'lastname': 'Patel',
    'email': 'riya@gmail.com',
    'phone': '2323232323',
    'gender': 'female'
  },{
    'id':'5',
    'name':'Diya',
    'lastname': 'Patel',
    'email': 'diya@gmail.com',
    'phone': '2323232323',
    'gender': 'female'
  }]
};

const UserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        users: [action.payload, ...state.users]
      };
    case "UPDATE_USER":
      return {
        users: action.payload
      };
    default:
      return state;
  }
};

export default UserReducer;

const initialstate = {
  totalUsers: 5,
  users: [{
    'id':'1',
    'name':'Hinal',
    'lastname': 'Patel',
    'email': 'hinal@gmail.com',
    'phone': '2323232323',
    'gender': 'female'
  },{
    'id':'2',
    'name':'Nick',
    'lastname': 'Thakkar',
    'email': 'nick45@gmail.com',
    'phone': '9328174323',
    'gender': 'male'
  },{
    'id':'3',
    'name':'Sejal',
    'lastname': 'Soni',
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
    'phone': '9485275413',
    'gender': 'female'
  },{
    'id':'6',
    'name':'Aesha',
    'lastname': 'Shah',
    'email': 'aesha123@gmail.com',
    'phone': '9323232323',
    'gender': 'female'
  },{
    'id':'7',
    'name':'Harsh',
    'lastname': 'Mistry',
    'email': 'harsh345@gmail.com',
    'phone': '9328574323',
    'gender': 'male'
  },{
    'id':'8',
    'name':'Vidhi',
    'lastname': 'Patel',
    'email': 'vidhi@gmail.com',
    'phone': '2323232323',
    'gender': 'female'
  },{
    'id':'9',
    'name':'Vihan',
    'lastname': 'Desai',
    'email': 'vihan345@gmail.com',
    'phone': '9328474323',
    'gender': 'male'
  },{
    'id':'10',
    'name':'Nick',
    'lastname': 'Thakkar',
    'email': 'nick45@gmail.com',
    'phone': '9328174323',
    'gender': 'male'
  },{
    'id':'11',
    'name':'Dishant',
    'lastname': 'Patel',
    'email': 'dish234@gmail.com',
    'phone': '9328173323',
    'gender': 'male'
  }]
};

const UserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        users: [action.payload, ...state.users]
      };
    case "DELETE_USER":
      // delete users
      const allusers = state.users;
      const indexOfObject = allusers.findIndex(object => {
        return object.id === action.payload.id;
      });
      allusers.splice(indexOfObject, 1);
       return {
       users: allusers
      };
    default:
      return state;
  }
};

export default UserReducer;

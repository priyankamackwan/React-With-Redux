import store from '../';

export const addUser = (data,callback) => {
	store.dispatch({
	    type: 'ADD_USER',
	    payload: data
	  });

	callback(true);
};

export const deleteUser = (userId,callback) => {
	store.dispatch({
	    type: 'DELETE_USER',
	    payload: { "id": userId}
	  });
	callback(true);
};
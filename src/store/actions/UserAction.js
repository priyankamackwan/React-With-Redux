import store from '../';

export const addUser = (data,callback) => {
	store.dispatch({
	    type: 'ADD_USER',
	    payload: data
	  });

	callback(true);
};
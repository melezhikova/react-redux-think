import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_SUCCESS,
  REMOVE_SERVICE_FAILURE,
  FETCH_ACTIVE_SERVICE_REQUEST,
  FETCH_ACTIVE_SERVICE_SUCCESS,
  FETCH_ACTIVE_SERVICE_FAILURE,
  CHANGE_ACTIVE_SERVICE_FIELD,
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
} from './actionTypes';

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
})

export const addServiceFailure = error => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const editServiceRequest = (id, name, price, content) => ({
  type: EDIT_SERVICE_REQUEST,
  payload: {
    id,
    name,
    price,
    content
  },
});

export const editServiceFailure = error => ({
  type: EDIT_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const editServiceSuccess = () => ({
  type: EDIT_SERVICE_SUCCESS,
});

export const changeActiveServiceField = (name, value) => ({
  type: CHANGE_ACTIVE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeServiceRequest = id => ({
    type: REMOVE_SERVICE_REQUEST,
    payload: {
      id,
    },
});

export const removeServiceSuccess = () => ({
  type: REMOVE_SERVICE_SUCCESS,
});

export const removeServiceFailure = error => ({
  type: REMOVE_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const fetchActiveServiceRequest = id => ({
  type: FETCH_ACTIVE_SERVICE_REQUEST,
  payload: {
    id,
  },
});

export const fetchActiveServiceSuccess = item => ({
  type: FETCH_ACTIVE_SERVICE_SUCCESS,
  payload: {
    item,
  },
});

export const fetchActiveServiceFailure = error => ({
  type: FETCH_ACTIVE_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const removeService = (id) => async (dispatch) => {
  dispatch(removeServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id }),
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(removeServiceSuccess());
  } catch (e) {
    dispatch(removeServiceFailure(e.message));
  }
  dispatch(fetchServices());
}


export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
}

export const fetchActiveService = (id) => async (dispatch) => {
  dispatch(fetchActiveServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchActiveServiceSuccess(data));
  } catch (e) {
    dispatch(fetchActiveServiceFailure(e.message));
  }
}

export const addService = () => async (dispatch, getState) => {
  dispatch(addServiceRequest());
  const {serviceAdd: {item: {name, price}}} = getState();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 0, name, price }),
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
  dispatch(fetchServices());
}

export const editService = () => async (dispatch, getState) => {
  dispatch(editServiceRequest());
  console.log(getState());
  const {serviceEdit: {activeItem: {id, name, price, content}}} = getState();
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, price, content }),
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(editServiceSuccess());
  } catch (e) {
    dispatch(editServiceFailure(e.message));
  }
  dispatch(fetchServices());
}


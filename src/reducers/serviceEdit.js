import {
    FETCH_ACTIVE_SERVICE_FAILURE,
    FETCH_ACTIVE_SERVICE_REQUEST,
    FETCH_ACTIVE_SERVICE_SUCCESS,
    CHANGE_ACTIVE_SERVICE_FIELD,
    EDIT_SERVICE_REQUEST,
    EDIT_SERVICE_FAILURE,
    EDIT_SERVICE_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    activeItem: { id: '', name: '', price: '', content: ''},
    loading: false,
    error: null,
};

export default function serviceEditReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ACTIVE_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ACTIVE_SERVICE_FAILURE:
            const {error} = action.payload;
            return {
                ...state,
                loading: false,
                error,
            };
        case FETCH_ACTIVE_SERVICE_SUCCESS:
            const {item} = action.payload;
            console.log(item);
            return {
                ...state,
                activeItem: item,
                loading: false,
                error: null,
            };
        case CHANGE_ACTIVE_SERVICE_FIELD:
            const { name, value } = action.payload;
            const { activeItem } = state;
            return {
                ...state,
                activeItem: {
                    ...activeItem,
                    [name]: value,
                }
            };
        case EDIT_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case EDIT_SERVICE_FAILURE:
            const {err} = action.payload;
            return {
                ...state,
                loading: false,
                err,
            };
        case EDIT_SERVICE_SUCCESS:
            return {...initialState};
      default:
        return state;
    }
}
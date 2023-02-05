import { FETCH_SEARCH_RESULT } from '../actions/actionType';

const initialSearchState = {
    results: [],
};

export default function search (state = initialSearchState, action) {

    switch (action.type) {
        case FETCH_SEARCH_RESULT:
            return {
                ...state,
                results: action.users
            };

        default: 
            return state;
    }
}
import {
  IS_FETCHING_CHAIN,
  ON_CHAIN_RECEIVED,
} from './actions';

const initialState = {
  isFetching: false,
  chain: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING_CHAIN:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case ON_CHAIN_RECEIVED:
      return {
        ...state,
        chain: action.chain,
      };
    default: return state;
  }
};

export default reducer;
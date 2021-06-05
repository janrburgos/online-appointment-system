const initialState = {
  numChange: 0,
};

const numChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_NUM_CHANGE":
      return {
        ...state,
        numChange: state.numChange + 1,
      };
    case "DECREMENT_NUM_CHANGE":
      return {
        ...state,
        numChange: state.numChange - 1,
      };

    default:
      return state;
  }
};

export default numChangeReducer;

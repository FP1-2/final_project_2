import { SET_ITEM } from "./actions";

const initialValue = {
  items: [],
  error: "",
};

const itemsReducer = (state = initialValue, action) => {
  switch (action.type) {
    case SET_ITEM: {
      return { ...state, items: action.payload };
    }

    default:
      return state;
  }
};

export default itemsReducer;

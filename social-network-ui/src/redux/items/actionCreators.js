import { SET_ITEM } from "./actions";

export const setItems = (items) => ({ type: SET_ITEM, payload: items });

export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("./posts.json");
      const data = await response.json();

      dispatch(setItems(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

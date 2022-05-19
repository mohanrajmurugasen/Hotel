import { Type } from "../Type/Type";

const homeState = {
  home: null,
};

export const homeReducer = (state = homeState, { type, payload }) => {
  switch (type) {
    case Type.HOME:
      return {
        ...state,
        home: payload,
      };
    default:
      return state;
  }
};

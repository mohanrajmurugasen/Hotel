import { Type } from "../Type/Type";

export const homeProduct = (home) => {
  return {
    type: Type.HOME,
    payload: home,
  };
};

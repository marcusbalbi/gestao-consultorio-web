import { cloneDeep } from "lodash";

export const removeEmptyValues = (data: any): any => {
  const result = cloneDeep(data);
  Object.keys(result).forEach((key) => {
    if (!result[key] || result[key] === "") {
      delete result[key];
    }
  });
  return result;
};

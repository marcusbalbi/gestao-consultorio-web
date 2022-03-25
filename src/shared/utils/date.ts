import { format, parse } from "date-fns";

export const parseServerFormat = (date: string): string => {
  return parse(
    date,
    "dd/MM/yyyy",
    new Date()
  ).toISOString();
}


export const parseUIFormat = (date: string): string => {
  return format(
    parse(date, "yyyy-MM-dd", new Date()),
    "dd/MM/yyyy"
  );
}
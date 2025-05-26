import { format } from "date-fns";

export const formatarData = (dataISO) => {
  return format(new Date(dataISO), "dd/MM/yyyy");
};

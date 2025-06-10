import { useLocation } from "react-router-dom";

const ResetAoTrocarPagina = ({ children }) => {
  const location = useLocation();
  return <div key={location.pathname}>{children}</div>;
};

export default ResetAoTrocarPagina;

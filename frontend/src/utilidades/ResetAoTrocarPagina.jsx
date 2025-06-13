import { useLocation } from "react-router-dom";

const ResetAoTrocarPagina = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="root">
      {children}
    </div>
  );
};

export default ResetAoTrocarPagina;

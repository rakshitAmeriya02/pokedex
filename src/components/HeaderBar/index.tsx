import { useCallback, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "src/utils/enums";

const HeaderBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const buttonTitle = useMemo(() => {
    switch (location.pathname) {
      case APP_ROUTES.HOME:
        return "My Pokemon List";
      default:
        return "Home";
    }
  }, [location.pathname]);
  const handleClick = useCallback(() => {
    switch (location.pathname) {
      case APP_ROUTES.HOME:
        navigate(APP_ROUTES.MY_LIST);
        break;
      default:
        navigate(APP_ROUTES.HOME);
        break;
    }
  }, [location.pathname, navigate]);
  return (
    <div className="d-flex justify-content-between mb-2">
      <h2>PokeDex</h2>
      <Button variant="dark" onClick={handleClick}>
        {buttonTitle}
      </Button>
    </div>
  );
};

export default HeaderBar;

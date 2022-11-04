import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { withLayout } from "src/hoc/withLayout";
import { APP_ROUTES } from "src/utils/enums";

const PageNotFound = () => {
  const naviagte = useNavigate();
  const handleRedirect = () => naviagte(APP_ROUTES.HOME);
  return (
    <div className="flex-fill d-flex justify-content-center align-items-center">
      <div>
        <h2>Oops.. seems like you have lost!</h2>
        <Button className="w-100" onClick={handleRedirect} variant="link">
          Go back to Home
        </Button>
      </div>
    </div>
  );
};

export default withLayout(PageNotFound);

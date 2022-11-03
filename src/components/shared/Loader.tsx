import { Spinner } from "react-bootstrap";
import { ShouldRender } from "./ShouldRender";

interface Props {
  loading: boolean;
  loaderText: string;
}

export const Loader = ({ loading, loaderText }: Props) => {
  return (
    <ShouldRender check={loading}>
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white opacity-50">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Spinner animation="grow" />
          <h5 className="mt-4">{loaderText}</h5>
        </div>
      </div>
    </ShouldRender>
  );
};

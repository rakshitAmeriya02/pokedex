import { Form, Spinner } from "react-bootstrap";
import { OFFSET_SIZE_OPTIONS } from "src/utils/constants";
import { useSearchParams } from "react-router-dom";
import { usePokemonList } from "src/hooks/usePokemonList";
import CustomPagination from "src/components/CustomPagination";
import PokemonTable from "src/components/PokemonTable";

function Home() {
  const { offset, limit, loading, pageLength, results, selectedPage } =
    usePokemonList();
  const totalResults = results.count;
  const setSearchParams = useSearchParams()[1];

  const handleLimitChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("page", "1");
      prev.set("limit", value);
      return prev;
    });
  };

  return (
    <div className="p-4 d-flex flex-column min-vh-100">
      <div className="d-flex justify-content-between">
        <h2>PokeDex</h2>
      </div>
      {!loading && (
        <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
          <label>Total Results: {totalResults}</label>
          <Form.Group>
            <Form.Control
              as="select"
              value={limit}
              onChange={(e) => handleLimitChange(e.target.value)}
            >
              {OFFSET_SIZE_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
      )}
      {!loading ? (
        <PokemonTable offset={offset} results={results.results} />
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center flex-fill">
          <Spinner animation="grow" />
          <h5 className="mt-4">
            Please wait while we're loading pokemon details
          </h5>
        </div>
      )}
      <CustomPagination pageLength={pageLength} selectedPage={selectedPage} />
    </div>
  );
}

export default Home;

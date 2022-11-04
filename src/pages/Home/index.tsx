import React from "react";
import { Form } from "react-bootstrap";
import CustomPagination from "src/components/CustomPagination";
import PokemonTable from "src/components/PokemonTable";
import { OFFSET_SIZE_OPTIONS } from "src/utils/constants";
import { useSearchParams } from "react-router-dom";
import { usePokemonList } from "src/hooks/usePokemonList";
import { withLayout } from "src/hoc/withLayout";
import { Loader, ShouldRender } from "src/components/shared";

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
    <React.Fragment>
      <ShouldRender check={Boolean(totalResults)}>
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
        <PokemonTable offset={offset} results={results.results} />
      </ShouldRender>
      <Loader
        loading={loading}
        loaderText="Please wait while we're loading pokemon details"
      />
      <CustomPagination pageLength={pageLength} selectedPage={selectedPage} />
    </React.Fragment>
  );
}

export default withLayout(Home);

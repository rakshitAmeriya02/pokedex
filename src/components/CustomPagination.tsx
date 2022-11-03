import { useMemo } from "react";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

interface Props {
  pageLength: number;
  selectedPage: number;
}

const CustomPagination = ({ pageLength, selectedPage }: Props) => {
  const setSearchParams = useSearchParams()[1];
  const PAGES_TO_SHOW = 5;

  const startPageIndex = useMemo(() => {
    if (selectedPage <= PAGES_TO_SHOW) {
      return 1;
    } else if (selectedPage >= pageLength - 5) {
      return pageLength - 5;
    } else {
      return selectedPage;
    }
  }, [selectedPage, pageLength]);

  const handlePageToggle = (action: "prev" | "next" | "first" | "last") => {
    let newPage = selectedPage;
    switch (action) {
      case "first":
        newPage = 1;
        break;
      case "last":
        newPage = pageLength;
        break;
      case "next":
        newPage = selectedPage + 1 < pageLength ? selectedPage + 1 : newPage;
        break;
      case "prev":
        newPage = selectedPage - 1 > 0 ? selectedPage - 1 : newPage;
        break;
      default:
        break;
    }
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  const handlePageClick = (pageNumber: number) => {
    setSearchParams((prev) => {
      prev.set("page", pageNumber.toString());
      return prev;
    });
  };

  const renderPages = () => {
    const pages = Array.from({ length: PAGES_TO_SHOW }).map(
      (_, index) => startPageIndex + index
    );
    const pageOutput = pages.map((pageNumber) => (
      <Pagination.Item
        key={`page-${pageNumber}`}
        active={pageNumber === selectedPage}
        onClick={() => handlePageClick(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    ));
    if (pageLength > PAGES_TO_SHOW) {
      if (pages.includes(pageLength)) {
        pageOutput.unshift(
          <Pagination.Item
            key={"first-page"}
            active={1 === selectedPage}
            onClick={() => handlePageClick(1)}
          >
            {1}
          </Pagination.Item>,
          <Pagination.Ellipsis key="ellipsis" />
        );
      } else {
        pageOutput.push(
          <Pagination.Ellipsis key="ellipsis" />,
          <Pagination.Item
            key={"last-page"}
            active={pageLength === selectedPage}
            onClick={() => handlePageClick(pageLength)}
          >
            {pageLength}
          </Pagination.Item>
        );
      }
    }
    return pageOutput;
  };

  if (!pageLength) return null;

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.First onClick={() => handlePageToggle("first")} />
        <Pagination.Prev onClick={() => handlePageToggle("prev")} />
        {renderPages()}
        <Pagination.Next onClick={() => handlePageToggle("next")} />
        <Pagination.Last onClick={() => handlePageToggle("last")} />
      </Pagination>
    </div>
  );
};

export default CustomPagination;

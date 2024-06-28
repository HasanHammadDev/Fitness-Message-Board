import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getMessages } from "../MessageApi";
import FilteredList from "./FilteredList";

function FilterComponent() {
  const filterParam = useLocation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const categories = ["Push", "Pull", "Legs", "Nutrition"];
  const [retry, setRetry] = useState(false);

  const handleSelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(
          (unselectedButton) => unselectedButton !== category
        )
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  async function handleFilter() {
    handleSelect();
    const categoriesParam = selectedCategories.join(",");
    const fetchedMessages = await getMessages(categoriesParam);
    setFetchedMessages(fetchedMessages);
  }

  useEffect(() => {
    async function getAllMessages() {
      if(retry) {
        setIsLoading(true);
        setError(false)
      }
      const messages = await getMessages();
      if (messages.error) {
        setIsLoading(false);
        setError(true);
        setRetry(false);
      } else {
        setIsLoading(false);
        setRetry(false);
        setError(false);
        setFetchedMessages(messages);
      }
    }
    getAllMessages();
  }, [retry]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          {filterParam.pathname === "/filtered" ? (
            categories.map((category, index) => (
              <Button
                className="category-button"
                key={index}
                value={category}
                checked={selectedCategories.includes(index)}
                onClick={() => handleSelect(category)}
                variant={
                  selectedCategories.includes(category) ? "primary" : "secondary"
                }
              >
                {category}{" "}
                <span
                  className={
                    selectedCategories.includes(category)
                      ? "d-inline fw-bold"
                      : "d-none"
                  }
                >
                  &#x2713;
                </span>
              </Button>
            ))
          ) : null}

          <div className="beacon">
            <Button className="filter-button" onClick={handleFilter}>
              Filter &#x25bc;
            </Button>
          </div>
        </div>
      )}

      {error ? (
        <div className="d-flex align-items-center justify-content-center">
          <h1 className="error-heading">
            There was an error fetching messages.
          </h1>
          <Button onClick={() => setRetry(true)}>Retry</Button>
        </div>
      ) : (
        <FilteredList filteredMessages={fetchedMessages} />
      )}
    </>
  );
}

export default FilterComponent;

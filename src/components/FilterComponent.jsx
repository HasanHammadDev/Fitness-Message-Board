import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getMessages } from "../MessageApi";
import FilteredList from "./FilteredList";

function FilterComponent() {
  const filterParam = useLocation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const categories = ["Push", "Pull", "Legs", "Nutrition"];

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
      const messages = await getMessages();
      setFetchedMessages(messages);
    }
    getAllMessages();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        {/* {filterParam === "/filtered" ? () : <></>} */}
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
        ) : (
          <></>
        )}

        <div className="beacon">
          <Button className="filter-button" onClick={handleFilter}>
            Filter &#x25bc;
          </Button>
        </div>

      </div>
      <FilteredList filteredMessages={fetchedMessages} />
    </>
  );
}

export default FilterComponent;

import React from "react";
// create custom hook to make this sorting way usable
const useSortableData = (items, config = null) => {
  // sort config will be object of key and direction
  const [sortConfig, setSortConfig] = React.useState(config);
  // useMemo to caching sortedItems function
  // sortedItems is genaric to sort according the key
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);
  // here requestSort fun to change sortConfig when clicking on the feild header
  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  return { items: sortedItems, requestSort, sortConfig };
};
const CoursesTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.courses);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <React.Fragment>
      <h2 className="text-center my-3">Our Courses</h2>
      <p className="ps-2">Tip: you can sort using any field</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <button
                onClick={() => requestSort("title")}
                className={getClassNamesFor("title")}
              >
                Title
              </button>
            </th>
            <th scope="col">
              <button
                onClick={() => requestSort("start")}
                className={getClassNamesFor("start")}
              >
                Start data
              </button>
            </th>
            <th scope="col">
              <button
                onClick={() => requestSort("end")}
                className={getClassNamesFor("end")}
              >
                End data
              </button>
            </th>
            <th scope="col">
              <button
                onClick={() => requestSort("price")}
                className={getClassNamesFor("price")}
              >
                Price
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((course) => {
            return (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.start}</td>
                <td>{course.end}</td>
                <td>{course.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default CoursesTable;

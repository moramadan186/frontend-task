import React from 'react';
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);
    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    return { items: sortedItems, requestSort, sortConfig };
};
const CoursesTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.courses);
    return (
        <React.Fragment>
            <h2 className="text-center my-3">Our Courses</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <button onClick={() => requestSort('title')}>Title</button>
                        </th>
                        <th scope="col">
                            <button onClick={() => requestSort('start')}>Start data</button>
                        </th>
                        <th scope="col">
                            <button onClick={() => requestSort('end')}>End data</button>
                        </th>
                        <th scope="col">
                            <button onClick={() => requestSort('price')}>Price</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(course => {
                        return (
                            <tr key={course.id}>
                                <td>{course.title}</td>
                                <td>{course.start}</td>
                                <td>{course.end}</td>
                                <td>{course.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>);
}
export default CoursesTable;
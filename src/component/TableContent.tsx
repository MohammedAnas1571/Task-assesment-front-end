import { Column, useSortBy, useTable, HeaderGroup } from "react-table";

interface TableContentProps {
  columns: Column<any>[];
  data: any[]; 
}

const TableContent: React.FC<TableContentProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup: HeaderGroup<any>) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => {
                const { key, ...rest } = column.getHeaderProps(column.getSortByToggleProps());
                return (
                  <th
                    key={key}
                    {...rest}
                    className="px-6 py-3 text-center text-sm font-medium text-gray-700 capitalize tracking-wider"
                  >
                    <div className="flex items-center">
                      {column.render('Header')}
                      {(column.id !== 'action' && column.id !== 'role') && (
                        <span className="ml-2 flex flex-col items-center text-xs">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <span className="cursor-pointer">&#9660;</span>
                            ) : (
                              <span className="cursor-pointer">&#9650;</span>
                            )
                          ) : (
                            <>
                              <span className="cursor-pointer">&#9650;</span>
                              <span className="cursor-pointer">&#9660;</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  const { key, ...rest } = cell.getCellProps();
                  return (
                    <td
                      key={key}
                      {...rest}
                      className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 capitalize"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableContent;

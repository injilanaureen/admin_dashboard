import React from 'react';

const ManagementTable = ({ data, emptyMessage, headers }) => {
  return (
    <div className="w-full border rounded-md shadow-md bg-white">
      <div className="flex justify-between px-4 py-2 bg-gray-200">
        <div>{`List ${data?.length > 0 ? "Items" : ""}`}</div>
        <div>{`Add Item`}</div>
      </div>
      <table className="min-w-full text-sm text-gray-600">
        <thead className="bg-gray-100">
          <tr>
            {headers?.map((header, index) => (
              <th key={index} className="py-2 px-2 text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                {headers.map((header, index) => (
                  <td key={index} className="py-2 px-1">
                    {item[header.toLowerCase().replace(/\s+/g, '')] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-3 px-4 text-center" colSpan={headers.length}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagementTable;

import React from "react";

const ManagementTable = ({ data, emptyMessage }) => {
  return (
    <div className="overflow-x-auto border rounded-md shadow-md bg-white">
      <table className="min-w-full text-sm text-gray-600">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Subject</th>
            <th className="py-3 px-4 text-left">Sender</th>
            <th className="py-3 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="py-3 px-4">{item.subject}</td>
                <td className="py-3 px-4">{item.sender}</td>
                <td className="py-3 px-4">{item.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-3 px-4 text-center" colSpan={3}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmailTable;

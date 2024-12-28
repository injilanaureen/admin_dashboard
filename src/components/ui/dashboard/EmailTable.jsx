import React from "react";

const EmailTable = ({
  title,
  data,
  emptyMessage,
  onSearch,
  onDelete,
  onRefresh,
  selectedEmails,
  onSelectAll,
}) => {
  const handleCheckboxChange = (email) => {
    const updatedSelection = selectedEmails.includes(email)
      ? selectedEmails.filter((item) => item !== email)
      : [...selectedEmails, email];
    onSelectAll(updatedSelection);
  };

  return (
    <div className="border rounded-md shadow-md bg-white">
      <div className="p-4 bg-[#1A759F] text-white text-lg font-bold">{title}</div>
      <div className="p-4 bg-gray-100 border-b">
        <input
          type="text"
          placeholder="Search emails..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full py-2 px-4 border rounded-md shadow text-gray-700"
        />
      </div>
      <table className="min-w-full border-collapse text-sm text-gray-700">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 text-left">
              <input
                type="checkbox"
                onChange={(e) =>
                  onSelectAll(e.target.checked ? data : [])
                }
                checked={selectedEmails.length === data.length && data.length > 0}
              />
            </th>
            <th className="py-3 px-4 text-left font-semibold">Subject</th>
            <th className="py-3 px-4 text-left font-semibold">Sender</th>
            <th className="py-3 px-4 text-left font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-50 transition duration-200 ${
                  selectedEmails.includes(item) ? "bg-gray-200" : ""
                }`}
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                </td>
                <td className="py-3 px-4">{item.subject}</td>
                <td className="py-3 px-4">{item.sender}</td>
                <td className="py-3 px-4">{item.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="py-3 px-4 text-center text-gray-500 italic"
                colSpan={4}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600">
        <div>Total Emails: {data.length}</div>
        <div className="flex gap-2">
          <button
            onClick={onDelete}
            className="py-2 px-4 bg-[#D9534F] text-white font-semibold rounded-md shadow hover:bg-[#c9302c]"
          >
            Delete
          </button>
          <button
            onClick={onRefresh}
            className="py-2 px-4 bg-[#0275D8] text-white font-semibold rounded-md shadow hover:bg-[#025aa5]"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailTable;

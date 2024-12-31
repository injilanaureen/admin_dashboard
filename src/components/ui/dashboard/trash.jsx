import React, { useEffect, useState } from "react";
import EmailTable from "./EmailTable";

const Trash = () => {
  const [trashEmails, setTrashEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    const mockTrashEmails = [
      { id: 1, subject: "Old Invoice", sender: "billing@company.com", date: "12/20/2024" },
    ];
    setTrashEmails(mockTrashEmails);
  }, []);

  const handleSearch = (query) => setSearchQuery(query);

  const handleDelete = () => {
    setTrashEmails(trashEmails.filter((email) => !selectedEmails.includes(email)));
    setSelectedEmails([]);
    alert("Deleted selected trash emails!");
  };

  const handleRefresh = () => {
    alert("Trash refreshed!");
  };

  const handleSelectAll = (isChecked) => {
    setSelectedEmails(isChecked ? trashEmails : []);
  };

  const filteredTrash = trashEmails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-cyan-600 mb-4">Trash</h2>
      <div className="overflow-x-auto w-full">
        <EmailTable
          title="Trash Emails"
          data={filteredTrash}
          emptyMessage="No emails in Trash."
          onSearch={handleSearch}
          onDelete={handleDelete}
          onRefresh={handleRefresh}
          selectedEmails={selectedEmails}
          onSelectAll={handleSelectAll}
        />
      </div>
    </div>
  );
};

export default Trash;

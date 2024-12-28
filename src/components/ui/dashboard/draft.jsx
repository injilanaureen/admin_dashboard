import React, { useEffect, useState } from "react";
import EmailTable from "./EmailTable";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    const mockDrafts = [
      { id: 1, subject: "Draft Email 1", sender: "me@mailbox.com", date: "12/26/2024" },
    ];
    setDrafts(mockDrafts);
  }, []);

  const handleSearch = (query) => setSearchQuery(query);

  const handleDelete = () => {
    setDrafts(drafts.filter((email) => !selectedEmails.includes(email)));
    setSelectedEmails([]);
    alert("Deleted selected drafts!");
  };

  const handleRefresh = () => {
    alert("Drafts refreshed!");
  };

  const handleSelectAll = (isChecked) => {
    setSelectedEmails(isChecked ? drafts : []);
  };

  const filteredDrafts = drafts.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-cyan-600 mb-4">Drafts</h2>
      <EmailTable
        title="Draft Emails"
        data={filteredDrafts}
        emptyMessage="No drafts available."
        onSearch={handleSearch}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
        selectedEmails={selectedEmails}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default Drafts;

import React, { useEffect, useState } from "react";
import EmailTable from "./EmailTable";

const Sent = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    const mockSentEmails = [
      { id: 1, subject: "Project Update", sender: "manager@company.com", date: "12/25/2024" },
      { id: 2, subject: "Monthly Report", sender: "ceo@company.com", date: "12/20/2024" },
    ];
    setSentEmails(mockSentEmails);
  }, []);

  const handleSearch = (query) => setSearchQuery(query);

  const handleDelete = () => {
    setSentEmails(sentEmails.filter((email) => !selectedEmails.includes(email)));
    setSelectedEmails([]);
    alert("Deleted selected sent emails!");
  };

  const handleRefresh = () => {
    alert("Sent emails refreshed!");
  };

  const handleSelectAll = (isChecked) => {
    setSelectedEmails(isChecked ? sentEmails : []);
  };

  const filteredSentEmails = sentEmails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-cyan-600 mb-4">Sent</h2>
      <div className="overflow-x-auto w-full">
        <EmailTable
          title="Sent Emails"
          data={filteredSentEmails}
          emptyMessage="No sent emails."
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

export default Sent;

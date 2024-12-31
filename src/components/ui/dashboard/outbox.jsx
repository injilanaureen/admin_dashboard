import React, { useEffect, useState } from "react";
import EmailTable from "./EmailTable";

const Outbox = () => {
  const [outbox, setOutbox] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    const mockOutboxEmails = [
      { id: 1, subject: "Project Update", sender: "manager@company.com", date: "12/25/2024", status: "Pending" },
      { id: 2, subject: "Meeting Reminder", sender: "assistant@company.com", date: "12/26/2024", status: "Pending" },
      { id: 3, subject: "Team Meeting Notes", sender: "ceo@company.com", date: "12/27/2024", status: "Sent" },
    ];
    setOutbox(mockOutboxEmails);
  }, []);

  const handleSearch = (query) => setSearchQuery(query);

  const handleDelete = () => {
    setOutbox(outbox.filter((email) => !selectedEmails.includes(email)));
    setSelectedEmails([]);
    alert("Deleted selected emails!");
  };

  const handleResend = (email) => {
    alert(`Resending email: ${email.subject}`);
  };

  const handleRefresh = () => {
    alert("Outbox refreshed!");
  };

  const handleSelectAll = (isChecked) => {
    setSelectedEmails(isChecked ? outbox : []);
  };

  const filteredOutbox = outbox.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-cyan-600 mb-4">Outbox</h2>
      <div className="overflow-x-auto w-full">
        <EmailTable
          title="Outbox Emails"
          data={filteredOutbox}
          emptyMessage="No emails in Outbox."
          onSearch={handleSearch}
          onDelete={handleDelete}
          onResend={handleResend}
          onRefresh={handleRefresh}
          selectedEmails={selectedEmails}
          onSelectAll={handleSelectAll}
        />
      </div>
    </div>
  );
};

export default Outbox;

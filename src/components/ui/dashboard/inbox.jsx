import React, { useState } from "react";
import EmailTable from "./EmailTable";

const Inbox = () => {
  const [emails, setEmails] = useState([
    { id: 1, subject: "Welcome to Inbox", sender: "admin@mailbox.com", date: "12/28/2024", status: "Read" },
    { id: 2, subject: "Meeting Reminder", sender: "team@company.com", date: "12/27/2024", status: "Read" },
  ]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  // Handle refreshing emails
  const handleRefresh = () => {
    alert("Emails refreshed! (Mock functionality)");
  };

  // Handle deleting selected emails
  const handleDelete = () => {
    const remainingEmails = emails.filter((email) => !selectedEmails.includes(email));
    setEmails(remainingEmails);
    setSelectedEmails([]);
    alert("Selected emails deleted!");
  };

  // Handle selecting/deselecting all emails
  const handleSelectAll = (selected) => {
    setSelectedEmails(selected);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-cyan-600 mb-4">Inbox</h2>
      <EmailTable
        title="Inbox Emails"
        data={emails}
        emptyMessage="No emails in Inbox."
        onSearch={(searchTerm) => {
          const filteredEmails = emails.filter(
            (email) =>
              email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
              email.sender.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setEmails(filteredEmails);
        }}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
        selectedEmails={selectedEmails}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default Inbox;

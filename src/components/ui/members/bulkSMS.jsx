import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const mockMembers = [
  {
    id: 1,
    memberId: "AP755059",
    memberName: "Emantor Test",
    contactInfo: "7014954198",
    email: "support@emantor.com",
    ownerId: "COMPANY",
    package: "API Partner",
    joiningDate: "2024-06-03",
    status: "Active",
  },
  {
    id: 2,
    memberId: "COMPANY",
    memberName: "NIKATBY ADMIN",
    contactInfo: "7257912695",
    email: "nikatby.pgpay@gmail.com",
    ownerId: "COMPANY",
    package: "Free Package",
    joiningDate: "2024-06-03",
    status: "Active",
  },
];

const BulkSMS = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [smsMessage, setSmsMessage] = useState("");
  const [dltTemplateId, setDltTemplateId] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("send");

  const handleMemberSelect = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleSendSMS = () => {
    if (selectedMembers.length === 0 || smsMessage.trim() === "") {
      alert("Please select members and enter an SMS message.");
      return;
    }

    const newSentMessage = {
      id: Date.now(),
      members: selectedMembers.map((id) => mockMembers.find((m) => m.id === id)),
      message: smsMessage,
      templateId: dltTemplateId,
      date: new Date().toLocaleString(),
    };
    setSentMessages([...sentMessages, newSentMessage]);
    setSmsMessage("");
    setDltTemplateId("");
    setSelectedMembers([]);
  };

  return (
    <div className="p-6 mx-10 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Send Bulk SMS</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col w-full md:w-1/4 h-auto gap-4 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {selectedMembers.length} selected / {mockMembers.length} total
            </p>
          </div>
          <button
            className={`py-2 px-4 rounded-lg transition-all font-medium ${
              activeTab === "send"
                ? "bg-primary-color text-btn-text-color"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("send")}
          >
            Sent
          </button>
          <button
            className={`py-2 px-4 rounded-lg transition-all font-medium ${
              activeTab === "trash"
                ? "bg-primary-color text-btn-text-color"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("trash")}
          >
            Trash
          </button>
        </div>

        <div className="flex-1">
          {activeTab === "send" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border p-4 rounded-lg shadow bg-white">
                <p className="font-semibold text-gray-700">Selected Members</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  {selectedMembers.map((id) => {
                    const member = mockMembers.find((m) => m.id === id);
                    return (
                      <li key={id}>
                        {member.memberName} ({member.contactInfo})
                      </li>
                    );
                  })}
                </ul>
                <button
                  className="bg-orange-400 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-700 transition-all"
                  onClick={() => document.getElementById("memberModal").showModal()}
                >
                  Choose Members
                </button>
              </div>

              <div className="border p-4 rounded-lg shadow bg-white">
                <p className="font-semibold text-gray-700">SMS Message</p>
                <textarea
                  className="w-full border p-2 rounded-lg mt-2 text-gray-600 focus:outline-none focus:ring focus:ring-blue-200"
                  rows="5"
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  placeholder="Enter your message here..."
                ></textarea>
              </div>

              <div className="border p-4 rounded-lg shadow bg-white">
                <p className="font-semibold text-gray-700">DLT Template ID</p>
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg mt-2 text-gray-600 focus:outline-none focus:ring focus:ring-blue-200"
                  value={dltTemplateId}
                  onChange={(e) => setDltTemplateId(e.target.value)}
                  placeholder="Enter DLT Template ID"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-primary-color text-black py-2 px-4 rounded-lg bg-orange-400 hover:bg-green-600 transition-all"
                  onClick={handleSendSMS}
                >
                  Send SMS
                </button>
              </div>

              {sentMessages.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-semibold text-gray-800">Sent Messages</h2>
                  {sentMessages.map((message) => (
                    <div
                      key={message.id}
                      className="border p-4 mt-4 bg-gray-50 rounded-lg shadow"
                    >
                      <p className="font-semibold text-gray-700">To:</p>
                      <p className="text-gray-600">
                        {message.members
                          .map((member) => member.contactInfo)
                          .join(", ")}
                      </p>
                      <p className="font-semibold text-gray-700">Message:</p>
                      <p className="text-gray-600">{message.message}</p>
                      <p className="font-semibold text-gray-700">Date:</p>
                      <p className="text-gray-600">{message.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "trash" && (
            <div className="mt-6">
              <h2 className="font-semibold text-gray-800">Trash Messages</h2>
              <p className="text-gray-600">No messages in trash.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for selecting members */}
      <dialog id="memberModal" className="p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="font-bold text-lg text-gray-800">Choose Members</h2>
        <ul className="mt-4 space-y-2">
          {mockMembers.map((member) => (
            <li
              key={member.id}
              className="flex items-center cursor-pointer gap-2 hover:bg-gray-100 p-2 rounded"
              onClick={() => handleMemberSelect(member.id)}
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectedMembers.includes(member.id)}
              />
              <span className="text-gray-700">
                {member.memberName} ({member.contactInfo})
              </span>
            </li>
          ))}
        </ul>
        <button
          className="bg-black text-white py-2 px-4 mt-4 rounded-lg hover:bg-gray-800 transition-all"
          onClick={() => document.getElementById("memberModal").close()}
        >
          Done
        </button>
      </dialog>
    </div>
  );
};

export default BulkSMS;

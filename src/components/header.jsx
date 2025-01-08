import React, { useState, useEffect } from 'react';

export default function Header({ isOpen, setIsOpen, unreadEmails = [], isFullscreen, toggleFullscreen, onNavigate }) {
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);
  const [isAlertDropdownOpen, setIsAlertDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCalendarClicked, setIsCalendarClicked] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  // Handler for fullscreen
  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    toggleFullscreen();
  };

  const toggleEmailDropdown = () => {
    setIsEmailDropdownOpen(!isEmailDropdownOpen);
    setIsAlertDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setIsCalendarClicked(false);
  };

  const toggleAlertDropdown = () => {
    setIsAlertDropdownOpen(!isAlertDropdownOpen);
    setIsEmailDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setIsCalendarClicked(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsEmailDropdownOpen(false);
    setIsAlertDropdownOpen(false);
    setIsCalendarClicked(false);
  };

  const handleCalendarClick = () => {
    setIsCalendarClicked(!isCalendarClicked);
    setIsEmailDropdownOpen(false);
    setIsAlertDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const defaultUnreadEmails = [
    { id: 101, subject: "Default Email 1", sender: "default@mail.com", date: "01/01/2025" },
    { id: 102, subject: "Default Email 2", sender: "default@mail.com", date: "01/01/2025" },
  ];

  const emailsToDisplay = unreadEmails.length > 0 ? unreadEmails : defaultUnreadEmails;

  const mockAlerts = [
    { id: 1, message: "New user joined", type: "User Activity" },
    { id: 2, message: "Payment received", type: "Transaction" },
    { id: 3, message: "System update completed", type: "System" },
  ];

  useEffect(() => {
    setAlerts(mockAlerts);

    if (isCalendarClicked) {
      const updateTime = () => {
        const now = new Date();
        const formattedTime = now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setCurrentTime(formattedTime);
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }
  }, [isCalendarClicked]);

  const userData = {
    profileImage: "/images/waiter_1155216.png",
    name: "Injila Naureen",
    lastLoginDate: "1/8/2025 1:44:26 PM",
    currentIP: "49.36.181.123",
    lastLoginIP: "49.36.181.123",
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'}`}>
      <div className="bg-red-500 flex items-center justify-between pl-4 md:pl-6 lg:pl-8 pr-2 md:pr-4 lg:pr-6 h-auto">
        <div className="flex gap-3 md:gap-4 lg:gap-5 p-2 md:p-3 lg:p-4 items-center justify-center">
          <button 
            onClick={() => onNavigate && onNavigate('/')} 
            className="flex items-center focus:outline-none"
          >
            {isOpen ? (
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-white">Administrator</h3>
            ) : (
              <img src="/images/home.svg" className="size-5 md:size-6 lg:size-7" alt="home" />
            )}
          </button>
          <img
            className="size-4 md:size-4 lg:size-6"
            src="/images/waffle-menu.png"
            alt="dropdown"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        <div className="flex gap-4 md:gap-6 lg:gap-8 items-right justify-center relative">
          {/* Message icon */}
          <div className="relative">
            <img
              src="/images/message.svg"
              alt="message"
              className="size-4 md:size-5 lg:size-6 cursor-pointer"
              onClick={toggleEmailDropdown}
            />
            {emailsToDisplay.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {emailsToDisplay.length}
              </span>
            )}

            {/* Email Dropdown */}
            {isEmailDropdownOpen && (
              <div className="absolute z-50 top-10 right-0 bg-white border border-gray-300 shadow-lg w-64 rounded-md">
                <h4 className="text-gray-500 px-4 py-2 border-b">Unread Emails</h4>
                {emailsToDisplay.length > 0 ? (
                  <ul className="max-h-40 overflow-y-auto">
                    {emailsToDisplay.map((email) => (
                      <li key={email.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <p className="font-semibold">{email.subject}</p>
                        <p className="text-sm text-gray-500">{email.sender}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-2 text-gray-500">No unread emails.</p>
                )}
              </div>
            )}
          </div>

          {/* Alert icon */}
          <div className="relative">
            <img
              src="/images/alert.svg"
              alt="alert"
              className="size-4 md:size-5 lg:size-6 cursor-pointer"
              onClick={toggleAlertDropdown}
            />
            {alerts.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {alerts.length}
              </span>
            )}

            {/* Alert Dropdown */}
            {isAlertDropdownOpen && (
              <div className="absolute z-50 top-10 right-0 bg-white border border-gray-300 shadow-lg w-64 rounded-md">
                <h4 className="text-gray-500 px-4 py-2 border-b">Alerts</h4>
                {alerts.length > 0 ? (
                  <ul className="max-h-40 overflow-y-auto">
                    {alerts.map((alert) => (
                      <li key={alert.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <p className="font-semibold">{alert.message}</p>
                        <p className="text-sm text-gray-500">{alert.type}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-2 text-gray-500">No new alerts.</p>
                )}
              </div>
            )}
          </div>

          {/* Expand button */}
          <img
            src="/images/expand.svg"
            alt="expand"
            className={`size-4 md:size-5 lg:size-6 cursor-pointer transition-transform duration-300 ${
              isFullscreen ? 'rotate-45' : ''
            }`}
            onClick={handleFullscreen}
          />

          {/* Calendar */}
          <div className="relative">
            <img
              src="/images/calender.svg"
              alt="calendar"
              className="size-4 md:size-5 lg:size-6"
              onClick={handleCalendarClick}
            />
            {isCalendarClicked && (
              <span className="z-10 absolute top-10 right-0 text-white font-semibold bg-black p-1 rounded w-80 h-10 text-clip whitespace-nowrap">
                {currentTime}
              </span>
            )}
          </div>

          {/* User icon */}
          <div className="relative">
            <img
              src="/images/user.svg"
              alt="user"
              className="size-4 md:size-5 lg:size-6 cursor-pointer"
              onClick={toggleUserDropdown}
            />

            {/* User Dropdown */}
            {isUserDropdownOpen && (
              <ul className="dropdown-menu absolute z-10 bg-red-500 shadow-lg rounded-md w-64 right-0 mt-5">
                <li className="user-header p-4 h-44 flex flex-col gap-2 items-center text-center">
                  <img
                    className="img-circle w-20 h-20 object-cover"
                    src={userData.profileImage}
                    alt="User Image"
                  />
                  <p>
                    <span className="text-lg text-white font-semibold">{userData.name}</span>
                    <small className="block text-sm text-white">
                      Last Login Date: {userData.lastLoginDate}
                    </small>
                  </p>
                </li>

                <li className="user-body flex justify-between p-4 items-center text-center text-sm text-blue-400 bg-gray-100">
                  <div>Current IP: {userData.currentIP}</div>
                  <div>Last Login IP: {userData.lastLoginIP}</div>
                </li>

                <li className="user-footer p-4 text-center bg-gray-200">
                  <button 
                    onClick={() => onNavigate && onNavigate('/profile')} 
                    className="text-sm text-blue-500 hover:underline focus:outline-none"
                  >
                    Profile
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Content container that expands in fullscreen mode */}
      <div className={`transition-all duration-300 ${isFullscreen ? 'h-screen' : 'h-auto'}`}>
        {/* Your page content goes here */}
      </div>
    </div>
  );
}

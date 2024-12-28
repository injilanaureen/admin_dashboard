// EmailManager.js
const fetchEmails = async () => {
    const response = await fetch("/data.json"); // Adjust path if necessary
    const data = await response.json();
    return data;
  };
  
  export const EmailManager = {
    emails: null,
  
    async init() {
      if (!this.emails) {
        this.emails = await fetchEmails();
      }
      return this.emails;
    },
  
    getEmails(folder) {
      return this.emails[folder] || [];
    },
  
    addEmail(folder, newEmail) {
      this.emails[folder].push(newEmail);
      return this.emails[folder];
    },
  
    deleteEmail(folder, emailId) {
      this.emails[folder] = this.emails[folder].filter(email => email.id !== emailId);
      return this.emails[folder];
    },
  
    moveEmail(fromFolder, toFolder, emailId) {
      const email = this.emails[fromFolder].find(email => email.id === emailId);
      if (email) {
        this.deleteEmail(fromFolder, emailId);
        email.status = toFolder === "sent" ? "sent" : email.status;
        this.addEmail(toFolder, email);
      }
    }
  };
  
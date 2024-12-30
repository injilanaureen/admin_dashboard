import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import components/pages corresponding to each route
import Dashboard from '../components/ui/dashboard/dashboard';
import MyMailbox from '../components/ui/dashboard/mymailbox';
import Compose from '../components/ui/dashboard/compose';
import Inbox from '../components/ui/dashboard/inbox';
import Outbox from '../components/ui/dashboard/outbox';
import Drafts from '../components/ui/dashboard/draft';
import Trash from '../components/ui/dashboard/trash';
import Sent from '../components/ui/dashboard/sent';
import MyCMS from '../components/ui/cmsMangement/cms';
import ManageBanner from '../components/ui/cmsMangement/manageBanner';
import ManageWebPages from '../components/ui/cmsMangement/manageWebPages';
import ManageWebMenus from '../components/ui/cmsMangement/manageWebMenus';
import ManageSocialLinks from '../components/ui/cmsMangement/manageSocialLinks';
import MembersSummary from '../components/ui/members/Members';
import MembersKYC from '../components/ui/members/membersKYC';
import MembersRights from '../components/ui/members/membersRights';
import BulkSMS from '../components/ui/members/bulkSMS';
import BulkEmail from '../components/ui/members/bulkEmail';
import Packages from '../components/ui/members/packages';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root Dashboard Route */}
      <Route path="/" element={<Dashboard />}/>
        
        {/* Mailbox Section with Nested Routes */}
        <Route path="/mailbox" element={<MyMailbox />}>
          <Route index element={<Compose />} /> {/* Default route */}
          <Route path="inbox" element={<Inbox />} />
          <Route path="outbox" element={<Outbox />} />
          <Route path="draft" element={<Drafts />} />
          <Route path="sent" element={<Sent />} />
          <Route path="trash" element={<Trash />} />
          <Route path="compose" element={<Compose />} />
        </Route>

        {/* CMS Management Section */}
        <Route path="/cms" element={<MyCMS />}>
          <Route path="banner" element={<ManageBanner />} />
          <Route path="pages" element={<ManageWebPages />} />
          <Route path="menus" element={<ManageWebMenus />} />
          <Route path="social-links" element={<ManageSocialLinks />} />
        </Route>

        {/* Members Section */}
        <Route path="/members">
  <Route path="packages" element={<Packages />} />
  <Route path="manage" element={<MembersSummary />} />
  <Route path="kyc" element={<MembersKYC />} />
  <Route path="rights" element={<MembersRights />} />
  <Route path="sms" element={<BulkSMS />} />
  <Route path="compose" element={<MyMailbox/>} /> {/* Route for Bulk Email */}
</Route>
        
        {/* Add more sections here if needed */}
        
      {/* </Route> */}

      {/* Payout System */}
      {/* <Route path="/payout">
        <Route path="transactions" element={<PayoutTransactions />} />
        <Route path="pending" element={<PayoutPendingTransactions />} />
        <Route path="disputes" element={<PayoutDisputeTransactions />} />
        <Route path="refunds" element={<PayoutRefund />} />
        <Route path="report" element={<PayoutProfitReport />} />
      </Route> */}

      {/* UPI System */}
      {/* <Route path="/upi">
        <Route path="transactions" element={<UPITransactions />} />
        <Route path="pending" element={<UPIPendingTransactions />} />
        <Route path="disputes" element={<UPIDisputeTransactions />} />
        <Route path="report" element={<UPIProfitReport />} />
      </Route> */}

      {/* Wallet System */}
      {/* <Route path="/wallet">
        <Route path="request" element={<ManageFundRequest />} />
        <Route path="credit" element={<ManageFundCredit />} />
        <Route path="debit" element={<ManageFundDebit />} />
        <Route path="balance" element={<ManageMinimumBalance />} />
        <Route path="transactions" element={<AllWalletTransactions />} />
      </Route> */}

      {/* Recharge System */}
      {/* <Route path="/recharge">
        <Route path="types" element={<ManageServiceTypes />} />
        <Route path="operators" element={<ManageOperators />} />
        <Route path="codes" element={<ManageOperatorsCodes />} />
        <Route path="circles" element={<ManageCircles />} />
        <Route path="circles-codes" element={<ManageCirclesCodes />} />
        <Route path="commission" element={<ManageCommission />} />
        <Route path="refund" element={<RefundRecharge />} />
      </Route> */}

      {/* API Management */}
      {/* <Route path="/api">
        <Route path="sms" element={<SMSAPI />} />
        <Route path="recharge" element={<RechargeAPI />} />
      </Route> */}

      {/* Reports */}
      {/* <Route path="/reports">
        <Route path="wallet-balance" element={<EWalletBalance />} />
        <Route path="recharge-transactions" element={<RechargeTransactions />} />
        <Route path="pending-recharges" element={<PendingRecharges />} />
        <Route path="profit" element={<MyProfit />} />
        <Route path="disputes" element={<DisputeSettlement />} />
      </Route> */}

      {/* General Settings */}
      {/* <Route path="/settings">
        <Route path="countries" element={<ManageCountries />} />
        <Route path="states" element={<ManageStates />} />
        <Route path="cities" element={<ManageCities />} />
        <Route path="banks" element={<ManageBanks />} />
        <Route path="bank-accounts" element={<ManageBankAccounts />} />
        <Route path="company" element={<ManageCompany />} />
        <Route path="news" element={<ManageNews />} />
        <Route path="notice-board" element={<ManageNoticeBoard />} />
        <Route path="banner" element={<ManageBanner />} />
        <Route path="chat" element={<ManageLiveChat />} />
        <Route path="website-control" element={<WebsiteControl />} />
        <Route path="email" element={<EmailSetting />} />
        <Route path="login-details" element={<MyLoginDetails />} />
      </Route> */}

      {/* Help & Support */}
      {/* <Route path="/support">
        <Route path="departments" element={<ManageTicketDepartments />} />
        <Route path="priorities" element={<ManageTicketPriorities />} />
        <Route path="tickets" element={<ListAllTickets />} />
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;

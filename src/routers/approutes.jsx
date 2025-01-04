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
import PayoutTransactions from '../components/ui/payout/payoutTransaction';
import PayoutPendingTransactions from '../components/ui/payout/payoutPendingTransaction';
import PayoutDisputeTransactions from '../components/ui/payout/payoutDisputeTransaction';
import PayoutRefund from '../components/ui/payout/payoutRefund';
import PayoutProfitReport from '../components/ui/payout/payoutProfitReport';
import UserTypes from '../components/ui/users/userTypes';
import Users from '../components/ui/users/users';
import UserRights from '../components/ui/users/userRights';
import UpiTransactions from '../components/ui/upiservices/upiTransactions';
import UpiPendingTransactions from '../components/ui/upiservices/upiPendingTransactions';
import UpiDisputeTransactions from '../components/ui/upiservices/upiDisputeTransaction';
import ProfitReport from '../components/ui/upiservices/upiProfitReport';
import MemberFundRequest from '../components/ui/wallet/fundRequest';
import ManageFundCredit from '../components/ui/wallet/fundCredit';
import ManageFundDebit from '../components/ui/wallet/fundDebit';
import ManageMinimumBalance from '../components/ui/wallet/minbalance';
import AllWalletTransactions from '../components/ui/wallet/allWallet';
import RefundRecharge from '../components/ui/recharge/refundRecharge';
import ManageServiceTypes from '../components/ui/recharge/serviceTypes';
import ManageOperators from '../components/ui/recharge/operators';
import ManageOperatorsCodes from '../components/ui/recharge/operatorCodes';
import ManageCircles from '../components/ui/recharge/circles';
import ManageCirclesCodes from '../components/ui/recharge/circleCodes';
import ManageCommission from '../components/ui/recharge/commission';
import ManageTicketDepartments from '../components/ui/help/ticketDepartment';
import ManageTicketPriorities from '../components/ui/help/ticketPriorities';
import ListAllTickets from '../components/ui/help/allTickets';
import EWalletBalance from '../components/ui/reports/eWalletBalance';
import RechargeTransactions from '../components/ui/reports/rechargeTransactions';
import PendingRecharges from '../components/ui/reports/pendingRecharges';
import MyProfit from '../components/ui/reports/myProfit';
import DisputeSettlement from '../components/ui/reports/rechargeDisputeTransaction';
import ManageAPI from '../components/ui/api/manageApi';
import ManageTemplates from '../components/ui/api/smstemplate';


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
        
      

      {/* Payout System */}
      <Route path="/payout">
        <Route path="transactions" element={<PayoutTransactions />} />
        <Route path="pending" element={<PayoutPendingTransactions />} />
        <Route path="disputes" element={<PayoutDisputeTransactions />} />
        <Route path="refunds" element={<PayoutRefund />} />
        <Route path="report" element={<PayoutProfitReport />} />
      </Route>

      {/* Users */}
      <Route path="/users">
        <Route path="types" element={<UserTypes />} />
        <Route path="user" element={<Users />} />
        <Route path="rights" element={<UserRights />} />
       
      </Route>
      
      {/* UPI System */}
      <Route path="/upi">
        <Route path="transactions" element={<UpiTransactions />} />
        <Route path="pending" element={<UpiPendingTransactions />} />
        <Route path="disputes" element={<UpiDisputeTransactions />} />
        <Route path="report" element={<ProfitReport />} />
      </Route>

      {/* Wallet System */}
      <Route path="/wallet">
        <Route path="request" element={<MemberFundRequest />} />
        <Route path="credit" element={<ManageFundCredit />} />
        <Route path="debit" element={<ManageFundDebit />} />
        <Route path="balance" element={<ManageMinimumBalance />} />
        <Route path="transactions" element={<AllWalletTransactions />} />
      </Route>

      {/* Recharge System */}
      <Route path="/recharge">
         <Route path="types" element={<ManageServiceTypes />} />
       <Route path="operators" element={<ManageOperators />} />
        <Route path="codes" element={<ManageOperatorsCodes />} />
        <Route path="circles" element={<ManageCircles />} />
         <Route path="circles-codes" element={<ManageCirclesCodes />} />
        <Route path="commission" element={<ManageCommission />} /> 
        <Route path="refund" element={<RefundRecharge />} />
      </Route>

      {/* API Management */}


{/*// Main API route with children*/}
<Route path="/api"> 
      {/* SMS API route with nested children */}
       <Route path="sms" >
         <Route path="manage" element={<ManageAPI />} />
         <Route path="templates" element={<ManageTemplates />} />
      </Route> 
{/* 
       <Route path="recharge">
        <Route path="balance" element={<APIBalance />} />
        <Route path="addbalance" element={<AddAPIBalance />} />
        <Route path="deductbalance" element={<DeductAPIBalance />} />
        <Route path="switch" element={<APISwitching />} />
        <Route path="operator" element={<ChangeAPIOperator />} />
        <Route path="package" element={<ChangeAPIPackage />} />
        <Route path="amount" element={<ChangeAPIAmount />} />
        <Route path="priority" element={<ChangeAPIPriority />} />
      </Route>*/}
    </Route>  


      {/* Reports */}
      <Route path="/reports">
        <Route path="wallet-balance" element={<EWalletBalance />} />
        <Route path="recharge-transactions" element={<RechargeTransactions />} />
        <Route path="pending-recharges" element={<PendingRecharges />} />
        <Route path="profit" element={<MyProfit />} />
        <Route path="disputes" element={<DisputeSettlement />} />
      </Route> 

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
      <Route path="/support">
        <Route path="departments" element={<ManageTicketDepartments />} />
        <Route path="priorities" element={<ManageTicketPriorities />} />
        <Route path="tickets" element={<ListAllTickets />} />
      </Route> 
    </Routes>
  );
};

export default AppRoutes;

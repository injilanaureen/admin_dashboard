import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components/pages corresponding to each route
// Assuming you have a component for each route
import Dashboard from '../components/ui/dashboard/dashboard';
import MyMailbox from '../components/ui/dashboard/mymailbox';
import Compose from '../components/ui/dashboard/compose';
import Inbox from '../components/ui/dashboard/inbox';
import Outbox from '../components/ui/dashboard/outbox';
import ManageBanner from '../components/ui/dashboard/dashboard';
import ManageWebPages from '../components/ui/dashboard/dashboard';
import ManageWebMenus from '../components/ui/dashboard/dashboard';
import ManageSocialLinks from '../components/ui/dashboard/dashboard';
import MembersSummary from '../components/ui/dashboard/membersSummary';
import MembersKYC from '../components/ui/members/membersKYC';
import MembersRights from '../components/ui/members/membersRights';
import BulkSMS from '../components/ui/members/bulkSMS';
import BulkEmail from '../components/ui/members/bulkEmail';
import Packages from '../components/ui/members/packages';
import Drafts from '../components/ui/dashboard/draft';
import Trash from '../components/ui/dashboard/trash';
// Add all other components similarly

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        
        <Route path="/mailbox" element={<MyMailbox />}>
            <Route path="compose" element={<Compose />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="outbox" element={<Outbox />} />
            <Route path="draft" element={<Drafts />} />
            <Route path="trash" element={<Trash />} />
        </Route>
     

        {/* CMS Management */}  
        <Route path="/cms/banner" element={<ManageBanner />} />
        <Route path="/cms/pages" element={<ManageWebPages />} />
        <Route path="/cms/menus" element={<ManageWebMenus />} />
        <Route path="/cms/social-links" element={<ManageSocialLinks />} />

        {/* Members */}
        <Route path="/members/packages" element={<Packages/>} />
        <Route path="/members/manage" element={<MembersSummary />} />
        <Route path="/members/kyc" element={<MembersKYC />} />
        <Route path="/members/rights" element={<MembersRights />} />
        <Route path="/members/sms" element={<BulkSMS />} />
        <Route path="/members/email" element={<BulkEmail />} />
{/* 
        Payout Service
        <Route path="/payout/transactions" element={<PayoutTransactions />} />
        <Route path="/payout/pending" element={<PayoutPendingTransactions />} />
        <Route path="/payout/disputes" element={<PayoutDisputeTransactions />} />
        <Route path="/payout/refunds" element={<PayoutRefund />} />
        <Route path="/payout/report" element={<PayoutProfitReport />} />

        {/* Users */}
        {/* <Route path="/users/types" element={<ManageUserTypes />} />
        <Route path="/users/manage" element={<ManageUsers />} />
        <Route path="/users/rights" element={<ManageUserRights />} /> */}

        {/* UPI Services */}
        {/* <Route path="/upi/transactions" element={<UPITransactions />} />
        <Route path="/upi/pending" element={<UPIPendingTransactions />} />
        <Route path="/upi/disputes" element={<UPIDisputeTransactions />} />
        <Route path="/upi/report" element={<UPIProfitReport />} /> */}

        {/* Wallet System */}
        {/* <Route path="/wallet/request" element={<ManageFundRequest />} />
        <Route path="/wallet/credit" element={<ManageFundCredit />} />
        <Route path="/wallet/debit" element={<ManageFundDebit />} />
        <Route path="/wallet/balance" element={<ManageMinimumBalance />} />
        <Route path="/wallet/transactions" element={<AllWalletTransactions />} /> */}

        {/* Recharge System */}
        {/* <Route path="/recharge/types" element={<ManageServiceTypes />} />
        <Route path="/recharge/operators" element={<ManageOperators />} />
        <Route path="/recharge/codes" element={<ManageOperatorsCodes />} />
        <Route path="/recharge/circles" element={<ManageCircles />} />
        <Route path="/recharge/circles-codes" element={<ManageCirclesCodes />} />
        <Route path="/recharge/commission" element={<ManageCommission />} />
        <Route path="/recharge/refund" element={<RefundRecharge />} /> */}

        {/* API Management */}
        {/* <Route path="/api/sms" element={<SMSAPI />} />
        <Route path="/api/recharge" element={<RechargeAPI />} /> */}

        {/* Reports */}
        {/* <Route path="/reports/wallet-balance" element={<EWalletBalance />} />
        <Route path="/reports/recharge-transactions" element={<RechargeTransactions />} />
        <Route path="/reports/pending-recharges" element={<PendingRecharges />} />
        <Route path="/reports/profit" element={<MyProfit />} />
        <Route path="/reports/disputes" element={<DisputeSettlement />} /> */}

        {/* General Settings */}
        {/* <Route path="/settings/countries" element={<ManageCountries />} />
        <Route path="/settings/states" element={<ManageStates />} />
        <Route path="/settings/cities" element={<ManageCities />} />
        <Route path="/settings/banks" element={<ManageBanks />} />
        <Route path="/settings/bank-accounts" element={<ManageBankAccounts />} />
        <Route path="/settings/company" element={<ManageCompany />} />
        <Route path="/settings/news" element={<ManageNews />} />
        <Route path="/settings/notice-board" element={<ManageNoticeBoard />} />
        <Route path="/settings/banner" element={<ManageBanner />} />
        <Route path="/settings/chat" element={<ManageLiveChat />} />
        <Route path="/settings/website-control" element={<WebsiteControl />} />
        <Route path="/settings/email" element={<EmailSetting />} />
        <Route path="/settings/login-details" element={<MyLoginDetails />} /> */}

        {/* Help & Support */}
        {/* <Route path="/support/departments" element={<ManageTicketDepartments />} />
        <Route path="/support/priorities" element={<ManageTicketPriorities />} />
        <Route path="/support/tickets" element={<ListAllTickets />} />  */}

      </Routes>
  );
};

export default AppRoutes;

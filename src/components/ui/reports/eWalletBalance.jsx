import React, { useEffect, useState } from "react";
import { Wallet, List, FileText, Printer, File, Download } from "lucide-react";

const EWalletBalance = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        memberId: "",
        memberInfo: "",
        status: "0", // Default status is 0 (All)
    });

    const memberInfoOptions = [
        "Emantor Test",
        "NIKATBY ADMIN (NIKATBY TECHNOLOGY PRIVATE LIMITED)",
    ];

    const memberIdOptions = ["AP755059 (API Partner)", "COMPANY (Administrator)"];

    useEffect(() => {
        // Mock data with the required fields
        const mockData = [
            {
                id: 1,
                memberID: "AP755059 (API Partner)",
                memberInfo: "Emantor Test",
                contactInfo: "7014954198\nsupport@emantor.com",
                joiningDate: "06/03/2024",
                lienAmount: 0.0,
                totalBalance: 1087.9,
                status: "Active",
            },
            {
                id: 2,
                memberID: "COMPANY (Administrator)",
                memberInfo: "NIKATBY ADMIN (NIKATBY TECHNOLOGY PRIVATE LIMITED)",
                contactInfo: "7257912695\nnikatby.pgpay@gmail.com",
                joiningDate: "06/03/2024",
                lienAmount: 0.0,
                totalBalance: 1.0,
                status: "Active",
            },
        ];
        setData(mockData);
    }, []);

    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const handleSearch = () => {
        const { memberInfo, memberId, status } = filters;

        const filteredData = data.filter((transaction) => {
            const matchesMemberInfo =
                !memberInfo || transaction.memberInfo === memberInfo;
            const matchesMemberId =
                !memberId || transaction.memberID === memberId;
            const matchesStatus =
                status === "0" || transaction.status.toLowerCase() === status.toLowerCase();

            return matchesMemberInfo && matchesMemberId && matchesStatus;
        });

        setFilteredTransactions(filteredData);
    };

    useEffect(() => {
        setFilteredTransactions(data); // Initialize the table with all data
    }, [data]);

    const totalLienAmount = filteredTransactions.reduce(
        (sum, transaction) => sum + transaction.lienAmount,
        0
    );
    const totalWalletBalance = filteredTransactions.reduce(
        (sum, transaction) => sum + transaction.totalBalance,
        0
    );

    return (
       <div className="bg-gray-100 p-2 ml-10">
       <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
         <FileText className=" w-6 h-6" />
         <span>Reports</span>
       </div>
       <div className=" p-4 md:p-10 lg:p-2 bg-white bt-2 border-cyan-600">
         <h3 className=" flex items-center gap-2 text-xl md:text-xl font-bold text-cyan-600 mb-4">
         <List className=" w-7 h-7" />
         List Members Balance        
          </h3>

            <div className=" p-4 ">
                {/* Filters Section */}
                <div className="border rounded p-4 mb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <select
                            name="memberInfo"
                            className="border rounded p-2 text-sm sm:text-base"
                            onChange={(e) =>
                                setFilters({ ...filters, memberInfo: e.target.value })
                            }
                        >
                            <option value="">Select Member Info</option>
                            {memberInfoOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select
                            name="memberId"
                            className="border rounded p-2 text-sm sm:text-base"
                            onChange={(e) =>
                                setFilters({ ...filters, memberId: e.target.value })
                            }
                        >
                            <option value="">Select Member ID</option>
                            {memberIdOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="mt-4 bg-cyan-600 text-white p-2 rounded"
                        onClick={handleSearch}
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Total Lien Amount and Wallet Balance Section */}
                <div className="flex flex-col md:flex-row lg:flex-row items-center mb-4">
                    <div className="bg-green-200 w-full sm:w-1/2 p-2 text-center text-xs sm:text-sm">
                        Downline Total Wallet Balance: <strong>{totalWalletBalance.toFixed(2)}</strong>
                    </div>
                    <div className="bg-red-200 w-full sm:w-1/2 p-2 text-center text-xs sm:text-sm">
                        Downline Total Lien Amount: <strong>{totalLienAmount.toFixed(2)}</strong>
                    </div>
                </div>

                {/* Transaction Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border text-xs sm:text-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-left">#</th>
                                <th className="p-3 text-left">Member ID</th>
                                <th className="p-3 text-left">Member Info</th>
                                <th className="p-3 text-left">Contact Info</th>
                                <th className="p-3 text-left">Joining Date</th>
                                <th className="p-3 text-left">Lien Amount</th>
                                <th className="p-3 text-left">Total Balance</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((row, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{row.memberID}</td>
                                        <td className="p-3">{row.memberInfo}</td>
                                        <td className="p-3 whitespace-pre-wrap">{row.contactInfo}</td>
                                        <td className="p-3">{row.joiningDate}</td>
                                        <td className="p-3">{row.lienAmount.toFixed(2)}</td>
                                        <td className="p-3">{row.totalBalance.toFixed(2)}</td>
                                        <td className="p-3">{row.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="p-3 text-center text-gray-500">
                                        No Record Found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    );
};

export default EWalletBalance;

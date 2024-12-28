import React,{useState, useRef, useEffect} from "react";

const MembersSummary = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [maxHeight, setMaxHeight]= useState("0px");
  const constantRef= useRef(null);

  useEffect(()=>{
      if(constantRef.current){
        setMaxHeight(isCollapsed ? "0px" : `${constantRef.current.scrollHeight}px`)

      }
  },[isCollapsed])

  return (
<div className="p-6 bg-white rounded-lg shadow-md">
      
  {/* Header */}
     <div className="flex justify-between items-center border-b-2 pb-2">
        <h2 className="text-base font-bold">Members Summary</h2>
        <button
          className="text-lg font-bold cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Shortcuts"
        >
          {isCollapsed ? "+" : "-"}
        </button>
      </div>  

  {/* Table */}
  <div style={{maxHeight}} className="overflow-hidden transition-max-height duration-1000 ease-in-out">

  <div  ref={constantRef}>

    <div className="overflow-x-auto" >
    <table className="w-full border-collapse border rounded-sm border-gray-300 text-sm md:text-base">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="border border-gray-300 py-3 px-4 text-left">Metrics</th>
          <th className="border border-gray-300 py-3 px-4 text-center">Today</th>
          <th className="border border-gray-300 py-3 px-4 text-center">This Week</th>
          <th className="border border-gray-300 py-3 px-4 text-center">This Month</th>
          <th className="border border-gray-300 py-3 px-4 text-center">This Year</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 py-3 px-4 text-gray-600">Sign Up</td>
          <td className="border border-gray-300 py-3 px-4 text-center">0</td>
          <td className="border border-gray-300 py-3 px-4 text-center">0</td>
          <td className="border border-gray-300 py-3 px-4 text-center">0</td>
          <td className="border border-gray-300 py-3 px-4 text-center">2</td>
        </tr>
        <tr>
          <td className="border border-gray-300 py-3 px-4 text-gray-600">Sign In</td>
          <td className="border border-gray-300 py-3 px-4 text-center">0</td>
          <td className="border border-gray-300 py-3 px-4 text-center">0</td>
          <td className="border border-gray-300 py-3 px-4 text-center">0</td>
          <td className="border border-gray-300 py-3 px-4 text-center">16</td>
        </tr>
      </tbody>
    </table>
  </div>


  {/* Summary Details */}
  <div className="mt-6 space-y-4">
    <div className="flex justify-between items-center">
      <span className="text-gray-700">Total Members:</span>
      <span className="font-bold text-gray-900">2</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-700">Pending Fund Requests:</span>
      <span className="font-bold text-gray-900">0</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-700">Pending Tickets:</span>
      <span className="font-bold text-gray-900">0</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-700">Pending Member KYC:</span>
      <span className="font-bold text-gray-900">1</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-700">Members E-Wallet Balance:</span>
      <span className="font-bold text-primary-color">1,087.90</span>
    </div>
  </div>
  </div>
  </div>

</div>

  );
};

export default MembersSummary;

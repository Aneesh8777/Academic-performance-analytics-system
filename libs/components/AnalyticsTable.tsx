// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface AnalyticsRow {
//   subject: string;
//   avg_cia1: number;
//   avg_cia2: number;
//   avg_final: number;
// }

// function AnalyticsTable() {
//   const [data, setData] = useState<AnalyticsRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchAnalytics() {
//       try {
//         const response = await axios.get("/api/marks/describe");
//         setData(response.data);
//       } catch (err: any) {
//         console.error("❌ Analytics fetch failed:", err);
//         setError("Failed to load analytics data.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAnalytics();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading analytics...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center mt-8">
//       <h1 className="text-4xl font-extrabold text-teal-500 mb-4">📊 Student Performance Analytics</h1>
//       <table className="border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-800 text-white">
//             <th className="px-6 py-3 border border-gray-300">Subject</th>
//             <th className="px-6 py-3 border border-gray-300">Avg CIA1</th>
//             <th className="px-6 py-3 border border-gray-300">Avg CIA2</th>
//             <th className="px-6 py-3 border border-gray-300">Avg Final</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr
//               key={index}
//               className="bg-gray-100 hover:bg-gray-200 transition-colors"
//             >
//               <td className="px-6 py-3 border border-gray-300 text-center">{row.subject}</td>
//               <td className="px-6 py-3 border border-gray-300 text-center">{row.avg_cia1}</td>
//               <td className="px-6 py-3 border border-gray-300 text-center">{row.avg_cia2}</td>
//               <td className="px-6 py-3 border border-gray-300 text-center">{row.avg_final}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AnalyticsTable;
// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// interface AnalyticsData {
//   subject: string;
//   cia1: number;
//   cia2: number;
//   final: number;
// }

// function AnalyticsTable() {
//   const [data, setData] = useState<AnalyticsData[]>([]);

//   async function fetchAnalytics() {
//     try {
//       const res = await axios.get("/api/marks/averagebytest");
//       const formattedData = res.data.map((item: any) => ({
//         subject: item.subject,
//         cia1: parseFloat(item.avg_cia1),
//         cia2: parseFloat(item.avg_cia2),
//         final: parseFloat(item.avg_final),
//       }));
//       setData(formattedData);
//     } catch (error) {
//       console.error("Error fetching analytics:", error);
//     }
//   }

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   return (
//     <div className="w-full px-10 py-10 flex flex-col items-center">
//       <h1 className="text-4xl text-teal-400 font-extrabold flex items-center mb-8">
//         <span className="mr-2">📊</span> Student Performance Analytics
//       </h1>

//       {/* ✅ Table */}
//       <table className="w-3/4 text-center border-collapse border border-gray-300 shadow-md">
//         <thead>
//           <tr className="bg-slate-900 text-white">
//             <th className="p-3 border border-gray-300">Subject</th>
//             <th className="p-3 border border-gray-300">Avg CIA1</th>
//             <th className="p-3 border border-gray-300">Avg CIA2</th>
//             <th className="p-3 border border-gray-300">Avg Final</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, i) => (
//             <tr key={i} className="hover:bg-gray-100">
//               <td className="p-3 border border-gray-300">{row.subject}</td>
//               <td className="p-3 border border-gray-300">{row.cia1.toFixed(2)}</td>
//               <td className="p-3 border border-gray-300">{row.cia2.toFixed(2)}</td>
//               <td className="p-3 border border-gray-300">{row.final.toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ✅ Bar Chart */}
//       <div className="w-full h-[400px] mt-10">
//         <ResponsiveContainer width="90%" height="100%">
//           <BarChart
//             data={data}
//             margin={{
//               top: 20,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="subject" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="cia1" fill="#60A5FA" name="Avg CIA1" />
//             <Bar dataKey="cia2" fill="#34D399" name="Avg CIA2" />
//             <Bar dataKey="final" fill="#F472B6" name="Avg Final" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// export default AnalyticsTable;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AnalyticsData {
  subject: string;
  cia1: number;
  cia2: number;
  final: number;
}

function AnalyticsTable() {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchAnalytics() {
    try {
      const res = await axios.get("/api/marks/averagebytest");
      console.log("📊 Analytics Response:", res.data);

      const formattedData = res.data.map((item: any) => ({
        subject: item.subject,
        cia1: parseFloat(item.avg_cia1),
        cia2: parseFloat(item.avg_cia2),
        final: parseFloat(item.avg_final),
      }));
      setData(formattedData);
    } catch (err: any) {
      console.error("❌ Error fetching analytics:", err);
      setError("Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading analytics...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="w-full px-10 py-10 flex flex-col items-center">
      <h1 className="text-4xl text-teal-400 font-extrabold flex items-center mb-8">
        <span className="mr-2">📊</span> Student Performance Analytics
      </h1>

      {/* ✅ Table */}
      <table className="w-3/4 text-center border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="p-3 border border-gray-300">Subject</th>
            <th className="p-3 border border-gray-300">Avg CIA1</th>
            <th className="p-3 border border-gray-300">Avg CIA2</th>
            <th className="p-3 border border-gray-300">Avg Final</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="p-3 border border-gray-300">{row.subject}</td>
              <td className="p-3 border border-gray-300">{row.cia1.toFixed(2)}</td>
              <td className="p-3 border border-gray-300">{row.cia2.toFixed(2)}</td>
              <td className="p-3 border border-gray-300">{row.final.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Bar Chart */}
      <div className="w-full h-[400px] mt-10">
        <ResponsiveContainer width="90%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cia1" fill="#60A5FA" name="Avg CIA1" />
            <Bar dataKey="cia2" fill="#34D399" name="Avg CIA2" />
            <Bar dataKey="final" fill="#F472B6" name="Avg Final" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsTable;

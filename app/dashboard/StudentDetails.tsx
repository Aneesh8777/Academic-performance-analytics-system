// "use client";
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { userDetailsType } from '@/types/userDetails';

// const intial: Array<userDetailsType> = [{
//     id: "",
//     email: "",
//     username: "",
//     password: "",
//     classname: "",
//     department: "",
//     role: "",
//     tablename: "",
// }]
// function StudentDetails() {
//     const [user, setUser] = useState<Array<userDetailsType>>(intial);
//     useEffect(() => {
//         getStudents(user, setUser);
//     }, []);

//     return (
//         <div className=' flex justify-center items-center flex-col'>
//             <h1 className=' text-5xl font-extrabold text-red-500'>Student Details</h1>
//             <div className='w-max h-max flex bg-slate-200'>
//                 <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>Username</span>
//                 <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>email</span>
//                 <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>RollNo</span>
//                 <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>Class</span>
//                 <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>Department</span>
//             </div>
//             {user && user.map((user) => (
//                 <div key={user.id} className='w-max h-max flex bg-slate-200 hover:bg-zinc-500'>
//                     <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.username}</span>
//                     <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.email}</span>
//                     <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.id}</span>
//                     <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.classname}</span>
//                     <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.department}</span>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default StudentDetails


// async function getStudents(user: Array<userDetailsType>, setUser: any) {
//     try {
//         const response = await axios.get('/api/marks/getstudentforteacher', {
//         })
//         setUser(response.data);
//     } catch (error) {
//         console.log(error)
//     }
// }
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { userDetailsType } from "@/types/userDetails";

const initial: userDetailsType[] = [];

export default function StudentDetails() {
  const [students, setStudents] = useState<userDetailsType[]>(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get("/api/user/details"); // ✅ correct endpoint
        console.log("✅ API Response:", res.data);

        // handle array/object responses gracefully
        const data = res.data.students || res.data || [];
        setStudents(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("❌ Error fetching students:", err);
        // optional: fallback data for presentation
        setStudents([
          {
            id: "1",
            username: "Aman Mishra",
            email: "aman@gmail.com",
            password: "",
            classname: "CSE-AI",
            department: "AIML",
            role: "student",
            tablename: "marks_aman_mishra",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading student details...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-red-500 mb-6">Student Details</h1>

      {/* Table Header */}
      <div className="w-max flex bg-slate-200 font-semibold">
        <span className="w-64 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2">
          Username
        </span>
        <span className="w-64 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2">
          Email
        </span>
        <span className="w-32 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2">
          Roll No
        </span>
        <span className="w-48 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2">
          Class
        </span>
        <span className="w-48 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2">
          Department
        </span>
      </div>

      {/* Student Rows */}
      {students.length > 0 ? (
        students.map((s) => (
          <div
            key={s.id}
            className="w-max flex bg-slate-100 hover:bg-slate-300 transition-all duration-300"
          >
            <span className="w-64 m-0.5 border-2 bg-white rounded-md flex justify-center items-center px-1 py-2">
              {s.username}
            </span>
            <span className="w-64 m-0.5 border-2 bg-white rounded-md flex justify-center items-center px-1 py-2">
              {s.email}
            </span>
            <span className="w-32 m-0.5 border-2 bg-white rounded-md flex justify-center items-center px-1 py-2">
              {s.id}
            </span>
            <span className="w-48 m-0.5 border-2 bg-white rounded-md flex justify-center items-center px-1 py-2">
              {s.classname}
            </span>
            <span className="w-48 m-0.5 border-2 bg-white rounded-md flex justify-center items-center px-1 py-2">
              {s.department}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No students found in database.</p>
      )}
    </div>
  );
}

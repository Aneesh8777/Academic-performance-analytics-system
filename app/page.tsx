
// import React from 'react'
// import Link from 'next/link'
// export default function page() {
//   return (
//     <div className="hero min-h-screen bg-base-200">
//       <div className="hero text-center">
//         <div className=" w-max">
//           <h1 className="text-8xl font-bold">Student Performance Tracking</h1>
//           <p className="py-6 text-2xl text-fuchsia-800">Student Performance Tracking is a web application built using NextJS and MySQL which helps student and teachers to track academic progress.</p>
//           <Link href='/users/login' className="btn btn-primary px-24">Login</Link>
//         </div>
//       </div>

//     </div>
//   )
// }
"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">
        🎓 Student Performance Tracking System
      </h1>
      <p className="text-gray-600 mb-12 text-lg">
        Track, analyze, and improve student performance efficiently.
      </p>
      <div className="flex gap-6">
        <Link
          href="/users/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200"
        >
          Login
        </Link>
        <Link
          href="/users/signup"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

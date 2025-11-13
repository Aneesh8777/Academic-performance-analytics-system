// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { userDetailsType } from "@/types/userDetails";
// function PostMarks() {
//     const [subjects, SetSubjects] = useState<Array<string>>([]);
//     let [isStudent, SetStudent] = useState<boolean>(true);
//     async function getTable() {
//         const res = await axios.get("/api/marks/describe");
//         // console.log(res.data);
//         const sub = res.data.map((item: { Field: string }) => {
//             return item.Field;
//         });
//         SetSubjects(sub);
//         let localuser: any = JSON.parse(window.localStorage.getItem("user")!);
//         if (localuser.role === "teacher") SetStudent(false);
//     }
//     useEffect(() => {
//         getTable();
//     }, [])
//     if (isStudent) return <> </>;
//     else {
//         return (
//             <div className=" w-full px-10 rounded-lg py-24">
//                 <h1 className=" text-4xl text-teal-400 font-extrabold py-10 text-center">
//                     Post Marks
//                 </h1>
//                 <div className="flex bg-black px-1 rounded-lg">
//                     {subjects &&
//                         subjects.map((sub, index) => (
//                             <div
//                                 key={index}
//                                 className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1 p-2 bg-zinc-600"
//                             >
//                                 {sub.toUpperCase()}
//                             </div>
//                         ))}
//                     <div className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1 p-2 bg-zinc-600">
//                         Post
//                     </div>
//                 </div>
//                 <form
//                     method="post"
//                     action="/api/marks/postmarks"
//                     className="flex"
//                 >
//                     {subjects &&
//                         subjects.map((sub, index) => (
//                             <div key={index}
//                                 className="flex px-0.5 bg-zinc-100 ">
//                                 <input
//                                     type="text"
//                                     name={`${sub}`}
//                                     id={`${sub}`}
//                                     placeholder={`${sub}`}
//                                     className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-black m-0.5 px-1.5 bg-zinc-200" required
//                                 />
//                             </div>
//                         ))}
//                     <div className="flex w-max h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1.5 px-10 bg-zinc-600">
//                         <input type="submit" value="submit" className="text-black" />
//                     </div>
//                 </form>

//                 <form action="" method="post"></form>
//             </div>
//         );
//     }
// }

// export default PostMarks;

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function PostMarks() {
//   const [subjects, SetSubjects] = useState<Array<string>>([]);
//   const [isStudent, SetStudent] = useState<boolean>(true);

//   // ✅ Fetch table structure or analytics columns safely
//   async function getTable() {
//     try {
//       const res = await axios.get("/api/marks/describe");

//       let sub: string[] = [];

//       if (Array.isArray(res.data) && res.data.length > 0) {
//         if ("Field" in res.data[0]) {
//           // 👩‍🎓 Student case — backend returned DESCRIBE table
//           sub = res.data.map((item: any) => item.Field);
//         } else if ("subject" in res.data[0]) {
//           // 👩‍🏫 Teacher analytics case — backend returned average data
//           sub = ["subject", "cia1", "cia2", "final"];
//         }
//       }

//       SetSubjects(sub);

//       const localuser = JSON.parse(window.localStorage.getItem("user") || "{}");
//       if (localuser.role === "teacher") SetStudent(false);
//     } catch (err) {
//       console.error("❌ Error loading table data:", err);
//     }
//   }

//   useEffect(() => {
//     getTable();
//   }, []);

//   if (isStudent) return <></>; // hide for students

//   return (
//     <div className="w-full px-10 rounded-lg py-24">
//       <h1 className="text-4xl text-teal-400 font-extrabold py-10 text-center">
//         Post Marks
//       </h1>

//       {/* ✅ Table Header */}
//       <div className="flex bg-black px-1 rounded-lg">
//         {subjects.map((sub, index) => (
//           <div
//             key={index}
//             className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1 p-2 bg-zinc-600"
//           >
//             {sub ? sub.toUpperCase() : "UNKNOWN"}
//           </div>
//         ))}
//         <div className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1 p-2 bg-zinc-600">
//           Post
//         </div>
//       </div>

//       {/* ✅ Form */}
//       <form
//         method="post"
//         action="/api/marks/postmarks"
//         className="flex flex-wrap mt-2"
//       >
//         {subjects.map((sub, index) => (
//           <div key={index} className="flex px-0.5 bg-zinc-100">
//             <input
//               type="text"
//               name={sub}
//               id={sub}
//               placeholder={sub}
//               className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-black m-0.5 px-1.5 bg-zinc-200"
//               required
//             />
//           </div>
//         ))}

//         <div className="flex w-max h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1.5 px-10 bg-zinc-600 cursor-pointer">
//           <input
//             type="submit"
//             value="Submit"
//             className="text-white font-bold cursor-pointer"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default PostMarks;
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function PostMarks() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    CIA1: "",
    CIA2: "",
    FINAL: "",
  });

  // Fetch table schema and determine role
  async function getTable() {
    try {
      const res = await axios.get("/api/marks/describe");
      const localUser = JSON.parse(window.localStorage.getItem("user")!);
      if (localUser?.role === "teacher") setIsTeacher(true);
      // Optional: check fields returned by DB
      console.log("Describe Result:", res.data);
    } catch (err) {
      console.error("Error getting table:", err);
    }
  }

  useEffect(() => {
    getTable();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit marks
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/marks/postmarks", formData);
      alert(res.data.message || "Marks added successfully ✅");
      setFormData({ subject: "", CIA1: "", CIA2: "", FINAL: "" });
    } catch (error: any) {
      console.error("Error posting marks:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error adding marks ❌");
    }
  };

  if (!isTeacher) return <></>;

  return (
    <div className="w-full px-10 rounded-lg py-24">
      <h1 className="text-4xl text-teal-400 font-extrabold py-10 text-center">
        Post Marks
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md w-1/2 mx-auto"
      >
        <div className="w-full mb-4">
          <label className="block font-semibold mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          <div>
            <label className="block font-semibold mb-1">CIA1</label>
            <input
              type="number"
              name="CIA1"
              value={formData.CIA1}
              onChange={handleChange}
              placeholder="CIA1 Marks"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">CIA2</label>
            <input
              type="number"
              name="CIA2"
              value={formData.CIA2}
              onChange={handleChange}
              placeholder="CIA2 Marks"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Final</label>
            <input
              type="number"
              name="FINAL"
              value={formData.FINAL}
              onChange={handleChange}
              placeholder="Final Marks"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          Submit Marks
        </button>
      </form>
    </div>
  );
}

export default PostMarks;

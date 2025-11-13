// import React from 'react'
// import { LinkToOthers } from '@/libs/components/GetMarks'
// import FilterComponents from '@/libs/components/FilterComponents'
// function page() {
//   return (
//     <div>
//       <LinkToOthers />
//       <FilterComponents />
//     </div>
//   )
// }

// export default page

import React from "react";
import { LinkToOthers } from "@/libs/components/GetMarks";
import AnalyticsTable from "@/libs/components/AnalyticsTable";

function page() {
  return (
    <div>
      <LinkToOthers />
      <AnalyticsTable />
    </div>
  );
}

export default page;


import React from "react";

interface ProfileData {
  label: string;
  value: React.ReactNode;
}

const CorporateProfileTable = () => {
  const profileData: ProfileData[] = [
    { label: "Company Name", value: "Pegatron Australia Inc." },
    { label: "Representative", value: "James Lin" },
    { label: "Establishment", value: "November 15, 2018" },
    { label: "Business", value: "Computer related services" },
    {
      label: "Location",
      value: "Unit 4/5 Talavera Rd, Macquarie Park, NSW 2113",
    },
    { label: "Phone number", value: "12345" },
    { label: "No. of Employees", value: "450 (Temporary worker included)" },
    { label: "Permits and Licenses", value: "License No.123312321" },
    {
      label: "Parent company",
      value: (
        <a
          href="https://www.pegatroncorp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Pegatron Corporation(Taiwan)
        </a>
      ),
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {profileData.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {item.label}
              </td>
              <td className="px-6 py-4">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CorporateProfileTable;

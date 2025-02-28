import React from "react";
import TeamBanner from "@/components/TeamBanner";
import TeamMemeber from "@/components/TeamMemeber";
import CompanyEnvironment from "@/components/CompanyEnvironment";

const page = () => {
  return (
    <div>
      <TeamBanner />
      <TeamMemeber />
      <CompanyEnvironment />
    </div>
  );
};

export default page;

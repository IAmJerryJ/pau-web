import React from "react";
import ContactsBanner from "@/components/ContactsBanner";
import ContactsInfo from "@/components/ContactsInfo";
import PAUMap from "@/components/PAUMap";

const page = () => {
  return (
    <div>
      <ContactsBanner />
      <ContactsInfo />
      <div className="w-full h-full flex flex-col bg-white py-12">
        <div className="container mx-auto">
          <PAUMap />
        </div>
      </div>
    </div>
  );
};

export default page;

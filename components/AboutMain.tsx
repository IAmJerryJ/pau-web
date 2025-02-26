"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CorporateProfileTable from "@/components/CorporateProfileTable";
import PAUMap from "@/components/PAUMap";

const AboutMain = () => {
  return (
    <div className="bg-[#f5f5f5] w-full">
      <div className="container mx-auto py-16 px-4">
        <Tabs defaultValue="corporate-profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <TabsList className="flex flex-col w-full h-auto space-y-2 bg-transparent p-0">
                <TabsTrigger
                  value="corporate-profile"
                  className="justify-start text-left w-full py-3 px-4 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-medium border-l-4 data-[state=active]:border-primary border-transparent"
                >
                  Corporate Profile
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="justify-start text-left w-full py-3 px-4 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-medium border-l-4 data-[state=active]:border-primary border-transparent"
                >
                  History
                </TabsTrigger>
                <TabsTrigger
                  value="philosophy"
                  className="justify-start text-left w-full py-3 px-4 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-medium border-l-4 data-[state=active]:border-primary border-transparent"
                >
                  Company Philosophy
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="md:w-3/4 min-h-[600px] px-10">
              <TabsContent
                value="corporate-profile"
                className="space-y-4 flex flex-col gap-10"
              >
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-yellow-600">
                    Corporate Profile
                  </h2>
                  <p className="text-gray-600">
                    PEGATRON Australia is a proud member of the PEGATRON
                    Corporation group based in Taiwan. The history of the
                    establishment of the Australian branch dates back to 2018.
                    Our business offers customers a wide range of services in
                    the field of production, service and storage of electronic
                    products.
                  </p>
                  <CorporateProfileTable />
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-yellow-600">
                    Our Location
                  </h2>
                  <PAUMap />
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <h2 className="text-2xl font-bold text-yellow-600">History</h2>
                <p className="text-gray-600">
                  Pega was founded in 2005 and has grown from a small startup to
                  become a leader in the industry. Over the past few years, we
                  have experienced rapid growth and development, expanding our
                  business scope and market share.
                </p>
                <p className="text-gray-600">
                  Our success is due to our relentless pursuit of quality and
                  innovation, as well as our strong relationships with our
                  clients. We look forward to continuing our journey to success
                  and laying a solid foundation for future growth.
                </p>
              </TabsContent>

              <TabsContent value="philosophy" className="space-y-4">
                <h2 className="text-2xl font-bold text-yellow-600">
                  Company Philosophy
                </h2>
                <p className="text-gray-600">
                  Our company philosophy is based on integrity, innovation, and
                  excellence. We believe that only by conducting business in an
                  honest and transparent manner can we establish long-term trust
                  and successful partnerships.
                </p>
                <p className="text-gray-600">
                  We encourage innovation and creative thinking, constantly
                  seeking opportunities for improvement and development. We
                  strive for excellence in all aspects, from product quality to
                  customer service, from employee development to community
                  engagement.
                </p>
                <p className="text-gray-600">
                  Our goal is not only to be a successful business, but also to
                  be a responsible corporate citizen, making a positive
                  contribution to our community and environment.
                </p>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AboutMain;

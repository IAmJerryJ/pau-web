import React from "react";

const About = () => {
  return (
    <div className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-5">
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 font-bold">
            About Us
          </p>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight lg:text-4xl mt-5 max-w-2xl mx-auto">
            10 Long Years Of Manufacturing Excellence With Quality At It's Best!
          </h2>
        </div>

        {/* Company Introduction */}
        <div className="mb-4">
          <div>
            <div className="px-4 py-5 sm:p-6 text-center max-w-4xl mx-auto">
              <p className="text-gray-700 mb-4">
                We are a company focused on innovative technology solutions,
                established in 2015. For over a decade, we have continuously
                explored and pushed technological boundaries to provide
                exceptional products and services to clients.
              </p>
              <p className="text-gray-700 mb-4">
                With our professional team and advanced technology, we have
                successfully helped hundreds of businesses achieve digital
                transformation, improve operational efficiency, and create
                greater business value.
              </p>
              <p className="text-gray-700">
                We believe that the power of technology lies in improving how
                people live and work. This belief drives us to constantly
                innovate and pursue excellence.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

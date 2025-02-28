"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "James Lin",
    position: "CEO",
    image: "/team/CEO.jpg",
    description:
      "James Lin is the CEO of our company. He has over 20 years of industry experience and has held executive positions in several well-known companies. His leadership and strategic vision have enabled the company to achieve 300% growth over the past 5 years. He is passionate about innovation and team building, believing that only through continuous learning and adaptation can one maintain competitiveness in a rapidly changing market.",
  },
  {
    id: 2,
    name: "Tai Le",
    position: "Business Development",
    image: "/team/Manager-1.jpg",
    description:
      "Tai Le is our Business Development Manager. He has extensive experience in digital marketing and brand strategy, having successfully launched multiple products into international markets. His innovative thinking and market insights are valuable assets to the company.",
  },
  {
    id: 3,
    name: "Sam Xie",
    position: "PD Manager",
    image: "/team/Manager-2.jpg",
    description:
      "Sam Xie is responsible for the company's operations management. His meticulous management and process optimization capabilities have saved the company significant costs. He holds an MBA from Harvard Business School and has led numerous international projects. He believes effective communication and team collaboration are key to success.",
  },
  {
    id: 4,
    name: "Michael Ma",
    position: "SQE Manager",
    image: "/team/Engineer-Lead1.jpg",
    description:
      "Michael Ma is our SQE Manager. He has extensive experience in digital marketing and brand strategy, having successfully launched multiple products into international markets. His innovative thinking and market insights are valuable assets to the company.",
  },
  {
    id: 5,
    name: "Grace Zhang",
    position: "HR",
    image: "/team/HR.jpg",
    description:
      "Grace Zhang is our HR Director who has established a comprehensive talent recruitment and development system. She focuses on corporate culture building and employee development, making the company a best employer for three consecutive years. She believes talent is the company's most important resource and is committed to creating a work environment that supports innovation and personal growth.",
  },
  {
    id: 6,
    name: "Casear Zhang",
    position: "Engineer Manager",
    image: "/team/Engineer-Lead2.jpg",
    description:
      "Casear Zhang is responsible for product development and quality control. He has rich project management experience and has successfully led the development of multiple complex projects. He focuses on user experience and product details, dedicated to creating quality products that meet customer needs.",
  },
];

const TeamMemeber: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const showMemberDetails = (id: number) => {
    setShowDetails(id);
  };

  const closeDetails = () => {
    setShowDetails(null);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = activeIndex * (300 + 16); // card width + margin
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Team Structure</h2>

        <div className="flex items-center">
          <button
            onClick={prevSlide}
            className="flex-shrink-0 mr-2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
            aria-label="Previous slide"
          >
            <IconChevronLeft size={24} />
          </button>

          <div className="relative flex-grow overflow-hidden">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 py-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`flex-shrink-0 w-[300px] snap-center cursor-pointer transition-all duration-300 ${
                    index === activeIndex
                      ? "scale-105 shadow-xl"
                      : "scale-100 shadow-md"
                  }`}
                  onClick={() => showMemberDetails(member.id)}
                >
                  <div className="bg-white rounded-lg overflow-hidden h-[400px] flex flex-col">
                    <div className="relative h-[250px] w-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-gray-600 mb-2">{member.position}</p>
                      <p className="text-gray-700 text-sm line-clamp-3 relative">
                        {member.description}
                        <span className="absolute bottom-0 right-0 left-0 h-6 bg-gradient-to-t from-white to-transparent"></span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="flex-shrink-0 ml-2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
            aria-label="Next slide"
          >
            <IconChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Team Member Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {teamMembers.find((m) => m.id === showDetails) && (
              <>
                <div className="relative h-[300px] w-full">
                  <Image
                    src={teamMembers.find((m) => m.id === showDetails)!.image}
                    alt={teamMembers.find((m) => m.id === showDetails)!.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {teamMembers.find((m) => m.id === showDetails)!.name}
                      </h2>
                      <p className="text-gray-600">
                        {
                          teamMembers.find((m) => m.id === showDetails)!
                            .position
                        }
                      </p>
                    </div>
                    <button
                      onClick={closeDetails}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-700">
                    {teamMembers.find((m) => m.id === showDetails)!.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemeber;

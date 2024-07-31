import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

interface TestimonyCardProps {
  name: string;
  testimony: string;
  avatar: string;
}

const TestimonyCard: React.FC<TestimonyCardProps> = ({
  name,
  testimony,
  avatar,
}) => {
  return (
    <div className="relative max-w-md mx-auto">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden pt-12">
        <div className="flex justify-center -mt-12">
          <img
            className="w-20 h-20  absolute mt-[-40px] rounded-full shadow-md"
            src={avatar}
            alt={`${name}'s avatar`}
          />
        </div>
        <CardContent className="px-6 py-8 text-center h-[220px]">
          <p className="text-gray-700 text-base">
            <span>
              <FaQuoteLeft className="text-gray-500 text-xl mb-2" />
            </span>
            <span className="text-xl">{testimony}</span>
            <span>
              <FaQuoteRight className="text-gray-500  absolute right-9 text-xl mb-2" />
            </span>
          </p>
        </CardContent>
        <CardFooter className="font-semibold text-xl text-center w-full">
          <p className="text-gray-700 w-full">{name}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestimonyCard;

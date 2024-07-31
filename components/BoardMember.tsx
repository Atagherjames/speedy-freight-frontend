import React from "react";

interface BoardMemberProps {
  name: string;
  position: string;
  src: string;
}

const BoardMemberCard: React.FC<BoardMemberProps> = ({
  name,
  position,
  src,
}) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-[#ffffff] z-20 rounded-xl shadow-md overflow-hidden m-4">
      <img className=" w-[300px] h-[300px]" src={src} alt={name} />
      <div className="p-8 bg-[#ffffff]">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {name}
        </div>
        <p className="mt-1 text-lg leading-tight font-medium text-black hover:underline">
          {position}
        </p>
      </div>
    </div>
  );
};

export default BoardMemberCard;

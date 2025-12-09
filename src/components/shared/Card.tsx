import Image from "next/image";
import React from "react";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import play from "@/public/images/play.svg";
import starCircle from "@/public/images/star-circle.svg";
import kingdomCheck from "@/public/images/kingdom-check.svg";

// جميع الخصائص اختيارية
interface CardProps {
  image?: string;
  title?: string;
  name?: string;
  date?: string;
  rating?: string;
  personImage?: string;
}

const Card: React.FC<CardProps> = ({ image, title, name, date, rating, personImage }) => {
  return (
    <div className="">
      <div className="relative w-full sm:w-[260px] h-auto min-w-[200px] min-h-[300px] max-w-[260px] max-h-[474px] rounded-[19px]">
        {image && ( // شرط: إذا لم يتم تمرير الصورة، لا يتم عرض العنصر
          <div className="relative w-full h-[474px] rounded-[19px]">
            <Image src={image} alt="kingdom" fill className="object-cover rounded-[19px]" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 rounded-[19px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <Image src={play} alt="play" />
          <h2 className="text-[18px] text-white">00:37</h2>
        </div>
        <div className="absolute flex flex-col items-center top-2 right-2 z-10">
          <Image src={starCircle} alt="star" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex gap-2">
          {personImage && ( // شرط: إذا لم يتم تمرير صورة الشخص، لا يتم عرضها
            <Image src={personImage} alt="person" className="w-[44px] h-[44px] rounded-full" />
          )}
          <div>
            {name && ( // شرط: إذا لم يتم تمرير الاسم، لا يتم عرضه
              <div className="flex items-center gap-1">
                <h2>{name}</h2>
                <Image src={kingdomCheck} alt="kingdomCheck" className="w-[19.25px] h-[19.25px]" />
                {rating && ( // شرط: إذا لم يتم تمرير التقييم، لا يتم عرضه
                  <div className="text-[#F68223] flex items-center gap-1">
                    <FaStar />
                    <span className="text-[15px] font-bold">{rating}</span>
                  </div>
                )}
              </div>
            )}
            {date && ( // شرط: إذا لم يتم تمرير التاريخ، لا يتم عرضه
              <div className="flex items-center gap-2 text-gray-400">
                <FaCalendarAlt />
                <span>{date}</span>
              </div>
            )}
            {title && <h2 className="text-[18px] text-[#333C52] w-[209px]">{title}</h2>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Image } from "@nextui-org/react";

interface ImagesPet {
  id: number;
  image: string;
  pet: number;
}
interface CarrouselProps {
  images: ImagesPet[];
  name: string;
}

interface Image {
  id: number;
  image: string;
  pet: number;
}
const Carrousel: React.FC<CarrouselProps> = ({ name, images }) => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="max-w-md"
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <div>
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={name}
                className="w-full object-cover h-[240px]"
                src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${item.image}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carrousel;

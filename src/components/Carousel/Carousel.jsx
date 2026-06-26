import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import styles from "./Carousel.module.css";

function Carousel({ data, renderItem }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div ref={prevRef} className={styles.prev}>
        <LeftArrow />
      </div>

      <div ref={nextRef} className={styles.next}>
        <RightArrow />
      </div>

      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
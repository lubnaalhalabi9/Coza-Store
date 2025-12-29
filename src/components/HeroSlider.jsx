// components/HeroSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y, EffectFade } from "swiper/modules";

const HeroSlider = ({ sliderImages }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, A11y, EffectFade]}
        effect="fade"
        speed={1000}
        slidesPerView={1}
        navigation
        loop
        transitionDelay={6000}
        autoplay={{ disableOnInteraction: false }}
        className={"h-full w-full products-swiper"}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className="relative h-full w-full bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-black/10"></div>

                <div className="container mx-auto px-4 z-10">
                  <div className="max-w-lg text-black">

                    <span
                      className={`block text-xl md:text-2xl mb-4 transition-all duration-1000
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
                      style={{ transitionDelay: "300ms" }}
                    >
                      {index === 0
                        ? "Women Collection 2018"
                        : index === 2
                        ? "Men Collection 2018"
                        : "Men New-Session"}
                    </span>

                    <h1
                      className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000
                      ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                      style={{ transitionDelay: "800ms" }}
                    >
                      {index === 0
                        ? "NEW SEASON"
                        : index === 2
                        ? "NEW ARRIVALS"
                        : "JACKETS & COATS"}
                    </h1>

                    <div
                      className={`transition-all duration-1000
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                      style={{ transitionDelay: "1300ms" }}
                    >
                      <button className="bg-blue1 hover:bg-black text-white py-3 px-10 rounded-full text-lg font-medium uppercase transition duration-300 shadow-lg">
                        SHOP NOW
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;

import { useState } from 'react';
import { Navigation, Autoplay, A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';;
import 'swiper/css/effect-fade';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import ScrollTop from '../components/ScrollTop'
import Shop from './Shop';

const Home = () => {

  // مصفوفة صور السلايدر الرئيسي
  const sliderImages = [
    'https://themewagon.github.io/cozastore/images/slide-01.jpg',
    'https://themewagon.github.io/cozastore/images/slide-02.jpg',
    'https://themewagon.github.io/cozastore/images/slide-03.jpg'
  ];

  // بيانات البانرات الإعلانية
  const banners = [
    { id: 1, image: 'https://themewagon.github.io/cozastore/images/banner-01.jpg', category: 'Women', title: 'Spring 2018', colSpan: 'md:col-span-1' },
    { id: 2, image: 'https://themewagon.github.io/cozastore/images/banner-02.jpg', category: 'Men', title: 'Spring 2018', colSpan: 'md:col-span-1' },
    { id: 3, image: 'https://themewagon.github.io/cozastore/images/banner-03.jpg', category: 'Accessories', title: 'New Trend', colSpan: 'md:col-span-2 lg:col-span-1' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* قسم السلايدر الرئيسي (Hero Slider) */}
      <section className="relative h-screen w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay, A11y, EffectFade]}
          effect="fade" // تأثير التلاشي بين الشرائح
          speed={1000}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full products-swiper"
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div 
                  className="relative h-full w-full bg-cover bg-center flex items-center"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  {/* طبقة تغطية شفافة لتحسين وضوح النص */}
                  <div className="absolute inset-0 bg-black/10"></div>

                  {/* محتوى النص على السلايدر */}
                  <div className="container mx-auto px-4 z-10">
                    <div className="max-w-lg text-black">
                      {/* النص العلوي (يظهر بتحريك من الأعلى) */}
                      <span className={`block text-xl md:text-2xl mb-4 transition-all duration-1000 
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                        style={{ transitionDelay: '300ms' }}>
                        {index === 0 ? 'Women Collection 2018' : index === 2 ? 'Men Collection 2018' : 'Men New-Session'}
                      </span>

                      {/* العنوان الرئيسي (يظهر بتأثير التكبير) */}
                      <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000
                        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        style={{ transitionDelay: '800ms' }}>
                        {index === 0 ? 'NEW SEASON' : index === 2 ? 'NEW ARRIVALS' : 'JACKETS & COATS'}
                      </h1>

                      {/* زر الدعوة للإجراء (يظهر من الأسفل) */}
                      <div className={`transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '1300ms' }}>
                        <button className="cursor-pointer bg-blue1 hover:bg-black text-white py-3 px-10 transition duration-300 rounded-full text-lg font-medium uppercase shadow-lg">
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

      {/* قسم البانرات الإعلانية */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 px-4 md:px-0 md:flex-row md:justify-center md:gap-8">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`relative overflow-hidden group ${banner.colSpan} cursor-pointer`}
              >
                {/* حاوية صورة البانر */}
                <div className="relative h-fit w-fit overflow-hidden border-white2 border group-hover:border-blue1/30 transition-all duration-300">
                  <img src={banner.image} alt={banner.category} className="w-full h-full object-contain" />
                  {/* طبقة تدرج لوني تظهر عند التحويم */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue1 to-blue1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* نص البانر (الفئة والعنوان) */}
                <div className="absolute top-6 left-6 grid gap-2">
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold block text-dark1 group-hover:text-white transition-colors duration-300">
                    {banner.category}
                  </span>
                  <h3 className="text-sm md:text-[1rem] mb-1 font-light text-gray5 group-hover:text-white transition-colors duration-300">
                    {banner.title}
                  </h3>

                  {/* زر "تسوق الآن" يظهر عند التحويم */}
                  <div className="mt-4">
                    <div className="flex flex-col items-start h-8 relative">
                      <button className="text-white font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                        <span className="relative z-10">Shop Now</span>
                      </button>
                      {/* خط سفلي يظهر عند التحويم */}
                      <div className="absolute bottom-0 h-px bg-white transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-center w-20 opacity-0 group-hover:opacity-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم المنتجات */}
      <section className=" bg-white">
        <div className="container mx-auto px-4 md:px-0">
          {/* عنوان قسم المنتجات */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark1 md:translate-y-20">
              Product Overview
            </h2>
          </div>
          <Shop/>
        </div>
      </section>
      <ScrollTop/>
    </div>
  );
};

export default Home;
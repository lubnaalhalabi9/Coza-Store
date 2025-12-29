import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import ScrollTop from '../components/ScrollTop';
import Shop from './Shop';

const Home3 = () => {
  // حالة إدارة السلايدر
  const [swiperInstance, setSwiperInstance] = useState(null); // نسخة السوايبر المستخدمة
  const [activeIndex, setActiveIndex] = useState(0); // الفهرس النشط للسلايدر الحالي

  // بيانات السلايدر الرئيسي
  const sliderData = [
    {
      image: 'https://themewagon.github.io/cozastore/images/slide-05.jpg',
      subTitle: 'Women Collection 2018',
      mainTitle: 'NEW ARRIVALS',
    },
    {
      image: 'https://themewagon.github.io/cozastore/images/slide-06.jpg',
      subTitle: 'Men New-Season',
      mainTitle: 'JACKETS & COATS',
    },
    {
      image: 'https://themewagon.github.io/cozastore/images/slide-07.jpg',
      subTitle: 'Men Collection 2018',
      mainTitle: 'NEW SEASON',
    }
  ];
  
  // بيانات البانرات الإعلانية
  const banners = [
    // الصف الأول - بانرات كبيرة
    { id: 1, image: 'https://themewagon.github.io/cozastore/images/banner-04.jpg', category: 'Women', title: 'New Trend', size: 'large' },
    { id: 2, image: 'https://themewagon.github.io/cozastore/images/banner-05.jpg', category: 'Men', title: 'New Trend', size: 'large' },
    // الصف الثاني - بانرات صغيرة
    { id: 3, image: 'https://themewagon.github.io/cozastore/images/banner-07.jpg', category: 'Watches', title: 'Spring 2018', size: 'small' },
    { id: 4, image: 'https://themewagon.github.io/cozastore/images/banner-08.jpg', category: 'Bags', title: 'Spring 2018', size: 'small' },
    { id: 5, image: 'https://themewagon.github.io/cozastore/images/banner-09.jpg', category: 'Accessories', title: 'Spring 2018', size: 'small' },
  ];

  return (
    <div className="bg-white">
      {/* قسم السلايدر الرئيسي - Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          effect="fade" // تأثير التلاشي بين الشرائح
          speed={1000} // سرعة الانتقال
          loop={true} // التكرار الدائري
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          onSwiper={setSwiperInstance} // تخزين نسخة السوايبر
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // تحديث الشريحة النشطة
          autoplay={{ delay: 6000, disableOnInteraction: false }} // التشغيل التلقائي
          className="h-full w-full products-swiper main-slider"
        >
          {/* شرائح السلايدر */}
          {sliderData.map((slide, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div 
                  className="relative flex h-full w-full items-center justify-center bg-cover bg-center "
                  style={{ backgroundImage: `url(${slide.image})`}}
                >
                  {/* محتوى النص على السلايدر */}
                  <div className="container mx-auto px-4 text-center z-10 mb-7">
                    {/* العنوان الفرعي مع تأثيرات حركية */}
                    <span 
                      className={`block text-[31px] text-white leading-tight mb-4 transition-all duration-1000 
                      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                      style={{ transitionDelay: '200ms', fontFamily: 'Poppins-Regular' }}
                    >
                      {slide.subTitle}
                    </span>

                    {/* العنوان الرئيسي مع تأثيرات حركية */}
                    <h2 
                      className={`text-[30px] md:text-[58px] font-black text-white uppercase leading-none mb-12 transition-all duration-1000
                      ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                      style={{ transitionDelay: '700ms' }}
                    >
                      {slide.mainTitle}
                    </h2>

                    {/* زر الدعوة للإجراء مع تأثيرات حركية */}
                    <div 
                      className={`transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ transitionDelay: '1200ms' }}
                    >
                      <button className="inline-flex items-center justify-center cursor-pointer bg-blue1 hover:bg-white hover:text-blue1 text-white min-w-40.25 h-11.5 rounded-[23px] text-[15px] font-medium uppercase transition-all duration-300 shadow-md">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}

          {/* أزرار التنقل المخصصة للسلايدر */}
          {/* زر السابق */}
          <button className="custom-prev absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 text-gray2 hover:text-blue1 transition-colors cursor-pointer">
            <svg className="w-10 h-10 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          {/* زر التالي */}
          <button className="custom-next absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 text-gray2 hover:text-blue1 transition-colors cursor-pointer">
            <svg className="w-10 h-10 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* منطقة الثمبنيلز (الصور المصغرة) أسفل السلايدر */}
          <div className="absolute bottom-15 left-1/2 -translate-x-1/2 w-[50%] z-20 flex justify-center items-center ">
            <div className="flex w-full max-w-300">
              {sliderData.map((item, idx) => {
                const isCurrent = activeIndex === idx; // التحقق إذا كانت هذه الشريحة نشطة
                return (
                  <div 
                    key={idx}
                    onClick={() => swiperInstance?.slideToLoop(idx)} // الانتقال إلى شريحة معينة عند النقر
                    className="relative flex-1 cursor-pointer group h-full transition-all duration-300"
                  >
                    <div className={`relative h-20 md:h-27.5 overflow-hidden transition-all duration-500 border-b-[6px] 
                      ${isCurrent ? 'border-transparent' : 'border-transparent'}`}>
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                      
                      {/* طبقة التغطية مع نص عند التحويم أو عندما تكون الشريحة نشطة */}
                      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300
                        ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <span className="text-white text-xs md:text-[16px] text-center px-2">
                          {idx === 0 ? "Women's Wear" : idx === 1 ? "Men's Wear" : "Men's Wear"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Swiper>
      </section>

      {/* قسم البانرات الإعلانية - Banner Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {banners.map((banner) => (
            <div 
              key={banner.id} 
              className={`relative overflow-hidden group cursor-pointer 
                ${banner.size === 'large' ? 'md:col-span-3' : 'md:col-span-2'}`}
            >
              {/* حاوية صورة البانر */}
              <div className="relative h-fit w-fit overflow-hidden border-white2 border group-hover:border-blue1/30 transition-all duration-300">
                <img 
                  src={banner.image} 
                  alt={banner.category}
                  className="w-full h-full object-contain"
                />
                
                {/* طبقة التدرج اللوني التي تظهر عند التحويم */}
                <div className="absolute inset-0 bg-linear-to-br from-blue1 to-blue1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* محتوى نص البانر */}
              <div className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-start">
                {/* اسم الفئة */}
                <span className="text-xl md:text-2xl lg:text-3xl font-bold block text-dark1 group-hover:text-white transition-colors duration-300">
                  {banner.category}
                </span>
                {/* العنوان الفرعي */}
                <span className="text-sm md:text-[1rem] mb-1 font-light text-gray5 group-hover:text-white transition-colors duration-300">
                  {banner.title}
                </span>

                {/* زر "تسوق الآن" مع تأثيرات حركية */}
                <div className="mt-auto overflow-hidden">
                  <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                    <span className="cursor-pointer inline-block text-white font-semibold border-b-2 border-white pb-1 uppercase text-sm tracking-widest">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* قسم المنتجات - Products Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-0 pb-3 md:pb-0">
          {/* عنوان قسم المنتجات */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark1 md:translate-y-20">
              Product Overview
            </h2>
          </div>
          {/* مكون Shop الذي يعرض المنتجات مع ترقيم الصفحات */}
          <Shop showPagination="true"/>
        </div>
      </section>

      {/* إضافة خطوط Google Fonts بشكل عالمي */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;500&display=swap');
      `}</style>
      <ScrollTop/>
    </div>
  );
};

export default Home3;
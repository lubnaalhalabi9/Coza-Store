import React, { useState } from 'react';
import { Navigation, A11y, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiOutlineHeart, AiFillHeart, AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/navigation';
import OurBlogs from '../components/OurBlogs';
import ScrollTop from '../components/ScrollTop';

const Home2 = () => {
  // إدارة حالات المكون
  const [selectedCategory, setSelectedCategory] = useState('Best Seller'); // الفئة المختارة
  const [hoveredBanner, setHoveredBanner] = useState(null); // البانر الذي يتم التحويم عليه
  const [likedProducts, setLikedProducts] = useState({}); // المنتجات المفضلة
  const [quickViewProduct, setQuickViewProduct] = useState(null); // المنتج المعروض في العرض السريع
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false); // حالة فتح نافذة العرض السريع
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false); // حالة فتح نافذة القائمة المفضلة
  const [wishlistProduct, setWishlistProduct] = useState(null); // المنتج المضاف إلى القائمة المفضلة

  // مكون نافذة القائمة المفضلة
  const WishlistModal = ({ isOpen, product, onClose }) => {
    if (!isOpen || !product) return null;

    return (
      <div className="fixed inset-0 z-2000 flex items-center justify-center bg-white3/90">
        <div className="bg-white w-full max-w-md mx-4 p-8 text-center rounded-md shadow-lg">
          
          {/* أيقونة التأكيد */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full border-2 border-green-400 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* نص التأكيد */}
          <h3 className="text-lg font-semibold text-gray6 mb-2">
            {product.name}
          </h3>
          <p className="text-gray4 mb-6">
            is added to wishlist!
          </p>

          {/* زر الموافقة */}
          <button
            onClick={onClose}
            className="bg-blue1 text-white px-8 py-2 rounded-md hover:bg-black transition-colors duration-300"
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  // مكون نافذة العرض السريع للمنتج
  const QuickViewModal = ({ product, isOpen, onClose }) => {
    const [quantity, setQuantity] = useState(1); // كمية المنتج
    const [selectedSize, setSelectedSize] = useState('M'); // المقاس المختار
    const [selectedColor, setSelectedColor] = useState('Black'); // اللون المختار

    if (!isOpen || !product) return null;

    // المقاسات المتاحة
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    // الألوان المتاحة
    const colors = [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#ffffff' },
      { name: 'PastelBrown', value: '#79604f' },
      { name: 'Burgundy', value: '#660033' },
      { name: 'OliveGreen', value: '#595900' },
      { name: 'DarkBlue', value: '#3d5675' }
    ];

    // زيادة كمية المنتج
    const increaseQuantity = () => setQuantity(prev => prev + 1);
    // تقليل كمية المنتج
    const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    // إضافة المنتج إلى سلة التسوق
    const handleAddToCart = () => {
      console.log('Product added to cart:', {
        ...product,
        quantity,
        selectedSize,
        selectedColor
      });
    };

    return (
      <div className="fixed inset-0 z-1000 flex items-center justify-center bg-dark1 bg-opacity-50">
        <div className="relative bg-white w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto rounded-lg">
          {/* زر إغلاق النافذة */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray3 hover:text-dark1 text-2xl cursor-pointer bg-white rounded-full p-1"
          >
            <AiOutlineClose />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* صورة المنتج */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* تفاصيل المنتج */}
            <div className="space-y-6">
              {/* اسم المنتج والسعر */}
              <div>
                <h2 className="text-2xl font-bold text-gray6 mb-2">{product.name}</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-xl font-bold text-gray6">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-gray3 line-through">{product.oldPrice}</span>
                  )}
                  {product.oldPrice && (
                    <span className="bg-pink text-white text-sm font-bold px-2 py-1 rounded">
                      SALE
                    </span>
                  )}
                </div>
              </div>

              {/* اختيار المقاس */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray6">Choose Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`cursor-pointer w-10 h-10 border rounded-full transition-colors ${
                        selectedSize === size
                          ? 'bg-blue1 text-white border-blue1'
                          : 'border-gray3 text-gray6 hover:border-blue1'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* اختيار اللون */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray6">Choose Color</h3>
                <div className="flex flex-wrap gap-5">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className="flex flex-col items-center cursor-pointer space-y-1"
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-2 ${
                          selectedColor === color.name
                            ? 'border-blue1'
                            : 'border-gray2'
                        }`}
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs text-gray4">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* اختيار الكمية */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray6">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray3 rounded-full hover:bg-white1 cursor-pointer"
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="text-xl font-medium w-16 text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray3 rounded-full hover:bg-white1 cursor-pointer"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>

              {/* زر إضافة إلى السلة */}
              <button 
                onClick={handleAddToCart}
                className="w-fit bg-blue1 text-white py-3 px-8 rounded-3xl hover:bg-black transition-colors font-medium duration-500 cursor-pointer"
              >
                ADD TO CART
              </button>

              {/* معلومات إضافية عن المنتج */}
              <div className="pt-4 border-t border-white2 space-y-2 mt-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray4">Category:</span>
                  <span className="text-gray6">{product.category || 'Uncategorized'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray4">Product ID:</span>
                  <span className="text-gray6">{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // فتح نافذة العرض السريع للمنتج
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // إغلاق نافذة العرض السريع
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => {
      setQuickViewProduct(null);
    }, 300);
  };

  // بيانات المنتجات
  const products = [
    { id: 1, name: 'Esprit Ruffle Shirt', price: '$16.64', oldPrice: '$22.95', image: 'https://themewagon.github.io/cozastore/images/product-01.jpg', category: 'Sale' },
    { id: 2, name: 'Herschel Supply', price: '$35.31', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-02.jpg', category: 'Best Seller' },
    { id: 3, name: 'Only Check Trouser', price: '$25.50', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-03.jpg', category: 'Best Seller' },
    { id: 4, name: 'Classic Trench Coat', price: '$75.00', oldPrice: '$82.50', image: 'https://themewagon.github.io/cozastore/images/product-04.jpg', category: 'Best Seller' },
    { id: 5, name: 'Front Pocket Jumper', price: '$34.74', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-05.jpg', category: 'Best Seller' },
    { id: 6, name: 'Vintage Inspired Classic', price: '$93.20', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-06.jpg', category: 'Best Seller' },
    { id: 7, name: 'Shirt in Stretch Cotton', price: '$52.66', oldPrice: '$60.00', image: 'https://themewagon.github.io/cozastore/images/product-07.jpg', category: 'Best Seller' },
    { id: 8, name: 'Pieces Metallic Printed', price: '$18.96', oldPrice: '$25.00', image: 'https://themewagon.github.io/cozastore/images/product-08.jpg', category: 'Best Seller' },
    { id: 9, name: 'Converse All Star Hi Plimsolls', price: '$75.00', oldPrice: '$82.30', image: 'https://themewagon.github.io/cozastore/images/product-09.jpg', category: 'Featured' },
    { id: 10, name: 'Femme T-Shirt In Stripe', price: '$25.85', oldPrice: '$27.97', image: 'https://themewagon.github.io/cozastore/images/product-10.jpg', category: 'Sale' },
    { id: 11, name: 'Herschel supply', price: '$63.16', oldPrice: '$68.50', image: 'https://themewagon.github.io/cozastore/images/product-11.jpg', category: 'Featured' },
    { id: 12, name: 'Herschel supply', price: '$63.15', oldPrice: '$70.00', image: 'https://themewagon.github.io/cozastore/images/product-12.jpg', category: 'Featured' },
    { id: 13, name: 'T-Shirt with Sleeve', price: '$18.49', oldPrice: '$22.32', image: 'https://themewagon.github.io/cozastore/images/product-13.jpg', category: 'Featured' },
    { id: 14, name: 'Pretty Little Thing', price: '$54.79', oldPrice: '$61.55', image: 'https://themewagon.github.io/cozastore/images/product-14.jpg', category: 'Sale' },
    { id: 15, name: 'Mini Silver Mesh Watch', price: '$86.85', oldPrice: '$92.00', image: 'https://themewagon.github.io/cozastore/images/product-15.jpg', category: 'Featured' },
    { id: 16, name: 'Square Neck Back', price: '$29.64', oldPrice: '$35.62', image: 'https://themewagon.github.io/cozastore/images/product-16.jpg', category: 'Featured' },
    { id: 17, name: 'Converse All Star Hi Plimsolls', price: '$75.00', oldPrice: '$82.30', image: 'https://themewagon.github.io/cozastore/images/product-09.jpg', category: 'Sale' },
    { id: 18, name: 'Herschel supply', price: '$63.16', oldPrice: '$68.50', image: 'https://themewagon.github.io/cozastore/images/product-11.jpg', category: 'Sale' },
    { id: 19, name: 'T-Shirt with Sleeve', price: '$18.49', oldPrice: '$22.32', image: 'https://themewagon.github.io/cozastore/images/product-13.jpg', category: 'Sale' },
    { id: 20, name: 'Mini Silver Mesh Watch', price: '$86.85', oldPrice: '$92.00', image: 'https://themewagon.github.io/cozastore/images/product-15.jpg', category: 'Sale' },
    { id: 21, name: 'Herschel Supply', price: '$35.31', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-02.jpg', category: 'Top Rate' },
    { id: 22, name: 'Classic Trench Coat', price: '$75.00', oldPrice: '$82.50', image: 'https://themewagon.github.io/cozastore/images/product-04.jpg', category: 'Sale' },
    { id: 23, name: 'Vintage Inspired Classic', price: '$93.20', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-06.jpg', category: 'Featured' },
    { id: 24, name: 'Only Check Trouser', price: '$25.50', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-03.jpg', category: 'Top Rate' },
    { id: 25, name: 'Vintage Inspired Classic', price: '$93.20', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-06.jpg', category: 'Top Rate' },
    { id: 26, name: 'Shirt in Stretch Cotton', price: '$52.66', oldPrice: '$60.00', image: 'https://themewagon.github.io/cozastore/images/product-07.jpg', category: 'Sale' },
    { id: 27, name: 'Pieces Metallic Printed', price: '$18.96', oldPrice: '$25.00', image: 'https://themewagon.github.io/cozastore/images/product-08.jpg', category: 'Sale' },
    { id: 28, name: 'Converse All Star Hi Plimsolls', price: '$75.00', oldPrice: '$82.30', image: 'https://themewagon.github.io/cozastore/images/product-09.jpg', category: 'Top Rate' },
    { id: 29, name: 'Femme T-Shirt In Stripe', price: '$25.85', oldPrice: '$27.97', image: 'https://themewagon.github.io/cozastore/images/product-10.jpg', category: 'Top Rate' },
    { id: 30, name: 'Herschel supply', price: '$63.16', oldPrice: '$68.50', image: 'https://themewagon.github.io/cozastore/images/product-11.jpg', category: 'Top Rate' },
    { id: 31, name: 'Herschel supply', price: '$63.15', oldPrice: '$70.00', image: 'https://themewagon.github.io/cozastore/images/product-12.jpg', category: 'Sale' },
    { id: 32, name: 'T-Shirt with Sleeve', price: '$18.49', oldPrice: '$22.32', image: 'https://themewagon.github.io/cozastore/images/product-13.jpg', category: 'Top Rate' },
    { id: 33, name: 'Square Neck Back', price: '$29.64', oldPrice: '$35.62', image: 'https://themewagon.github.io/cozastore/images/product-16.jpg', category: 'Top Rate' },
  ];

  // صور السلايدر الرئيسي
  const sliderImages = [
    'https://themewagon.github.io/cozastore/images/slide-04.jpg',
    'https://themewagon.github.io/cozastore/images/slide-02.jpg',
    'https://themewagon.github.io/cozastore/images/slide-03.jpg'
  ];

  // بيانات البانرات الإعلانية
  const banners = [
    { 
      id: 1, 
      image: 'https://themewagon.github.io/cozastore/images/banner-01.jpg', 
      category: 'Women', 
      title: 'Spring 2018',
      colSpan: 'md:col-span-1'
    },
    { 
      id: 2, 
      image: 'https://themewagon.github.io/cozastore/images/banner-02.jpg', 
      category: 'Men', 
      title: 'Spring 2018',
      colSpan: 'md:col-span-1'
    },
    { 
      id: 3, 
      image: 'https://themewagon.github.io/cozastore/images/banner-06.jpg', 
      category: 'Bag', 
      title: 'New Trend',
      colSpan: 'md:col-span-2 lg:col-span-1'
    }
  ];

  // تصفية المنتجات حسب الفئة المختارة
  const filteredProducts = products.filter(product => 
    product.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  // تبديل حالة الإعجاب بالمنتج
  const toggleLike = (product) => {
    setLikedProducts(prev => {
      const isLiked = !prev[product];

      if (isLiked) {
        setWishlistProduct(product);
        setWishlistModalOpen(true);
      }

      return {
        ...prev,
        [product]: isLiked
      };
    });
  };

  // تقسيم المنتجات إلى مجموعات للسلايدر (4 منتجات في كل شريحة)
  const productGroups = [];
  for (let i = 0; i < filteredProducts.length; i += 4) {
    productGroups.push(filteredProducts.slice(i, i + 4));
  }

  return (
    <div className="min-h-screen bg-white">
      {/* نافذة العرض السريع للمنتجات */}
      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={isQuickViewOpen} 
        onClose={closeQuickView} 
      />

      {/* السلايدر الرئيسي */}
      <section className="relative h-screen w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay, A11y, EffectFade]}
          effect="fade"
          speed={1000}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full products-swiper main-slider"
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div 
                  className="relative h-full w-full bg-cover bg-center flex items-center"
                  style={{ backgroundImage:` url(${image}) `}}
                >
                  {/* طبقة شفافة لتحسين رؤية النص */}
                  <div className="absolute inset-0 bg-black/10"></div>

                  {/* محتوى السلايدر */}
                  <div className="container mx-auto px-4 z-10">
                    <div className="max-w-lg text-black">
                      {/* العنوان الفرعي */}
                      <span className={`block text-xl md:text-2xl mb-4 transition-all duration-1000 
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                        style={{ transitionDelay: '300ms' }}>
                        {index === 0 ? 'Women Collection 2018' : index === 2 ? 'Men Collection 2018' : 'Men New-Session'}
                      </span>

                      {/* العنوان الرئيسي */}
                      <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000
                        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        style={{ transitionDelay: '800ms' }}>
                        {index === 0 ? 'NEW SEASON' : index === 2 ? 'NEW ARRIVALS' : 'JACKETS & COATS'}
                      </h1>

                      {/* زر التسوق */}
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
      <section className="pb-12 md:pb-16 lg:pb-20 bg-white">
        <div>
          <div className="flex flex-col md:flex-row md:justify-center ">
            {banners.map((banner) => (
              <div 
                key={banner.id} 
                className={`relative overflow-hidden group ${banner.colSpan} cursor-pointer`}
                onMouseEnter={() => setHoveredBanner(banner.id)}
                onMouseLeave={() => setHoveredBanner(null)}
              >
                {/* حاوية الصورة */}
                <div className="relative h-fit w-fit overflow-hidden border-white2 border group-hover:border-blue1/30 transition-all duration-300">
                  <img 
                    src={banner.image} 
                    alt={banner.category}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* طبقة زرقاء تظهر عند التحويم */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue1 to-blue1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* نص البانر */}
                <div className="absolute top-6 left-6 grid gap-2">
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold block text-dark1 group-hover:text-white transition-colors duration-300">
                    {banner.category}
                  </span>
                  <h3 className="text-sm md:text-[1rem] mb-1 font-light text-gray5 group-hover:text-white transition-colors duration-300">
                    {banner.title}
                  </h3>
                  
                  {/* زر "تسوق الآن" */}
                  <div className="mt-4">
                    <div className="flex flex-col items-start h-8">
                      <button 
                        className="text-white font-semibold 
                          opacity-0 group-hover:opacity-100
                          transform translate-y-6 group-hover:translate-y-4
                          transition-all duration-700 delay-100">
                        <span className="relative z-10">Shop Now</span>
                      </button>
                      {/* خط سفلي يظهر عند التحويم */}
                      <div 
                        className="absolute -bottom-4
                          h-px bg-white
                          transition-all duration-500
                          scale-x-0 group-hover:scale-x-100
                          origin-center w-20
                          opacity-0 group-hover:opacity-100">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* قسم المنتجات مع السلايدر */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* عنوان القسم */}
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-dark1">
              Store Overview
            </h2>
          </div>
          
          {/* أزرار الفئات */}
          <div className="text-center mt-6 mb-10">
            {['Best Seller', 'Featured', 'Sale', 'Top Rate'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer text-sm md:text-base font-medium mx-3 hover:text-dark1 relative group pb-1 ${selectedCategory === cat ? 'text-dark1' : 'text-gray3'}`}
              >
                {cat}
                <span 
                  className={`absolute left-0 bottom-1 h-px bg-dark1 transition-all duration-300 ${selectedCategory === cat ? 'w-full' : 'w-0'}`}
                ></span>
              </button>
            ))}
          </div>

          {/* سلايدر المنتجات */}
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={16}
          slidesPerView={1}
          navigation 
          breakpoints={{
            0: { // للشاشات الصغيرة جدًا (موبايل)
              slidesPerView: 1,
              spaceBetween: 10
            },
            640: { // للشاشات الصغيرة (موبايل كبير)
              slidesPerView: 1,
              spaceBetween: 16
            },
            768: { // للأجهزة اللوحية
              slidesPerView: 1,
              spaceBetween: 20
            },
            1024: { // للابتوب
              slidesPerView: 1,
              spaceBetween: 24
            },
            1280: { // للشاشات الكبيرة
              slidesPerView: 1,
              spaceBetween: 24
            }
          }}
          className="pb-12 products-swiper relative"
        >
            {productGroups.map((group, groupIndex) => (
              <SwiperSlide key={groupIndex}>
                {/* شبكة المنتجات (4 أعمدة) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {group.map((product) => (
                    <div 
                      key={product.id} 
                      className="group relative bg-white overflow-hidden"
                    >
                      {/* صورة المنتج */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-64 md:h-72 lg:h-80 object-cover group-hover:scale-105 transition duration-500"
                        />
                        {/* زر العرض السريع */}
                        <div className="absolute bottom-4 left-0 right-0 px-4">
                          <div className="flex justify-center">
                            <button 
                              onClick={() => handleQuickView(product)}
                              className="bg-white text-black py-2 px-6
                                opacity-0 group-hover:opacity-100
                                transform translate-y-4 group-hover:translate-y-0 
                                transition duration-500 rounded-3xl cursor-pointer
                                hover:bg-black hover:text-white shadow-md font-medium"
                            >
                              Quick View
                            </button>
                          </div>
                        </div>
                        {/* نافذة القائمة المفضلة */}
                        <WishlistModal
                          isOpen={wishlistModalOpen}
                          product={wishlistProduct}
                          onClose={() => setWishlistModalOpen(false)}
                        />
                      </div>

                      {/* معلومات المنتج */}
                      <div className="py-4 px-4">
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <h3 className="text-gray3 mb-2 text-sm hover:text-blue1 transition duration-300 cursor-pointer">
                              {product.name}
                            </h3>

                            {/* السعر */}
                            <div className="flex items-center space-x-2">
                              <span className="text-md font-medium text-gray6">
                                {product.price}
                              </span>
                              {product.oldPrice && (
                                <span className="text-gray3 line-through text-sm">
                                  {product.oldPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* زر القلب (الإعجاب) */}
                          <button
                            onClick={() => toggleLike(product.id)}
                            className="cursor-pointer text-gray3 hover:text-blue1 text-2xl transition-colors"
                          >
                            {likedProducts[product.id] ? (
                              <AiFillHeart className="text-blue1" />
                            ) : (
                              <AiOutlineHeart />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* علامة "عرض" للمنتجات المخفضة */}
                      {product.oldPrice && (
                        <div className="absolute top-3 left-3 bg-pink text-white text-xs font-bold px-3 py-1 rounded-3xl">
                          SALE
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* قسم المدونات */}
      <OurBlogs/>

      {/* زر التمرير للأعلى */}
      <ScrollTop/>
    </div>
  );
};

export default Home2;
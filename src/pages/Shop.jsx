import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart, AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import ScrollTop from '../components/ScrollTop';
// مكون قائمة الفلاتر المنبثقة
const FilterDropdown = ({ isOpen, filterState, setFilterState }) => {
  if (!isOpen) return null;

  // خيارات الفرز
  const sortOptions = [
    'Default',
    'Popularity',
    'Average rating',
    'Newness',
    'Price: Low to High',
    'Price: High to Low'
  ];

  // خيارات نطاقات الأسعار
  const priceOptions = [
    { label: '$0.00 - $25.00', min: 0, max: 25 },
    { label: '$25.00 - $50.00', min: 25, max: 50 },
    { label: '$50.00 - $75.00', min: 50, max: 75 },
    { label: '$75.00 - $100.00', min: 75, max: 100 }
  ];

  // خيارات الألوان
  const colorOptions = [
    { name: 'Black', color: '#000000' },
    { name: 'White', color: '#ffffff' },
    { name: 'Burgundy', color: '#660033' },
    { name: 'OliveGreen', color: '#595900' },
    { name: 'DarkBlue', color: '#3d5675' }
  ];

  // خيارات الوسوم (Tags)
  const tagOptions = ['Fashion', 'Lifestyle', 'Denim', 'Streetstyle', 'Crafts'];

  return (
    <div className="bg-white3 border border-white2 p-5 my-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* قسم الفرز */}
      <div>
        <h4 className="font-semibold mb-4">Sort By</h4>
        <ul className="space-y-2">
          {sortOptions.map(option => (
            <li
              key={option}
              onClick={() =>
                setFilterState(prev => ({
                  ...prev,
                  sort: option === prev.sort ? null : option
                }))
              }
              className={`cursor-pointer text-sm ${
                filterState.sort === option ? 'text-blue1' : 'text-gray4'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {/* قسم السعر */}
      <div>
        <h4 className="font-semibold mb-4">Price</h4>
        <ul className="space-y-2">
          {priceOptions.map(price => (
            <li
              key={price.label}
              onClick={() =>
                setFilterState(prev => ({
                  ...prev,
                  price:
                    prev.price?.label === price.label ? null : price
                }))
              }
              className={`cursor-pointer text-sm ${
                filterState.price?.label === price.label
                  ? 'text-blue1'
                  : 'text-gray4'
              }`}
            >
              {price.label}
            </li>
          ))}
        </ul>
      </div>

      {/* قسم اللون */}
      <div>
        <h4 className="font-semibold mb-4">Color</h4>
        <ul className="space-y-3">
          {colorOptions.map(c => (
            <li
              key={c.name}
              onClick={() =>
                setFilterState(prev => ({
                  ...prev,
                  color: prev.color === c.name ? null : c.name
                }))
              }
              className="flex items-center gap-3 cursor-pointer"
            >
              <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: c.color }}
              />
              <span
                className={`text-sm ${
                  filterState.color === c.name
                    ? 'text-blue1'
                    : 'text-gray4'
                }`}
              >
                {c.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* قسم الوسوم */}
      <div>
        <h4 className="font-semibold mb-4">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map(tag => (
            <button
              key={tag}
              onClick={() =>
                setFilterState(prev => ({
                  ...prev,
                  tag: prev.tag === tag ? null : tag
                }))
              }
              className={`cursor-pointer px-4 py-1 text-sm rounded-full border ${
                filterState.tag === tag
                  ? 'bg-blue1 text-white border-blue1'
                  : 'text-gray4 border-gray2'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// مكون البحث المنبثق
const SearchDropdown = ({ isOpen, searchQuery, setSearchQuery, handleSearchSubmit, handleClose }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white3 border border-white2 p-2 my-6">
      <div className="relative">
        {/* زر إغلاق البحث */}
        <button 
          onClick={handleClose}
          className="absolute right-0 top-0 text-2xl text-gray4 hover:text-gray5 cursor-pointer"
        >
          <IoMdClose />
        </button>
        
        {/* نموذج البحث */}
        <form onSubmit={handleSearchSubmit} className="w-full">
          <div className="relative flex items-center bg-white border border-white2 rounded-sm shadow-sm group transition-all">
            {/* زر البحث */}
            <button 
              type="submit" 
              className="text-2xl text-gray6 ml-4 cursor-pointer hover:text-blue1 transition-colors"
            >
              <IoMdSearch />
            </button>
            {/* حقل إدخال البحث */}
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full text-lg outline-none bg-transparent text-dark1 placeholder:text-gray5 p-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </form>
        
        {/* نتائج البحث المقترحة */}
        {searchQuery && (
          <div className="mt-4 p-3 bg-white border border-white2">
            <p className="text-gray4 text-sm">
              Search results for: <span className="text-blue1 font-medium">"{searchQuery}"</span>
            </p>
            {/* يمكن إضافة قائمة نتائج البحث هنا */}
          </div>
        )}
      </div>
    </div>
  );
};

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

        {/* نص تأكيد الإضافة */}
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

// مكون بطاقة المنتج
const ProductCard = ({ product, toggleLike, likedProducts, openQuickView }) => {
  const isLiked = likedProducts[product.id] || false;

  return (
    <div className="group relative bg-white transition duration-300 px-4 md:px-0">
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
              onClick={() => openQuickView(product)}
              className="bg-white text-black py-2 px-6
                opacity-0 group-hover:opacity-100
                transform translate-y-4 group-hover:translate-y-0 
                transition duration-500 rounded-3xl cursor-pointer
                hover:bg-black hover:text-white shadow-md">
              Quick View
            </button>
          </div>
        </div>
      </div>

      {/* معلومات المنتج */}
      <div className="py-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            {/* اسم المنتج */}
            <h3 className="text-gray3 mb-2 text-sm hover:text-blue1 transition duration-300 cursor-pointer">
              {product.name}
            </h3>

            {/* السعر */}
            <div className="flex items-center space-x-2">
              <span className="text-md font-medium text-gray6">
                {product.price}
              </span>
              {/* السعر القديم إذا كان هناك عرض */}
              {product.oldPrice && (
                <span className="text-gray3 line-through text-sm">
                  {product.oldPrice}
                </span>
              )}
            </div>
          </div>
          
          {/* زر القلب للإعجاب */}
          <button
            onClick={() => toggleLike(product)}
            className="text-gray3 hover:text-blue1 text-2xl transition-colors cursor-pointer"
          >
            {isLiked ? (
              <AiFillHeart className="text-blue1" />
            ) : (
              <AiOutlineHeart />
            )}
          </button>
        </div>
      </div>

      {/* علامة "عرض" للمنتجات المخفضة */}
      {product.oldPrice && (
        <div className="absolute top-3 left-3 bg-pink text-white text-xs font-bold px-2 py-1 rounded-3xl">
          SALE
        </div>
      )}
    </div>
  );
};

// مكون نافذة العرض السريع للمنتج
const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');

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

  // زيادة الكمية
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  // تقليل الكمية
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-dark1 bg-opacity-50">
      <div className="relative bg-white w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* زر إغلاق النافذة */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray3 hover:text-dark1 text-2xl cursor-pointer"
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
                {/* السعر القديم إذا كان هناك عرض */}
                {product.oldPrice && (
                  <span className="text-gray3 line-through">{product.oldPrice}</span>
                )}
                {/* علامة "عرض" */}
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
                      className={`w-10 h-10 rounded-full border ${
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
            <button className="w-fit bg-blue1 text-white py-3 px-6 rounded-3xl hover:bg-black transition-colors font-medium duration-500 cursor-pointer">
              ADD TO CART
            </button>

            {/* معلومات إضافية */}
            <div className="pt-4 border-t border-white2 space-y-2 mt-10">
              <div className="flex justify-between text-sm">
                <span className="text-gray4">Category:</span>
                <span className="text-gray6">{product.category || 'Uncategorized'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// المكون الرئيسي للمتجر
const Shop = ({ showPagination = false }) => {
  // حالات إدارة الفلاتر والبحث
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [wishlistProduct, setWishlistProduct] = useState(null);

  // حالة الفلاتر المطبقة
  const [filterState, setFilterState] = useState({
    sort: null,
    price: null,
    color: null,
    tag: null
  });

  // حالات إدارة المنتجات والعروض
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [hoveredBanner, setHoveredBanner] = useState(null);
  const [likedProducts, setLikedProducts] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // بيانات المنتجات
  const products = [
    { id: 1, name: 'Esprit Ruffle Shirt', price: '$16.64', oldPrice: '$22.95', image: 'https://themewagon.github.io/cozastore/images/product-01.jpg', category: 'Women' },
    { id: 2, name: 'Herschel Supply', price: '$35.31', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-02.jpg', category: 'Women' },
    { id: 3, name: 'Only Check Trouser', price: '$25.50', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-03.jpg', category: 'Men' },
    { id: 4, name: 'Classic Trench Coat', price: '$75.00', oldPrice: '$82.50', image: 'https://themewagon.github.io/cozastore/images/product-04.jpg', category: 'Women' },
    { id: 5, name: 'Front Pocket Jumper', price: '$34.74', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-05.jpg', category: 'Women' },
    { id: 6, name: 'Vintage Inspired Classic', price: '$93.20', oldPrice: '', image: 'https://themewagon.github.io/cozastore/images/product-06.jpg', category: 'Watches' },
    { id: 7, name: 'Shirt in Stretch Cotton', price: '$52.66', oldPrice: '$60.00', image: 'https://themewagon.github.io/cozastore/images/product-07.jpg', category: 'Women' },
    { id: 8, name: 'Pieces Metallic Printed', price: '$18.96', oldPrice: '$25.00', image: 'https://themewagon.github.io/cozastore/images/product-08.jpg', category: 'Women' },
    { id: 9, name: 'Converse All Star Hi Plimsolls', price: '$75.00', oldPrice: '$82.30', image: 'https://themewagon.github.io/cozastore/images/product-09.jpg', category: 'Shoes' },
    { id: 10, name: 'Femme T-Shirt In Stripe', price: '$25.85', oldPrice: '$27.97', image: 'https://themewagon.github.io/cozastore/images/product-10.jpg', category: 'Women' },
    { id: 11, name: 'Herschel supply', price: '$63.16', oldPrice: '$68.50', image: 'https://themewagon.github.io/cozastore/images/product-11.jpg', category: 'Men' },
    { id: 12, name: 'Herschel supply', price: '$63.15', oldPrice: '$70.00', image: 'https://themewagon.github.io/cozastore/images/product-12.jpg', category: 'Belt' },
    { id: 13, name: 'T-Shirt with Sleeve', price: '$18.49', oldPrice: '$22.32', image: 'https://themewagon.github.io/cozastore/images/product-13.jpg', category: 'Women' },
    { id: 14, name: 'Pretty Little Thing', price: '$54.79', oldPrice: '$61.55', image: 'https://themewagon.github.io/cozastore/images/product-14.jpg', category: 'Women' },
    { id: 15, name: 'Mini Silver Mesh Watch', price: '$86.85', oldPrice: '$92.00', image: 'https://themewagon.github.io/cozastore/images/product-15.jpg', category: 'Watches' },
    { id: 16, name: 'Square Neck Back', price: '$29.64', oldPrice: '$35.62', image: 'https://themewagon.github.io/cozastore/images/product-16.jpg', category: 'Women' },
  ];

  // وظيفة معالجة البحث
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  // إغلاق البحث
  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // فتح/إغلاق البحث
  const openSearch = () => {
    setIsSearchOpen(prev => !prev);
    setIsFilterOpen(false);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  // فتح/إغلاق الفلاتر
  const openFilter = () => {
    setIsFilterOpen(prev => !prev);
    setIsSearchOpen(false);
  };

  // تطبيق الفلاتر على قائمة المنتجات
  const applyFilters = list => {
    let filtered = [...list];

    // تطبيق فلتر البحث
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // تطبيق فلتر السعر
    if (filterState.price) {
      filtered = filtered.filter(p => {
        const n = parseFloat(p.price.replace('$', ''));
        return n >= filterState.price.min && n <= filterState.price.max;
      });
    }

    // تطبيق فرز السعر من الأقل للأعلى
    if (filterState.sort === 'Price: Low to High') {
      filtered.sort(
        (a, b) =>
          parseFloat(a.price.replace('$', '')) -
          parseFloat(b.price.replace('$', ''))
      );
    }

    // تطبيق فرز السعر من الأعلى للأقل
    if (filterState.sort === 'Price: High to Low') {
      filtered.sort(
        (a, b) =>
          parseFloat(b.price.replace('$', '')) -
          parseFloat(a.price.replace('$', ''))
      );
    }

    return filtered;
  };

  // تصفية المنتجات حسب الفئة المختارة
  const baseFilteredProducts = selectedCategory === 'All Products'
    ? products
    : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

  // تطبيق الفلاتر على المنتجات المصفاة
  const filteredProducts = applyFilters(baseFilteredProducts);

  // تبديل حالة الإعجاب بالمنتج
  const toggleLike = (product) => {
    setLikedProducts(prev => ({
      ...prev,
      [product.id]: !prev[product.id]
    }));

    // فتح نافذة القائمة المفضلة فقط عند الإضافة
    if (!likedProducts[product.id]) {
      setWishlistProduct(product);
      setWishlistModalOpen(true);
    }
  };

  // فتح نافذة العرض السريع
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // إغلاق نافذة العرض السريع
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setQuickViewProduct(null), 300);
  };

  return (
    <div> 
      {/* قسم المنتجات */}
      <section className="md:py-25 bg-white pt-10">
        <div className="container mx-auto px-4 md:px-0">
          <div className="mb-10 md:mb-12 lg:mb-16">
          </div>
          
          {/* علامات التبويب والفلاتر */}
          <div className="flex flex-col md:flex-row justify-between flex-wrap mb-8 gap-4">
            {/* فئات المنتجات */}
            <div className="flex flex-wrap gap-4">
              {['All Products', 'Women', 'Men','Belt', 'Shoes', 'Watches'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative cursor-pointer text-sm md:text-base font-medium transition-colors ${selectedCategory === cat ? 'text-dark1' : 'text-gray3'}`}
                >
                  {cat}
                  
                  {/* خط تحت الفئة النشطة */}
                  <span 
                    className={`absolute left-0 bottom-0 h-px bg-dark1 transition-all duration-300 ${selectedCategory === cat ? 'w-full' : 'w-0'}`}
                  ></span>
                </button>
              ))}
            </div>
            
            {/* أزرار الفلاتر والبحث */}
            <div className="flex gap-2">
              {/* زر الفلاتر */}
              <div 
                className="group flex items-center bg-white border border-white2 px-3 hover:bg-blue1 hover:text-white duration-500 cursor-pointer" 
                onClick={openFilter}
              >
                <span className="text-sm md:text-base text-gray3 group-hover:text-white duration-500">Filter</span>
                <span className="ml-2">{isFilterOpen ? <AiOutlineClose /> : '+'}</span>
              </div>
              
              {/* زر البحث */}
              <div 
                className="group flex items-center bg-white border border-white2 px-3 hover:bg-blue1 hover:text-white duration-500 cursor-pointer"
                onClick={openSearch}
              >
                <span className="text-sm md:text-base text-gray3 group-hover:text-white duration-500">Search</span>
                <span className="ml-2">
                  {isSearchOpen ? <IoMdClose /> : <IoMdSearch />}
                </span>
              </div>
            </div>
          </div>

          {/* قائمة الفلاتر المنبثقة */}
          <FilterDropdown
            isOpen={isFilterOpen}
            filterState={filterState}
            setFilterState={setFilterState}
          />

          {/* قائمة البحث المنبثقة */}
          <SearchDropdown
            isOpen={isSearchOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchSubmit={handleSearchSubmit}
            handleClose={handleSearchClose}
          />

          {/* شبكة المنتجات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                toggleLike={toggleLike}
                likedProducts={likedProducts}
                openQuickView={openQuickView}
              />
            ))}
          </div>
          
          {/* رسالة عدم وجود منتجات */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray4 text-lg">No products found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterState({ sort: null, price: null, color: null, tag: null });
                  setSelectedCategory('All Products');
                }}
                className="mt-4 bg-blue1 text-white py-2 px-6 rounded-3xl hover:bg-black transition-colors duration-500 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
          
          {/* ترقيم الصفحات أو زر "تحميل المزيد" */}
          {showPagination ? (
            <div className="flex justify-center items-center gap-2 text-sm mt-16">
              <button className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-gray2 bg-gray2 text-white transition duration-300">1</button>
              <button className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-white2 text-[#808080] hover:bg-gray2 hover:text-white hover:border-gray2 transition duration-300">2</button>
            </div>
          ) : (
            <div className="text-center my-12">
              <button className="bg-white2 text-black py-2 px-12 rounded-3xl duration-500 cursor-pointer hover:bg-black hover:text-white shadow-md">
                Load More
              </button>
            </div>
          )}

        </div>
      </section>

      {/* نافذة العرض السريع للمنتج */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
      
      {/* نافذة القائمة المفضلة */}
      <WishlistModal
        isOpen={wishlistModalOpen}
        product={wishlistProduct}
        onClose={() => setWishlistModalOpen(false)}
      />
      <ScrollTop/>
    </div>
  );
};

export default Shop;
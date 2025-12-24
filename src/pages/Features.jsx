import { useState } from 'react'; 
import { FaAngleRight } from 'react-icons/fa'; 
import ScrollTop from '../components/ScrollTop' 
import { IoChevronDownOutline } from 'react-icons/io5';

// بيانات المنتجات الأولية
const initialProducts = [
  {
    id: 1,
    name: 'Fresh Strawberries',
    price: 36.00,
    quantity: 1,
    imageUrl: 'https://themewagon.github.io/cozastore/images/item-cart-04.jpg', 
  },
  {
    id: 2,
    name: 'Lightweight Jacket',
    price: 16.00,
    quantity: 1,
    imageUrl: 'https://themewagon.github.io/cozastore/images/item-cart-05.jpg', 
  },
];

// خيارات الدول للقائمة المنسدلة
const countryOptions = [
    { label: 'Select a country...', value: '' },
    { label: 'USA', value: 'USA' },
    { label: 'UK', value: 'UK' },
];

const Features = () => {
  // States للمكون
  const [products, setProducts] = useState(initialProducts);
  const [couponCode, setCouponCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  // تحديث كمية المنتج
  const updateQuantity = (id, change) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newQuantity = Math.max(1, product.quantity + change); 
        return { ...product, quantity: newQuantity };
      }
      return product;
    }));
  };

  // تغيير الدولة المختارة
  const handleCountryChange = (option) => {
      setSelectedCountry(option);
      setIsCountryOpen(false);
  };

  // حساب المجموع
  const subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  const total = subtotal;

  return (
    <div className="bg-white pt-25 md:pt-36 relative min-h-screen "> 
      {/* حاوية المحتوى الرئيسية */}
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ">
        
        {/* Breadcrumb navigation */}
        <div className="text-gray-500 text-sm mb-15">
         <a href ="/" className=' text-gray5 hover:text-blue1'>Home &nbsp; <FaAngleRight className="inline-block text-xs hover:text-blue1" /> &nbsp; </a>  <span className='text-gray2'>Shopping Cart</span>
        </div>
        
        {/* شبكة المحتوى الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
          
          {/* العمود الأيسر: جدول المنتجات */}
          <div className="lg:col-span-2 border border-white2 h-fit pb-5" >
            
            {/* رأس جدول المنتجات (للشاشات الكبيرة فقط) */}
            <div className="hidden sm:grid grid-cols-12 text-sm font-bold text-gray5 uppercase border-b-2 border-white2 pb-3 mb-4 mt-2">
              <div className="col-span-6 text-center">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            {/* قائمة المنتجات */}
            {products.map((product) => (
              <div 
                key={product.id} 
                className="grid grid-cols-12 items-center py-6 sm:py-12 border-b border-white2 px-2 sm:px-0">
                
                {/* معلومات المنتج مع الصورة */}
                <div className="col-span-12 sm:col-span-6 flex items-center space-x-4 mx-auto sm:mx-0 px-10">
                  <div className="relative group w-16 h-20 cursor-pointer">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover" />
                    {/* زر حذف المنتج عند التمرير */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray4 font-normal text-[15px]">{product.name}</span>
                </div>
                
                {/* سعر المنتج */}
                <div className="col-span-4 sm:col-span-2 text-center text-gray4 text-[17px] mt-4 sm:mt-0">
                  <span className="sm:hidden font-medium text-sm mr-1 block">Price:</span>
                  ${product.price.toFixed(2)}
                </div>
                
                {/* أدوات التحكم في الكمية */}
                <div className="col-span-4 sm:col-span-2 flex justify-center mt-4 sm:mt-0">
                  <div className="flex border border-white2">
                    <button 
                      onClick={() => updateQuantity(product.id, -1)} 
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg text-gray4 hover:text-white cursor-pointer hover:bg-blue1 transition"
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      readOnly
                      value={product.quantity} 
                      className=" bg-white1 w-8 sm:w-10 text-center border-l border-r border-white2 text-gray4 text-[1rem] focus:outline-none" 
                    />
                    <button 
                      onClick={() => updateQuantity(product.id, 1)} 
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg text-gray4 hover:bg-blue1 hover:text-white cursor-pointer transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* المجموع للمنتج */}
                <div className="col-span-4 sm:col-span-2 text-center text-gray4 text-[17px] mt-4 sm:mt-0">
                  <span className="sm:hidden font-semibold text-sm mr-1 block">Total:</span>
                  ${(product.price * product.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            
            {/* قسم الكوبون وتحديث السلة */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-0 mb-0 px-4 pt-4 pb-0 gap-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto ">
                <input 
                  type="text" 
                  placeholder="Coupon Code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="p-3 rounded-3xl border border-white2 focus:outline-none transition flex-1 min-w-37.5"
                />
                <button className="w-full sm:w-auto border border-white2 bg-[#f3f3f3] rounded-3xl hover:bg-blue1 hover:text-white text-gray6 cursor-pointer uppercase font-medium text-[15px] px-8 py-3 transition duration-300 whitespace-nowrap">
                  Apply Coupon
                </button>
              </div>           
              <button className=" w-full sm:w-auto border border-white2 bg-[#f3f3f3] rounded-3xl hover:bg-blue1 hover:text-white text-gray6 cursor-pointer uppercase font-medium text-[15px] px-7 py-3 transition duration-300 mb-0">
                Update Cart
              </button>
            </div> 
          </div>
          
          {/* العمود الأيمن: ملخص السلة */}
          <div className="lg:col-span-1 border border-white2">
            <div className="p-5">
              <h3 className="text-[22px] font-bold uppercase mb-6 text-gray6 font-poppins">
                CART TOTALS
              </h3>
              
              {/* المجموع الفرعي */}
              <div className="flex justify-between py-3 border-b border-dashed border-[#d9d9d9] ">
                <span className="text-dark1 font-medium ">Subtotal:</span>
                <span className="text-dark1 text-[18px] font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              
              {/* قسم الشحن */}
              <div className="flex flex-col sm:flex-row py-3 items-start border-b border-[#d9d9d9]">
                <span className="text-dark1 font-medium mr-1 -mt-0.5 ">Shipping:</span>
                <div className="w-full sm:w-2/3">
                  <p className="text-sm text-gray3 mb-6 leading-relaxed">
                    There are no shipping methods available.
                    Please double check your address, or contact us if you need any help.
                  </p>
                  
                  {/* نموذج حساب الشحن */}
                  <form onSubmit={(e) => e.preventDefault()}>
                    <h4 className="text-[13px] font-semibold tracking-wider uppercase mb-3 text-gray5">
                      CALCULATE SHIPPING
                    </h4>
                    
                    {/* قائمة اختيار الدولة */}
                    <div className="mb-4 relative z-20 text-gray5">
                      <label htmlFor="calc-country" className="sr-only">Select a country</label>
                      <button
                        type="button"
                        onClick={() => setIsCountryOpen(!isCountryOpen)}
                        className="w-full p-2 border border-white2 focus:outline-none text-sm text-gray5 cursor-pointer flex justify-between items-center bg-white"
                      >
                        {selectedCountry.label}
                        <IoChevronDownOutline 
                          className={`fas fa-chevron-down text-gray5 text-sm transition-transform duration-200 hover:text-blue1 ${isCountryOpen ? 'rotate-180' : ''}`}/>
                      </button>
                      {/* قائمة الدول المنسدلة */}
                      {isCountryOpen && (
                        <div className="text-gray5 absolute bottom-full left-0 w-full border border-white2 bg-white shadow-lg mb-1 z-30 max-h-40 overflow-y-auto">
                          {countryOptions.map((option) => (
                            <div 
                              key={option.value}
                              onClick={() => handleCountryChange(option)}
                              className={`p-2 text-sm text-gray5 cursor-pointer transition whitespace-nowrap${selectedCountry.value === option.value 
                                         ? 'bg-blue1 text-white' 
                                         : 'hover:bg-blue1 hover:text-white'}`}>
                              {option.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* حقل الولاية */}
                    <div className="mb-4">
                      <label htmlFor="calc-state" className="sr-only">State / country</label>
                      <input
                        type="text"
                        id="calc-state"
                        placeholder="State / country"
                        className="text-gray5 w-full p-2 border border-white2 focus:outline-none text-sm"/>
                    </div>
                    
                    {/* حقل الرمز البريدي */}
                    <div className="mb-6">
                      <label htmlFor="calc-zip" className="sr-only">Postcode / Zip</label>
                      <input
                        type="text"
                        id="calc-zip"
                        placeholder="Postcode / Zip"
                        className="w-full p-2 border text-gray5 border-gray-300 focus:outline-none text-sm"/>
                    </div>
                    
                    {/* زر تحديث المجموع */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto border border-white2 bg-[#f3f3f3] rounded-3xl hover:bg-blue1 hover:text-white text-gray6 cursor-pointer uppercase font-medium text-[15px] px-9 py-3 transition duration-300 mb-1">
                      UPDATE TOTALS
                    </button>
                  </form>
                </div>
              </div>
              
              {/* المجموع الكلي */}
              <div className="flex justify-between pt-4 text-xl border-t border-dashed border-[#d9d9d9]">
                <span className="font-bold text-gray6">Total:</span>
                <span className="font-semibold text-gray6">${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* زر المتابعة للدفع */}
            <div className="mt-4 px-3 pb-8 py-4">
              <a href='/Features'>
                <button
                  onClick={() => console.log('Proceeding to checkout...')}
                  className="w-full py-3 text-white uppercase text-base font-semibold tracking-wider transition duration-200 cursor-pointer rounded-full shadow-lg bg-dark1 hover:bg-blue1">
                  PROCEED TO CHECKOUT
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ScrollTop/>
    </div>
  );
};

export default Features;
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { IoMdMenu, IoMdSearch, IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// المصفوفات والبيانات الثابتة
const MAIN_LINKS = [
    { id: 1, text: "Home", link: "/", hasDropdown: true, dropdownItems: [{ text: "Homepage 1", link: "/" }, { text: "Homepage 2", link: "/home2" }, { text: "Homepage 3", link: "/home3" }] },
    { id: 2, text: "Shop", link: "/shop" },
    { id: 3, text: "Features", link: "/features", isHot: true },
    { id: 4, text: "Blog", link: "/blog" },
    { id: 5, text: "About", link: "/about" },
    { id: 6, text: "Contact", link: "/contact" }
];

// مصفوفة الصور للـ Lightbox - معرض الصور
const GALLERY_IMAGES = [
    { src: "https://themewagon.github.io/cozastore/images/gallery-01.jpg" },
    { src: "https://themewagon.github.io/cozastore/images/gallery-02.jpg" },
    { src: "https://themewagon.github.io/cozastore/images/gallery-03.jpg" },
    { src: "https://themewagon.github.io/cozastore/images/gallery-04.jpg" },
    { src: "https://themewagon.github.io/cozastore/images/gallery-05.jpg" },
    { src: "https://themewagon.github.io/cozastore/images/gallery-06.jpg" },
    { src: "https://themewagon.github.io/cozastore/images/gallery-07.jpg" },
    { src: "https://themewagon.github.io/cozastore/images/gallery-08.jpg" },
    { src: "https://themewagon.github.io/cozastore/images/gallery-09.jpg" },
];

// عناصر سلة التسوق الافتراضية
const CART_ITEMS = [
    {
        id: 1,
        name: "White Shirt Pleat",
        price: 19.00,
        image: "https://themewagon.github.io/cozastore/images/item-cart-01.jpg"
    },
    {
        id: 2,
        name: "Converse All Star",
        price: 39.00,
        image: "https://themewagon.github.io/cozastore/images/item-cart-02.jpg"
    },
    {
        id: 3,
        name: "Nixon Porter Leather",
        price: 17.00,
        image: "https://themewagon.github.io/cozastore/images/item-cart-03.jpg"
    }
];

// المكونات الفرعية

// مكون رابط التنقل الرئيسي (NavLink)
// يعرض رابط مع أو بدون قائمة منسدلة وعلامة "HOT"
const NavLink = ({ link, text, hasDropdown, dropdownItems, isHot, textColorClass }) => (
    <div className="relative group">
        <Link 
            to={link}  
            className={`px-4 py-6 transition-colors duration-200 font-medium flex items-center text-[15px] ${textColorClass}`}
        >
            {text}
            {hasDropdown && <FiChevronDown className="ml-1 text-sm" />}
        </Link>
        {isHot && (
            <span className="absolute top-6 right-1 transform translate-x-1/2 -translate-y-1/2 bg-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-tight">
                HOT
            </span>
        )}
        {hasDropdown && (
            <div className="absolute left-0 top-full bg-white shadow-lg py-3 min-w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {dropdownItems.map((item, index) => (
                    <Link key={index} to={item.link} className="block px-6 py-3 text-dark1 hover:text-blue1 hover:bg-gray-50 transition-colors text-[14px]">
                        {item.text}
                    </Link>
                ))}
            </div>
        )}
    </div>
);

// مكون الأيقونة مع العداد (IconWithBadge)
// يعرض أيقونة مع عداد للمنتجات (اختياري) ويستجيب للنقر
const IconWithBadge = ({ icon, count, textColorClass, onClick }) => (
    <div className="flex items-center">
        <div className="relative group">
            <div 
                onClick={onClick}
                className={`p-4 cursor-pointer transition-colors duration-200 text-[22px] relative ${textColorClass}`}
            >
                {icon}
                {count >= 0 && (
                    <span className="absolute top-2 right-1 bg-blue1 text-white text-[10px] h-4 w-3.5 flex items-center justify-center">
                        {count}
                    </span>
                )}
            </div>
        </div>
    </div>
);

// المكون الرئيسي: Header
const Header = () => {
    // استخدام الـ Hooks
    const location = useLocation();
    const navigate = useNavigate();
    
    // حالات المكون (State)
    const [scrolled, setScrolled] = useState(false); // حالة التمرير
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // حالة القائمة الجانبية
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // حالة القائمة المتنقلة
    
    // حالات البحث وسلة التسوق
    const [isSearchOpen, setIsSearchOpen] = useState(false); // حالة نافذة البحث
    const [isCartOpen, setIsCartOpen] = useState(false); // حالة سلة التسوق
    const [searchQuery, setSearchQuery] = useState(""); // حالة نص البحث
    
    // حالات الـ Lightbox
    const [isOpenGallery, setIsOpenGallery] = useState(false); // حالة فتح المعرض
    const [photoIndex, setPhotoIndex] = useState(0); // فهرس الصورة الحالية
    const [mobileMenuOpenDropdown, setMobileMenuOpenDropdown] = useState(null); // القائمة المفتوحة في الموبايل

    // تحديد أنواع الصفحات
    const isHome3Page = location.pathname === "/home3";
    const isHome1Page = location.pathname === "/";
    const isHome2Page = location.pathname === "/home2";
    const isHomePage = isHome1Page || isHome2Page || isHome3Page;
    const shouldShowTopBar = !isHome3Page; // تحديد ما إذا كان يجب إظهار الشريط العلوي

    // استخدام Effect لمتابعة التمرير
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // معالج الأحداث
    
    // معالج إرسال نموذج البحث
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            navigate('/shop');
        }
    };

    // دوال تحديد الأنماط بناءً على الصفحة وحالة التمرير
    
    // دالة لتحديد لون خلفية الهيدر
    const getHeaderBackground = () => {
        if (isHome3Page) {
            // في home3: شفاف عند البداية، داكن عند التمرير
            return scrolled ? 'bg-dark1' : 'bg-transparent';
        } else if (isHome1Page || isHome2Page) {
            // في home1 و home2: شفاف عند البداية، أبيض عند التمرير
            return scrolled ? 'bg-white' : 'bg-transparent';
        } else {
            // في الصفحات الأخرى: أبيض دائماً
            return 'bg-white';
        }
    };

    // دالة لتحديد فئة لون النص للروابط
    const getNavLinkTextColor = () => {
        if (isHome3Page) {
            // في home3: نص أبيض عند عدم التمرير، نص gray6 عند التمرير
            return  'text-white hover:text-blue1';
        } else if (isHome1Page || isHome2Page) {
            // في home1 و home2: نص أبيض عند عدم التمرير، نص gray6 عند التمرير
            return 'text-gray6 hover:text-blue1';
        } else {
            // في جميع الصفحات الأخرى: نص gray6 دائماً
            return 'text-gray6 hover:text-blue1';
        }
    };

    // دالة لتحديد فئة لون النص للأيقونات
    const getIconTextColor = () => {
        if (isHome3Page) {
            // في home3: نص أبيض عند عدم التمرير، نص gray6 عند التمرير
            return 'text-white hover:text-blue1';
        } else if (isHome1Page || isHome2Page) {
            // في home1 و home2: نص أبيض عند عدم التمرير، نص gray6 عند التمرير
            return 'text-gray6 hover:text-blue1';
        } else {
            // في جميع الصفحات الأخرى: نص gray6 دائماً
            return 'text-gray6 hover:text-blue1';
        }
    };

    // دالة لتحديد فئة لون الشعار
    const getLogoImage = () => {
        if (isHome3Page) {
            // في home3: شفاف عند البداية، داكن عند التمرير
            return  "https://themewagon.github.io/cozastore/images/icons/logo-02.png";
        } else if (isHome1Page || isHome2Page) {
            // في home1 و home2: شفاف عند البداية، داكن عند التمرير
            return "https://themewagon.github.io/cozastore/images/icons/logo-01.png" 
        } else {
            // في جميع الصفحات الأخرى: داكن دائماً
            return "https://themewagon.github.io/cozastore/images/icons/logo-01.png";
        }
    };
    // إرجاع واجهة المستخدم
    return (
        <header className="w-full z-50 fixed top-0 left-0">
            
            {/* 1. الشريط العلوي الداكن (Top Bar) */}
            {/* يظهر فقط في home1 و home2 */}
            {shouldShowTopBar && (
                <div 
                    className={`w-full transition-all duration-300 ease-in-out bg-dark1 hidden md:block
                        ${scrolled && isHomePage ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100 h-auto py-3'}`}
                >
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <span className="text-xs text-gray1">Free shipping for standard order over $100</span>
                        <div className="flex items-center space-x-6 text-[13px]">
                            <span className="cursor-pointer hover:text-blue1 duration-500 transition-colors text-gray1">Help & FAQs</span>
                            <span className="cursor-pointer hover:text-blue1 duration-500 transition-colors text-gray1">My Account</span>
                            <span className="cursor-pointer hover:text-blue1 duration-500 transition-colors text-gray1">EN / USD</span>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. واجهة البحث (Search Overlay) */}
            <div className={`fixed inset-0 z-300 bg-white/95 flex items-center justify-center transition-all duration-500 ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <button onClick={() => setIsSearchOpen(false)} className="absolute cursor-pointer top-60 right-6 md:top-53 md:right-65 text-5xl text-gray4 hover:text-gray5 transition-transform duration-300">
                    <IoMdClose size={30} />
                </button>
                <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl px-6">
                    <div className="relative flex items-center bg-white border border-white2 rounded-sm shadow-sm p-2 group transition-all">
                        <button type="submit" className="text-3xl text-gray6 ml-4 cursor-pointer hover:text-blue1 transition-colors">
                            <IoMdSearch />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full text-2xl outline-none bg-transparent text-dark1 placeholder:text-gray5 p-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus={isSearchOpen}
                        />
                    </div>
                </form>
            </div>

            {/* 3. الهيدر الرئيسي (Main Header) */}
            <div 
                className={`w-full transition-all duration-300 ${getHeaderBackground()}`}
            >
                <div className="container mx-auto flex items-center justify-between px-4">
                    {/* الشعار والقائمة الرئيسية */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center py-4 mr-10">
                            <img 
                                src={getLogoImage()} 
                                alt="Coza Store" 
                                className="transition-all duration-300"
                            />
                        </Link>
                        
                        {/* القائمة الرئيسية - تظهر فقط على الشاشات الكبيرة */}
                        <nav className="hidden lg:flex items-center">
                            {MAIN_LINKS.map((item) => (
                                <NavLink 
                                    key={item.id} 
                                    {...item} 
                                    textColorClass={getNavLinkTextColor()}
                                />
                            ))}
                        </nav>
                    </div>

                    {/* الأيقونات - تظهر فقط على الشاشات الكبيرة */}
                    <div className="hidden lg:flex items-center">
                        {isHome3Page || isHome2Page ? (
                            // في home3 و home2: أيقونات خاصة
                            <>
                                <IconWithBadge 
                                    icon={<FaShoppingCart />} 
                                    count={2} 
                                    textColorClass={getIconTextColor()} 
                                    onClick={() => setIsCartOpen(true)}
                                />
                                <div className={`h-20 border border-[#ffffff1a] mx-1` }></div>
                                <IconWithBadge 
                                    icon={<IoMdMenu size={32} />}  
                                    textColorClass={getIconTextColor()} 
                                    onClick={() => setIsSideMenuOpen(true)}
                                />
                            </>
                        ) : (
                            // في home1 و الصفحات الأخرى
                            <>
                                <IconWithBadge 
                                    icon={<IoMdSearch />} 
                                    textColorClass={getIconTextColor()} 
                                    onClick={() => setIsSearchOpen(true)} 
                                />
                                <IconWithBadge 
                                    icon={<FaShoppingCart />} 
                                    count={2} 
                                    textColorClass={getIconTextColor()} 
                                    onClick={() => setIsCartOpen(true)}
                                />
                                <IconWithBadge 
                                    icon={<MdFavoriteBorder />} 
                                    count={0} 
                                    textColorClass={getIconTextColor()} 
                                />
                            </>
                        )}
                    </div>

                    {/* الشريط السفلي للموبايل - يظهر فقط على الشاشات الصغيرة */}
                    <div className="lg:hidden flex items-center space-x-2">
                        {/* أيقونة البحث على الموبايل */}
                        <IconWithBadge 
                            icon={<IoMdSearch />} 
                            textColorClass={getIconTextColor()} 
                            onClick={() => setIsSearchOpen(true)}
                        />
                        
                        {/* أيقونة السلة على الموبايل */}
                        <IconWithBadge 
                            icon={<FaShoppingCart />} 
                            count={2} 
                            textColorClass={getIconTextColor()} 
                            onClick={() => setIsCartOpen(true)}
                        />
                        
                        {/* أيقونة القائمة على الموبايل */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={`p-4 transition-colors duration-200 text-[22px] ${getIconTextColor()}`}
                        >
                            <IoMdMenu />
                        </button>
                    </div>
                </div>

                {/* خط الفاصل */}
                <div className={`w-full h-px transition-all duration-300 
                    ${isHome3Page 
                        ? (scrolled ? "bg-white2" : "bg-[#ffffff1a]") 
                        : (isHomePage && !scrolled ? "bg-[#ffffff1a]" : "bg-white2")}`}
                />
            </div>

            {/* 4. سلة المشتريات الجانبية (Cart Drawer) */}
            <div className={`fixed inset-0 z-400 transition-all duration-500 ${isCartOpen ? "visible" : "invisible"}`}>
                <div 
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isCartOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsCartOpen(false)}
                ></div>

                <div className={`absolute right-0 top-0 h-full w-full max-w-100 bg-white transition-transform duration-500 p-10 flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-[16px] font-poppins font-black text-dark1 uppercase">Your Cart</h3>
                        <button onClick={() => setIsCartOpen(false)} className="text-3xl text-dark1 hover:text-blue1 transition-transform cursor-pointer">
                            <IoMdClose />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <ul className="space-y-8">
                            {CART_ITEMS.map((item) => (
                                <li key={item.id} className="flex items-center space-x-5 group">
                                    <div className="w-20 h-24 overflow-hidden bg-gray-100 relative cursor-pointer">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <IoMdClose className="text-white text-2xl" />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-gray6 text-[14px] mb-1 hover:text-blue1 cursor-pointer transition-colors font-poppins">
                                            {item.name}
                                        </h4>
                                        <span className="text-gray3 text-[14px] font-poppins">
                                            1 x ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="text-xl text-gray6 mb-8 font-poppins tracking-wide">
                            Total: $75.00
                        </div>
                        <div className="flex space-x-3">
                            <Link to="/features" onClick={() => setIsCartOpen(false)} className="flex-1 bg-dark1 text-white py-3.5 rounded-full uppercase text-[14px] font-semibold hover:bg-blue1 transition-colors text-center font-poppins tracking-widest shadow-md">
                                View Cart
                            </Link>
                            <Link to="/features" onClick={() => setIsCartOpen(false)} className="flex-1 bg-dark1 text-white py-3.5 rounded-full uppercase text-[14px] font-semibold hover:bg-blue1 transition-colors text-center font-poppins tracking-widest shadow-md">
                                Check Out
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. القائمة الجانبية (Side Menu) */}
            {/* تظهر فقط في home3 على الشاشات الكبيرة */}
            {(isHome3Page || isHome2Page) && (
                <div className={`fixed inset-0 z-200 transition-all duration-500 ${isSideMenuOpen ? "visible" : "invisible"}`}>
                    <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isSideMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsSideMenuOpen(false)}></div>
                    <div className={`absolute right-0 top-0 h-full w-full max-w-102.5 bg-white transition-transform duration-500 p-12 overflow-y-auto ${isSideMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                        <button className="absolute top-8 cursor-pointer right-8 text-5xl text-gray6 hover:text-blue1 transition-colors" onClick={() => setIsSideMenuOpen(false)}>&times;</button>
                        <nav className="flex flex-col space-y-5 mb-9 mt-9">
                            {["Home", "My Wishlist", "My Account", "Track Order", "Refunds", "Help & FAQs"].map((text) => (
                                <Link key={text} to={text=="Home"?"/":"#"} onClick={()=>{if(text==="Home") setIsSideMenuOpen(false)}} className="text-[14px] text-gray6 hover:text-blue1 transition-colors font-poppins">{text}</Link>
                            ))}
                        </nav>
                        <div>
                            <h4 className="text-[18px] font-medium text-gray6 mb-4">@ CozaStore</h4>
                            <div className="grid grid-cols-3 gap-3">
                                {GALLERY_IMAGES.map((img, i) => (
                                    <div key={i} className="aspect-square overflow-hidden relative group cursor-pointer bg-gray-100" onClick={() => { setPhotoIndex(i); setIsOpenGallery(true); }}>
                                        <img src={img.src} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-blue1/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 mb-6">
                            <h4 className="text-[18px] font-medium text-gray6 mb-6">About Us</h4>
                            <p className="text-gray3 text-[14px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus vulputate hendrerit. Praesent faucibus erat vitae rutrum gravida. Vestibulum tempus mi enim, in molestie sem fermentum quis.</p>
                        </div>
                    </div>
                </div>
            )}
            {/* 6. القائمة المتنقلة (Mobile Menu) */}
            {/* تظهر على جميع الصفحات عند الشاشات الصغيرة */}
            <div className={`fixed inset-0 z-500 transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
                <div 
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
                
                <div className={`absolute right-0 top-0 h-full w-full max-w-xs bg-white transition-transform duration-500 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    {/* رأس القائمة */}
                    <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 py-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[15px] font-semibold text-gray6">COZA STORE</span>
                            <button 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-2xl text-gray6 hover:text-blue1 transition-colors p-2"
                            >
                                <IoMdClose />
                            </button>
                        </div>
                    </div>

                    {/* محتوى القائمة */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* معلومات الشحن المجاني */}
                        <div className="bg-dark1 text-white p-3 rounded-lg mb-4 text-center">
                            <p className="text-sm font-medium">Free shipping for standard order over $100</p>
                        </div>

                        {/* روابط سريعة */}
                        <div className="flex justify-between items-center mb-4 text-sm text-gray-600 border-b pb-3">
                            <span className="cursor-pointer hover:text-blue1 transition-colors">Help & FAQs</span>
                            <span className="cursor-pointer hover:text-blue1 transition-colors">My Account</span>
                            <span className="cursor-pointer hover:text-blue1 transition-colors">EN / USD</span>
                        </div>

                        {/* روابط التنقل الرئيسية */}
                        <div className="space-y-1 mb-6">
                            {MAIN_LINKS.map((item) => {
                                const isDropdownOpen = mobileMenuOpenDropdown === item.id;
                                
                                return (
                                    <div key={item.id}>
                                        <div 
                                            onClick={(e) => {
                                                if (item.hasDropdown) {
                                                    e.preventDefault();
                                                    setMobileMenuOpenDropdown(isDropdownOpen ? null : item.id);
                                                } else {
                                                    setIsMobileMenuOpen(false);
                                                }
                                            }}
                                            className="flex items-center justify-between py-3 px-3 hover:bg-gray-50 rounded-md transition-colors group cursor-pointer"
                                        >
                                            <Link 
                                                to={item.link}
                                                onClick={(e) => {
                                                    if (!item.hasDropdown) {
                                                        setIsMobileMenuOpen(false);
                                                    } else {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                className="text-gray6 font-medium group-hover:text-blue1 flex-1"
                                            >
                                                {item.text}
                                            </Link>
                                            <div className="flex items-center gap-2">
                                                {item.isHot && (
                                                    <span className="bg-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                        HOT
                                                    </span>
                                                )}
                                                {item.hasDropdown && (
                                                    <FiChevronDown 
                                                        className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* العناصر الفرعية */}
                                        {item.hasDropdown && isDropdownOpen && (
                                            <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-3 py-2">
                                                {item.dropdownItems.map((dropdownItem, index) => (
                                                    <Link
                                                        key={index}
                                                        to={dropdownItem.link}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="flex items-center py-2 px-3 text-gray5 hover:text-blue1 hover:bg-gray-50 rounded-md transition-colors text-sm"
                                                    >
                                                        {dropdownItem.text}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* الأيقونات في الأسفل */}
                        <div className="border-t pt-4">
                            <div className="flex justify-around items-center">
                                <IconWithBadge 
                                    icon={<IoMdSearch />} 
                                    textColorClass="text-gray6 hover:text-blue1" 
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsSearchOpen(true);
                                    }} 
                                />
                                <IconWithBadge 
                                    icon={<FaShoppingCart />} 
                                    count={2} 
                                    textColorClass="text-gray6 hover:text-blue1" 
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsCartOpen(true);
                                    }}
                                />
                                <IconWithBadge 
                                    icon={<MdFavoriteBorder />} 
                                    count={0} 
                                    textColorClass="text-gray6 hover:text-blue1" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* تذييل القائمة */}
                    <div className="border-t p-4 bg-gray-50">
                        <p className="text-center text-xs text-gray-500">
                            © 2023 COZA STORE. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* 7. Lightbox لعرض الصور */}
            <Lightbox open={isOpenGallery} close={() => setIsOpenGallery(false)} index={photoIndex} slides={GALLERY_IMAGES} />
        </header>
    );
};

export default Header;
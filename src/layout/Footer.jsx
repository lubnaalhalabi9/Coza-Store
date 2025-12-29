import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

// بيانات الروابط للعرض في الأعمدة
const footerSections = [
  { 
    title: 'CATEGORIES', 
    links: ['Women', 'Men', 'Shoes', 'Watches'] 
  },
  { 
    title: 'HELP', 
    links: ['Track Order', 'Returns', 'Shipping', 'FAQs'] 
  },
];

const SOCIAL_LINKS = [
    {
        icon: <FaFacebookF />,
        link: "#",
    },
    {
        icon: <FaInstagram />,
        link: "#",
    },
    {
        icon: <FaPinterestP />,
        link: "#",
    },
];

const SocialLink = ({ link, icon }) => (
    <a href={link} className="text-gray1 hover:text-blue1 transition-colors duration-300 text-lg mr-4">
        {icon}
    </a>
);

const Footer = () => {
  return (
    <footer className="bg-dark1 text-white pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* القسم الرئيسي (4 أعمدة) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          
          {/* العمود 1: CATEGORIES */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-md font-bold uppercase mb-4 tracking-wider text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray1 hover:text-blue1 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* العمود 3: GET IN TOUCH */}
          <div>
            <h4 className="text-md font-bold uppercase mb-4 tracking-wider text-white">
              GET IN TOUCH
            </h4>
            <p className="text-gray1 text-sm mb-4">
              Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
            </p>
            {/* أيقونات التواصل الاجتماعي */}
            <div className='flex mt-4'>
                {SOCIAL_LINKS.map((e, i) => (
                    <SocialLink key={i} link={e.link} icon={e.icon} />
                ))}
            </div>
          </div>

          {/* العمود 4: NEWSLETTER */}
          <div>
            <h4 className="text-md font-bold uppercase mb-4 tracking-wider text-white">
              NEWSLETTER
            </h4>
            <form>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full p-2 mb-4 border-b border-solid border-gray6 text-white placeholder-gray-400 focus:outline-none focus:border-pink-600 transition duration-300 text-sm"
              />
              <button 
                type="submit"
                className=" cursor-pointer w-[60%] rounded-3xl  bg-blue1 text-white hover:bg-white hover:text-blue1 hover:border-blue1 uppercase text-sm font-medium py-3 transition duration-300"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* قسم حقوق النشر والدفع */}
        <div className="flex flex-col justify-center items-center pt-8 gap-5">
          
          {/* أيقونات الدفع */}
          <div className="flex space-x-1 text-3xl mb-4 sm:mb-0 cursor-pointer">
            <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-01.png" alt="card1" />
            <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-02.png" alt="card2" />
            <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-03.png" alt="card3" />
            <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-04.png" alt="card4" />
            <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-05.png" alt="card5" />
          </div>

          {/* حقوق النشر */}
          <p className="text-gray2 text-sm text-center sm:text-left ">
            Copyright ©2025 All rights reserved | Made with <span className="text-xl">  ♡  </span> by 
            <a href="https://colorlib.com/" className="text-blue2">  Colorlib</a> & distributed by 
            <a href="https://themewagon.com/" className="text-blue2">  ThemeWagon</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  return (
    <>
      {showScroll && (
        <button 
          onClick={scrollTop}
          className="fixed bottom-6 right-6 bg-blue1 opacity-[0.5] text-white p-3  shadow-lg cursor-pointer hover:opacity-[1] hover:bg-blue1 transition duration-300 z-50"
        >
          <FaAngleUp className="text-xl" />
        </button>
      )}
    </>
  );
};

export default ScrollTop;
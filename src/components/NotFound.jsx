import React, { useState } from 'react'; 

const NotFound = () => {
 
  const [isChanged, setIsChanged] = useState(false);

  const handleIconClick = () => {
    setIsChanged(true); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white1 text-[#00000080] text-center px-5 font-sans">
      
      
      <h1 className="text-[60px] font-medium text-dark1 mb-8 leading-none">
        404
      </h1>

      
      {!isChanged ? (
       
        <>
          <p className="text-[16px] font-bold mt-2.5 mb-7.5 text-[#00000080]">
            File not found
          </p>
          <div className="max-w-150 space-y-4 leading-[1.6]">
            <p className="text-base">
              The site configured at this address does not contain the requested file.
            </p>
            <p className="text-base">
              If this is your site, make sure that the filename case matches the URL as well as any file permissions.
            </p>
            <p className="text-base">
              For root URLs (like <code className=" px-1 rounded text-sm">http://example.com/</code>) you must provide an <code className=" px-1 rounded text-sm">index.html</code> file.
            </p>
            <p className="text-base">
              <a href="https://docs.github.com/pages" className="text-[#4183c4] font-semibold no-underline hover:underline">
                Read the full documentation
              </a> for more information about using <strong className="text-gray3">GitHub Pages</strong>.
            </p>
          </div>
        </>
      ) : (
        
        <>
          <p className="text-[16px] font-bold mt-2.5 mb-7.5 text-[#00000080]">
            There isn't a GitHub Pages site here.
          </p>
          <div className="max-w-150 space-y-4 leading-[1.6]">
            <p className="text-base px-10">
              If you're trying to publish one, <a href="#" className="text-[#4183c4] no-underline hover:underline">Read the full documentation</a> to learn how to set up 
              <strong className="text-gray3 mx-1">GitHub Pages</strong> for your repository, organization, or user account.
            </p>
          </div>
        </>
      )}

      {/* الروابط السفلية الثابتة */}
      <div className="mt-10 flex items-center gap-5 text-sm">
        <a href="https://githubstatus.com" className="text-gray4 font-normal no-underline hover:underline">
          GitHub Status
        </a>
        <span className="text-[#ccc]">—</span>
        <a href="https://twitter.com/githubstatus" className="text-gray4 font-normal no-underline hover:underline">
          @githubstatus
        </a>
      </div>

      {/* أيقونة GitHub*/}
      <button onClick={handleIconClick} className="mt-5 focus:outline-none bg-transparent border-none p-0 cursor-pointer">
        <svg 
          className="w-8 h-8 opacity-60 text-gray2 hover:opacity-100 transition-opacity" 
          viewBox="0 0 16 16" 
          version="1.1" 
          aria-hidden="true" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </button>
    </div>
  );
};

export default NotFound;
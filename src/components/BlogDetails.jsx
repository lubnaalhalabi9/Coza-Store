import { Link, useParams } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { FaAngleRight } from 'react-icons/fa';

const BlogDetail = () => {
  const { id } = useParams();
  const posts = [
    {
      id: 1,
      date: "22",
      month: "Jan 2018",
      title: "8 Inspiring Ways to Wear Dresses in the Winter",
      image: "https://themewagon.github.io/cozastore/images/blog-04.jpg",
      paragraph1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet est vel orci luctus sollicitudin. Duis eleifend vestibulum justo, varius semper lacus condimentum dictum. Donec pulvinar a magna ut malesuada. In posuere felis diam, vel sodales metus accumsan in. Mauris viverra dui eu pharetra pellentesque. Donec a eros leo. Quisque sed ligula vitae lorem efficitur faucibus. Praesent sit amet imperdiet ante. Nulla id tellus auctor, dictum libero a, malesuada nisi. Nulla in porta nibh, id vestibulum ipsum. Praesent dapibus tempus erat quis aliquet. Donec ac purus id sapien condimentum feugiat.",
      paragraph2: "Praesent vel mi bibendum, finibus leo ac, condimentum arcu. Pellentesque sem ex, tristique sit amet suscipit in, mattis imperdiet enim. Integer tempus justo nec velit fringilla, eget eleifend neque blandit. Sed tempor magna sed congue auctor. Mauris eu turpis eget tortor ultricies elementum. Phasellus vel placerat orci, a venenatis justo. Phasellus faucibus venenatis nisl vitae vestibulum. Praesent id nibh arcu. Vivamus sagittis accumsan felis, quis vulputate."
    },
    {
      id: 2,
      date: "18",
      month: "Jan 2018",
      title: "The Great Big List of Men’s Gifts for the Holidays",
      image: "https://themewagon.github.io/cozastore/images/blog-05.jpg",
      paragraph1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet est vel orci luctus sollicitudin. Duis eleifend vestibulum justo, varius semper lacus condimentum dictum. Donec pulvinar a magna ut malesuada. In posuere felis diam, vel sodales metus accumsan in.",
      paragraph2: "Praesent vel mi bibendum, finibus leo ac, condimentum arcu. Pellentesque sem ex, tristique sit amet suscipit in, mattis imperdiet enim. Integer tempus justo nec velit fringilla, eget eleifend neque blandit."
    },
    {
      id: 3,
      date: "16",
      month: "Jan 2018",
      title: "5 Winter-to-Spring Fashion Trends to Try Now",
      image: "https://themewagon.github.io/cozastore/images/blog-06.jpg",
      paragraph1: "Mauris non tempor quam, et efficitur sapien. Integer sit amet varius tellus. Sed efficitur scelerisque elit. Mauris feugiat nisi eu dolor tincidunt, id imperdiet mi scelerisque.",
      paragraph2: "Aliquam nec feugiat justo. Nam luctus, sem ut fermentum faucibus, eros ipsum gravida ex, sit amet elementum tellus nisl non nisl. Cras mollis pretium nisl, eget tristique nisl."
    }
  ];
  const currentPost = posts.find(post => post.id === parseInt(id)) || posts[0];
  
  return (
    <section className="bg-white p-t-62 p-b-60">
      <div className="container mx-auto px-4 py-35">
        
        {/* --- Breadcrumbs --- */}
        <div className="flex items-center gap-2 text-sm text-gray5 mb-10">
         
          <Link to="/" className='whitespace-nowrap text-gray5 hover:text-blue1 transition duration-300'>
            Home <FaAngleRight className="inline-block text-[9px] mx-1" />
          </Link>
          <Link to="/Blog" className='whitespace-nowrap text-gray5 hover:text-blue1 transition duration-300'>
            Blog <FaAngleRight className="inline-block text-[9px] mx-1" />
          </Link>
          <span className='text-gray2'>{currentPost.title}</span>
        </div>
        
        <div className="flex flex-wrap">
          {/* --- الجانب الأيسر (المقال) --- */}
          <div className="w-full lg:w-2/3 pr-0 lg:pr-12">
            <div className="p-b-63">
              <div className="relative mb-8">
                <img src={currentPost.image} alt={currentPost.title} className="w-full rounded-sm" />
                <div className="absolute top-4 left-4 bg-[#ffffffe6] py-2 px-2 text-center min-w-15 shadow-sm">
                  <span className="block text-[26px] font-extrabold text-gray6 leading-none">{currentPost.date}</span>
                  <span className="text-xs text-gray4">{currentPost.month}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center font-normal text-[13px] text-gray6 mb-4">
                <span className='text-gray2'>By</span><span className='ml-1'>Admin</span> <span className="mx-2 text-[#ccc]">|</span>
                <span>{currentPost.date} {currentPost.month}</span> <span className="mx-2 text-[#ccc]">|</span>
                <span>Streetstyle, Fashion, Coupie</span> <span className="mx-2 text-[#ccc]">|</span>
                <span>8 Comments</span>
              </div>

              <h4 className="text-3xl font-bold text-gray6 mb-6">
                {currentPost.title}
              </h4>

              <div className="text-gray3 text-[15px] leading-relaxed space-y-6">
                <p>{currentPost.paragraph1}</p>
                <p>{currentPost.paragraph2}</p>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mt-12 mb-16">
                <span className="text-gray5  text-[15px]">Tags</span>
                <div className="flex gap-2">
                  <span className="border border-[#ccc] px-3.5 py-1.5 rounded-full text-xs text-gray3 hover:border-blue1 hover:text-blue1 cursor-pointer transition">Streetstyle</span>
                  <span className="border border-[#ccc] px-3.5 py-1.5 rounded-full text-xs text-gray3 hover:border-blue1 hover:text-blue1 cursor-pointer transition">Crafts</span>
                </div>
              </div>

              {/* Form */}
              <div className="mt-16">
                <h4 className="text-xl font-extrabold text-gray6 mb-2 uppercase">Leave a Comment</h4>
                <p className="text-sm text-gray3 mb-8 font-sans">Your email address will not be published. Required fields are marked *</p>
                <form className="space-y-4">
                  <div className="border border-white2 rounded-sm overflow-hidden">
                    <textarea placeholder="Comment..." className=" text-black w-full p-4 h-32 outline-none  transition"></textarea>
                  </div>
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-4 ">
                    <input type="text" placeholder="Name *" className=" text-black border border-white2 p-3 outline-none transition text-sm w-full md:w-[45%]" />
                    <input type="email" placeholder="Email *" className=" text-black border border-white2 p-3 outline-none transition text-sm w-full md:w-[45%]" />
                    <input type="text" placeholder="Website" className=" text-black border border-white2 p-3 outline-none transition text-sm w-full md:w-[45%]" />
                  </div>
                  <button className="bg-dark1  leading-relaxed cursor-pointer text-white px-10 py-2.5 rounded-full hover:bg-blue1 transition duration-300 uppercase text-[14px] font-medium mt-4">
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/3 mt-12 lg:mt-0">
            <div className="space-y-12">  
              {/* البحث */}
              <div className="relative border border-white2 rounded-full overflow-hidden group transition">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full py-4 px-5 outline-none text-[16px] text-gray6"
                />
                <button className="absolute right-0 top-0 h-full px-4 cursor-pointer bg-white text-gray2 duration-500 hover:text-blue1 transition">
                  <IoSearchSharp size={18} />
                </button>
              </div>

              {/* Categories التصنيفات */}
              <div>
                <h4 className="text-2xl font-bold mb-6 text-gray6">Categories</h4>
                <ul className="space-y-0">
                  {['Fashion', 'Beauty', 'Street Style', 'Life Style', 'DIY & Crafts'].map((cat) => (
                    <li key={cat} className="py-3 border-b border-white2 first:border-t">
                      <Link to="#" className="text-gray3 hover:text-blue1 transition text-[15px]">{cat}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/*  Featured Products المنتجات المميزة */}
              <div>
                <h4 className="text-2xl font-bold mb-6 text-gray6">Featured Products</h4>
                <div className="space-y-6">
                  {[
                    { name: 'White Shirt With Pleat Detail Back', price: '$19.00', img: 'https://themewagon.github.io/cozastore/images/product-min-01.jpg' },
                    { name: 'Converse All Star Hi Black Canvas', price: '$39.00', img: 'https://themewagon.github.io/cozastore/images/product-min-02.jpg' },
                    { name: 'Nixon Porter Leather Watch In Tan', price: '$17.00', img: 'https://themewagon.github.io/cozastore/images/product-min-03.jpg' }
                  ].map((prod, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="relative overflow-hidden w-24 h-28 cursor-pointer">
                        <img src={prod.img} alt={prod.name} className="w-full h-full object-cover shadow-sm transition duration-300" />
                        <div className="absolute inset-0 bg-blue-500/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      </div>
                      <div>
                        <Link to="#" className="mb-2 block text-[15px] text-gray5 hover:text-blue1 transition duration-500">{prod.name}</Link>
                        <span className="text-gray3 text-[15px]">{prod.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* الأرشيف Archive */}
              <div>
                <h4 className="text-2xl font-bold mb-6 text-gray6">Archive</h4>
                <div className="space-y-3">
                  {[
                    { month: 'July 2018', count: 9 },
                    { month: 'June 2018', count: 39 },
                    { month: 'May 2018', count: 29 },
                    { month: 'April 2018', count: 35 },
                    { month: 'March 2018', count: 22 },
                    { month: 'February 2018', count: 32 },
                    { month: 'January 2018', count: 21 },
                    { month: 'December 2017', count: 26 },
                  ].map((item) => (
                    <Link 
                      key={item.month} 
                      to="#" 
                      className="flex justify-between text-[15px] text-gray3 hover:text-blue1 transition duration-300 border-b border-transparent hover:border-blue-200 pb-1"
                    >
                      <span>{item.month}</span> 
                      <span>({item.count})</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/*  Tags الوسوم */}
              <div>
                <h4 className="text-2xl font-bold mb-6 text-gray6">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Fashion', 'Lifestyle', 'Denim', 'Streetstyle', 'Crafts'].map(tag => (
                    <Link 
                      key={tag} 
                      to="#" 
                      className="border border-[#ccc] rounded-full px-4 py-1.5 text-[13px] text-gray3 hover:border-blue1 hover:text-blue1 transition duration-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
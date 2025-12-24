import { Link } from 'react-router-dom';
import { MdArrowRightAlt } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import Title from "../components/Title";
import ScrollTop from '../components/ScrollTop'

const Blog = () => {
  const posts = [
    {
      id: 1,
      date: "22",
      month: "Jan 2018",
      title: "8 Inspiring Ways to Wear Dresses in the Winter",
      image: "https://themewagon.github.io/cozastore/images/blog-04.jpg",
      excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius.",
      author: "Admin",
      tags: "StreetStyle, Fashion, Couple"
    },
    {
      id: 2,
      date: "18",
      month: "Jan 2018",
      title: "The Great Big List of Men's Gifts for the Holidays",
      image: "https://themewagon.github.io/cozastore/images/blog-05.jpg",
      excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius.",
      author: "Admin",
      tags: "StreetStyle, Fashion, Couple"
    },
    {
      id: 3,
      date: "16",
      month: "Jan 2018",
      title: "5 Winter-to-Spring Fashion Trends to Try Now",
      image: "https://themewagon.github.io/cozastore/images/blog-06.jpg",
      excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius.",
      author: "Admin",
      tags: "StreetStyle, Fashion, Couple"
    }
  ];

  return (
    <section className="bg-white md:pt-25">
      <Title link="https://themewagon.github.io/cozastore/images/bg-02.jpg" title="Blog"/>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap">
          {/* --- الجانب الأيسر: قائمة المقالات --- */}
          <div className="w-full lg:w-2/3 pr-0 lg:pr-12">
            <div className="p-r-45 p-r-0-lg">
              {posts.map((post) => (
                <div key={post.id} className="mb-16 group">
                  {/* صورة المقال */}
                  <div className="relative overflow-hidden mb-6 rounded-sm cursor-pointer">
                    <Link to={`/blog-detail/${post.id}`}>
                      <img src={post.image} alt={post.title} className="w-full hover:scale-105 transition duration-700" />
                    </Link>
                    <div className="absolute top-4 left-4 bg-[#ffffffe6] py-3 px-2 text-center min-w-15 shadow-sm">
                      <span className="block text-2xl font-bold text-gray6 leading-none">{post.date}</span>
                      <span className="text-xs text-gray4">{post.month}</span>
                    </div>
                  </div>
                  {/* تفاصيل المقال */}
                  <div className="pt-4">
                    <h4 className="mb-4">
                      <Link to={`/blog-detail/${post.id}`} className="text-2xl font-bold text-gray6 hover:text-blue1 transition duration-300">
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-gray3 text-[15px] leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-xs text-gray6">
                        <span className="text-gray3">By</span> {post.author} | {post.tags} | 8 Comments
                      </span>
                      {/* زر الانتقال لصفحة التفاصيل */}
                      <Link 
                        to={`/blog-detail/${post.id}`} 
                        className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray6 hover:text-blue1 transition duration-500"
                      >
                        Continue Reading <MdArrowRightAlt size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {/* الترقيم (Pagination) */}
              <div className="flex items-center gap-2 mt-8 text-sm">
                <button className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-gray2 bg-gray2 text-white transition duration-300">1</button>
                <button className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-white2 text-[#808080] hover:bg-gray2 hover:text-white hover:border-gray2 transition duration-300">2</button>
              </div>
            </div>
          </div>
          {/* الجانب الأيمن: الشريط الجانبي (Sidebar) */}
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
              {/* التصنيفات */}
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
              {/* Featured Products المنتجات المميزة */}
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

              {/* Archive الأرشيف */}
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

              {/* Tags الوسوم */}
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
      <ScrollTop/>
    </section>
  );
};

export default Blog;
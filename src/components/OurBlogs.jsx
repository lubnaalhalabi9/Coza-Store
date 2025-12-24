const blogs = [
  {
    id: 1,
    title: "8 Inspiring Ways to Wear Dresses in the Winter",
    date: "Jan 22, 2017",
    author: "Nancy Ward",
    image: "https://themewagon.github.io/cozastore/images/blog-01.jpg",
    desc: "Duis ut velit gravida nibh bibendum commodo. Suspendisse pellentesque mattis augue id euismod. Interdum et male-suada fames"
  },
  {
    id: 2,
    title: "The Great Big List of Men's Gifts for the Holidays",
    date: "July 18, 2017",
    author: "Nancy Ward",
    image: "https://themewagon.github.io/cozastore/images/blog-02.jpg",
    desc: "Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame"
  },
  {
    id: 3,
    title: "5 Winter-to-Spring Fashion Trends to Try Now",
    date: "July 2, 2017",
    author: " Nancy Ward",
    image: "https://themewagon.github.io/cozastore/images/blog-03.jpg",
    desc: "Proin nec vehicula lorem, a efficitur ex. Nam vehicula nulla vel erat tincidunt, sed hendrerit ligula porttitor. Fusce sit amet maximus nunc"
  }
];

const OurBlogs = () => {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-10 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-5xl  font-bold text-dark1">
            Our Blogs
          </h2>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-md">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="pt-6">
                <div className="flex text-[0.8rem] text-gray3 mb-2 space-x-4">
                  <span>By <span className="text-dark1">{blog.author}</span></span>
                  <span>On <span className="text-dark1">{blog.date}</span></span>
                </div>

                <h3 className="text-lg font-medium text-gray6 mb-3 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray4 text-sm leading-relaxed mb-4">
                  {blog.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBlogs;

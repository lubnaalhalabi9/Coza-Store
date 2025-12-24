import Title from "../components/Title";
import ScrollTop from '../components/ScrollTop'
const InfoSection = ({ title, text, text2, text3, image, reverse = false, quote }) => {
  return (
    <section
      className={`max-[770px]:mx-8 flex flex-col justify-center items-center md:flex-row md:gap-32 gap-12 py-20 
      ${reverse ? "md:flex-row-reverse" : ""}`} 
    > 
      {/* النص */}
      <div className="flex flex-col flex-[90%] md:flex-[65%]">
        <h2 className="text-xl md:text-2xl mb-5 text-dark1 font-bold">
          {title}
        </h2>
        <div className="text-sm font-light text-gray2">
            <p className="mb-4 leading-6">{text}</p>
            <p className="mb-4 leading-6">{text2}</p>
            <p className="leading-6">{text3}</p>
        </div>

        {quote && (
          <blockquote className="mt-10 pl-6 border-l-3 border-white2 italic text-gray3">
            {quote.text}
            <span className="block mt-4 text-gray4 text-sm">
              - {quote.author}
            </span>
          </blockquote>
        )}
      </div>

      {/* الصورة مع الإطار */}
      <div className="relative h-full md:flex-[30%]">
        {/* الإطار */}
        <div className={`absolute w-full h-full bg-transparent border-3 border-white2 ${reverse ? "top-4 -right-4 md:top-6 md:-right-6" : "top-4 right-4 md:top-6 md:right-6"}`}></div>
        
        {/* الصورة */}
        <div className="relative w-full h-fit overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-110 duration-700"
          />
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <div className="md:pt-25">
      <Title link="https://themewagon.github.io/cozastore/images/bg-01.jpg" alt="about Image" title="About"/>

      <div className="container mx-auto">
        {/* Our Story */}
        <InfoSection
          title="Our Story"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas varius egestas diam, eu sodales metus scelerisque congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas gravida justo eu arcu egestas convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit."
          text2="Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula."
          text3="Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879"
          image="https://themewagon.github.io/cozastore/images/about-01.jpg"
        />

        {/* Our Mission */}
        <InfoSection
          title="Our Mission"
          text="Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio convallis, in pharetra magna gravida. Praesent sed nunc fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac velit egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor, consequat odio in, porttitor ante. Ut mauris ligula, volutpat in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum libero iaculis."
          image="https://themewagon.github.io/cozastore/images/about-02.jpg"
          reverse
          quote={{
            text:
              "Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.",
            author: "Steve Job’s",
          }}
        />
      </div>
      <ScrollTop/>
    </div>
  );
};

export default About;

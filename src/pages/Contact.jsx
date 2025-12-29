import { VscLocation } from "react-icons/vsc";
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import Title from "../components/Title";
import ScrollTop from "../components/ScrollTop";

const Contact = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();

      if (!email || !message) return;

      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        setEmail("");
        setMessage("");
      }, 1000);
    };


  return (
    <div className="md:pt-25">
      <Title 
        link="https://themewagon.github.io/cozastore/images/bg-01.jpg" 
        alt="contact image" 
        title="Contact" 
      />
      
      <div className="container mx-auto bg-white py-16">
        <div className="flex flex-col md:flex-row p-4 md:p-10">
          {/* LEFT SIDE - FORM */}
          <div className="flex flex-col flex-[50%] justify-center items-center gap-6 border border-white2 p-6 md:p-15">
            <h2 className="text-2xl font-normal mb-3">
              Send Us A Message
            </h2>

            <div className="relative w-full">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm w-full border border-white2 rounded-md px-4 py-3 pl-10 focus:outline-none"
              />
              <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
                <img 
                  src="https://themewagon.github.io/cozastore/images/icons/icon-email.png" 
                  alt="email" 
                  className="w-5 h-5"
                />
              </div>
            </div>

            <textarea
              placeholder="How Can We Help?"
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-sm w-full border border-white2 rounded-md px-4 py-3 resize-none focus:outline-none">
            </textarea>

            <button  onClick={handleSubmit}
              disabled={isSubmitting}
              className={`py-3 mt-3 rounded-full w-full transition-all duration-500
                ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-blue1 text-white"
                }`}
            >
              {isSubmitting ? "SENDING..." : "SUBMIT"}
            </button>
            {success && (
              <p className="text-green-600 text-sm mt-4">
                Your message has been sent successfully.
              </p>
            )}

          </div>

          {/* RIGHT SIDE - CONTACT INFO */}
          <div className="flex-[50%] flex flex-col justify-center p-6 md:px-30 gap-8 md:gap-10 border border-white2">
            
            <div className="flex gap-4">
              <div className="text-2xl text-dark1 mt-1">
                <VscLocation />
              </div>
              <div>
                <h3 className="font-light text-lg mb-4">Address</h3>
                <p className="text-sm text-gray4 leading-7">
                  Coza Store Center 8th floor, 379<br />
                  Hudson St, New York, NY 10018 US
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-xl text-dark1 mt-1">
                <LuPhone />
              </div>
              <div>
                <h3 className="font-light text-lg mb-4">Lets Talk</h3>
                <p className="text-blue1">+1 800 1236879</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl text-dark2 mt-1">
                <CiMail />
              </div>
              <div>
                <h3 className="font-light text-lg mb-4">Sale Support</h3>
                <p className="text-blue1">contact@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MAP SECTION */}
        <div className="mt-16">
          <div className="w-full h-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.516698293193!2d-74.00624932364207!3d40.71011613714857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3165da058f%3A0x7588c8c6f5da285!2s379%20Hudson%20St%2C%20New%20York%2C%20NY%2010014%2C%20USA!5e0!3m2!1sen!2s!4v1705072500000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)'  }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Coza Store Location"
            ></iframe>
          </div>
        </div>
        <ScrollTop/>
    </div>
  );
};

export default Contact;
import { CONTACT } from "../constants";
import { useState, useRef, useEffect } from "react";
import { FaClock } from "react-icons/fa6";
import { SOCIAL_MEDIA_LINKS } from "../constants";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";

const Contact = () => {
  const [hoursShown, setHoursShown] = useState(false);
  const wrapperRef = useRef(null);
  const toggleHours = () => {
    setHoursShown(prev => !prev);
  };
  // Hide when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setHoursShown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section
      className="container mx-auto flex flex-col  gap-8 px-4 py-16 items-center text-center"
      id="contact"
    >
      <div className="flex flex-col items-center">
        <motion.img
          src={logo}
          alt="restaura"
          className="block m-0 p-0 lg:w-120 w-60"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        />
      </div>
      <div>
        <h2 className="mb-8 text-center text-3xl lg:text-4xl">Contact Us</h2>
        <div className="text-neutral-400">
          {CONTACT.map((item, index) => {
            if (item.key !== "hours") {
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 text-base text-white mb-4 lg:ml-15"
                >
                  <span className="text-xl text-yellow-400">
                    {item.icon}
                  </span>
                  {item.key === "email"
                    ? <a
                        href={`mailto:${item.value}`}
                        className="underline hover:text-yellow-300"
                      >
                        {item.value}
                      </a>
                    : item.key === "phone"
                      ? <a
                          href={`tel:${item.value}`}
                          className="hover:text-yellow-300"
                        >
                          {item.value}
                        </a>
                      : <p className="m-0">
                          {item.value}
                        </p>}
                </div>
              );
            }

            // Hours section
            return (
              <div key={index} ref={wrapperRef}>
                <button
                  onClick={toggleHours}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#6b705c] px-6 py-2 text-white hover:bg-[#a5a58d]"
                >
                  <FaClock />
                  {hoursShown ? "Hide Opening Hours" : "Show Opening Hours"}
                </button>
                {hoursShown &&
                  <div className="mt-4 text-md text-[#81b29a] space-y-1">
                    {item.value.map((line, idx) =>
                      <p key={idx}>
                        {line}
                      </p>
                    )}
                  </div>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-8">
        {SOCIAL_MEDIA_LINKS.map((link, index) =>
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </a>
        )}
      </div>
    </section>
  );
};

export default Contact;

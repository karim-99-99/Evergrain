import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { en } from "../translations/en";
import { ar } from "../translations/ar";

const Contact = () => {
  const { language } = useLanguage();
  const t = language === "ar" ? ar : en;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const CONTACT_EMAIL = "kareemkhamis2030@gmail.com";
  const PHONE_NUMBER = "+201036064417";
  const WHATSAPP_NUMBER = "201036064417"; // no + for wa.me link

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      formData.subject || "Message from Evergrain"
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    alert(t.contact.thankYou);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />

      {/* Contact Header */}
      <section
        className="pt-24 pb-12 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/photo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#F5F0E8]/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1
            className="text-5xl md:text-6xl font-bold text-[#332B2B] mb-4"
            style={{
              textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)",
            }}
          >
            {t.contact.title}
          </h1>
          <p
            className="text-lg text-[#5C4A37] max-w-2xl"
            style={{
              textShadow: "1px 1px 2px rgba(255, 255, 255, 0.6)",
            }}
          >
            {t.contact.description}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-[#332B2B] mb-6">
                {t.contact.sendMessage}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#332B2B] mb-2"
                  >
                    {t.contact.name} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#332B2B] mb-2"
                  >
                    {t.contact.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[#332B2B] mb-2"
                  >
                    {t.contact.subject} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                    placeholder={t.contact.subjectPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#332B2B] mb-2"
                  >
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B] resize-none"
                    placeholder={t.contact.messagePlaceholder}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors duration-300"
                >
                  {t.contact.send}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-[#332B2B] mb-6">
                  {t.contact.getInTouch}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#5C4A37] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#332B2B] mb-1">
                        {t.contact.phone}
                      </h3>
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="text-[#5C4A37] hover:text-[#332B2B]"
                      >
                        {PHONE_NUMBER}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#5C4A37] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#332B2B] mb-1">
                        {t.contact.address}
                      </h3>
                      <p className="text-[#5C4A37]">Cairo, Egypt</p>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 hover:opacity-90 transition-opacity"
                  >
                    <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#332B2B] mb-1">
                        {t.contact.whatsApp}
                      </h3>
                      <span className="text-[#5C4A37]">{PHONE_NUMBER}</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-[#332B2B] mb-4">
                  {t.contact.businessHours}
                </h3>
                <p className="text-[#5C4A37]">{t.contact.allWeek24Hours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

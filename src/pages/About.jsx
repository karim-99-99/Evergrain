import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from '../utils/Router';
import { useLanguage } from '../context/LanguageContext';
import { en } from '../translations/en';
import { ar } from '../translations/ar';
// Import images
import photo1 from '../assets/photo1.png';
import photo2 from '../assets/photo2.jpg';
import photo3 from '../assets/photo3.jpg';

const About = () => {
  const { language } = useLanguage();
  const t = language === 'ar' ? ar : en;
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />
      
      {/* About Header */}
      <section className="pt-24 pb-12 relative overflow-hidden" style={{
        backgroundImage: 'url("/photo.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#F5F0E8]/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-[#332B2B] mb-4" style={{
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)'
          }}>
            {t.about.title}
          </h1>
          <p className="text-lg text-[#5C4A37] max-w-2xl" style={{
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)'
          }}>
            {t.about.description}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img 
                src={photo1} 
                alt="Our Craftsmanship" 
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#332B2B]">
                {t.about.ourStory}
              </h2>
              <p className="text-lg text-[#5C4A37] leading-relaxed">
                {t.about.storyText1}
              </p>
              <p className="text-lg text-[#5C4A37] leading-relaxed">
                {t.about.storyText2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#332B2B] mb-6">
              {t.about.ourMission}
            </h2>
            <p className="text-xl text-[#5C4A37] leading-relaxed mb-8">
              {t.about.missionText}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5C4A37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#332B2B] mb-2">{t.about.qualityFirst}</h3>
                <p className="text-[#5C4A37]">{t.about.qualityText}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5C4A37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#332B2B] mb-2">{t.about.handcrafted}</h3>
                <p className="text-[#5C4A37]">{t.about.handcraftedText}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5C4A37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#332B2B] mb-2">{t.about.sustainable}</h3>
                <p className="text-[#5C4A37]">{t.about.sustainableText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Craftsmanship */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#332B2B]">
                {t.about.ourCraftsmanship}
              </h2>
              <p className="text-lg text-[#5C4A37] leading-relaxed">
                {t.about.craftsmanshipText}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#5C4A37] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-[#5C4A37]">{t.home.solidWalnut}</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#5C4A37] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-[#5C4A37]">{t.home.endGrain}</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#5C4A37] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-[#5C4A37]">{t.home.handFinished}</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#5C4A37] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-[#5C4A37]">{t.home.madeToLast}</p>
                </div>
              </div>
              <Link to="/shop">
                <button className="bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors duration-300">
                  {t.about.exploreCollection}
                </button>
              </Link>
            </div>
            <div>
              <img 
                src={photo2} 
                alt="Craftsmanship" 
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#332B2B] mb-4">
              {t.about.whyChoose}
            </h2>
            <p className="text-xl text-[#5C4A37] max-w-3xl mx-auto">
              {t.about.whyChooseText}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#5C4A37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#332B2B] mb-2">{t.about.premiumMaterials}</h3>
              <p className="text-[#5C4A37]">{t.about.premiumText}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#5C4A37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#332B2B] mb-2">{t.about.expertCraft}</h3>
              <p className="text-[#5C4A37]">{t.about.expertText}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#5C4A37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#332B2B] mb-2">{t.about.lifetimeQuality}</h3>
              <p className="text-[#5C4A37]">{t.about.lifetimeText}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#5C4A37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#332B2B] mb-2">{t.about.ecoFriendly}</h3>
              <p className="text-[#5C4A37]">{t.about.ecoText}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;


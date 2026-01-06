const Footer = () => {
  return (
    <footer className="relative overflow-hidden" style={{
      backgroundColor: '#1a1410',
      backgroundImage: `
        repeating-linear-gradient(0deg, rgba(30, 22, 16, 0.4) 0px, transparent 1px, transparent 3px, rgba(30, 22, 16, 0.4) 4px),
        repeating-linear-gradient(90deg, rgba(20, 15, 10, 0.6) 0px, transparent 1px, transparent 2px, rgba(20, 15, 10, 0.6) 3px),
        radial-gradient(ellipse at 25% 35%, rgba(61, 47, 31, 0.08) 0%, transparent 70%),
        radial-gradient(ellipse at 75% 65%, rgba(42, 31, 21, 0.08) 0%, transparent 70%),
        linear-gradient(135deg, #1a1410 0%, #15100b 20%, #1a1410 40%, #15100b 60%, #1a1410 80%, #15100b 100%)
      `,
      backgroundSize: '100% 100%, 100% 100%, 50% 50%, 50% 50%, 100% 100%',
      boxShadow: 'inset 0 0 200px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Centered Logo Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 mb-16">
          {/* Logo Image */}
          <div className="flex flex-col items-center gap-6">
            <img 
              src="/logo.png" 
              alt="Evergrain Logo" 
              className="h-20 w-auto object-contain"
              style={{ 
                filter: 'brightness(0) invert(1)',
                mixBlendMode: 'normal'
              }}
            />
            <span className="text-4xl md:text-5xl font-serif text-white tracking-wide" style={{
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)',
              letterSpacing: '0.05em'
            }}>
              EVERGRAIN
            </span>
          </div>
        </div>

        {/* Links Section - Centered and Minimalist
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 text-white/80">
          <a href="#shop" className="hover:text-white transition-colors duration-300 font-light tracking-wide text-sm uppercase">
            Shop
          </a>
          <a href="#about" className="hover:text-white transition-colors duration-300 font-light tracking-wide text-sm uppercase">
            About
          </a>
          <a href="#contact" className="hover:text-white transition-colors duration-300 font-light tracking-wide text-sm uppercase">
            Contact
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300 font-light tracking-wide text-sm uppercase">
            Gallery
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300 font-light tracking-wide text-sm uppercase">
            Process
          </a>
        </div> */}

        {/* Email Section - Centered */}
        <div className="max-w-md mx-auto mb-12">
          <p className="text-white/70 text-center mb-4 text-sm font-light tracking-wide">
            Kitchen2025@gmail.com
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors text-sm font-light"
            />
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-light text-sm uppercase tracking-wide transition-all duration-300 border border-white/10">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Icons - Centered */}
        <div className="flex justify-center gap-4 mb-12">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50 font-light tracking-wide">
            Copyright By EVERGRAIN - 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




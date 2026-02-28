const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-green-900 text-white px-4 md:px-8 py-10 text-center text-sm mt-16">
        <p>© 2026 Brahmyayurved | Online Orders Only</p>

        <p className="mt-2 break-words">
          Email: brahmyayurved@gmail.com
          <br className="sm:hidden" />
          Phone: +91 7219248924
        </p>
      </footer>

      <a
        href="https://wa.me/917219248924"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 bg-green-600 text-white px-4 py-3 md:px-5 md:py-3 rounded-full shadow-lg text-sm md:text-base hover:bg-green-700 transition"
      >
        WhatsApp
      </a>
    </>
  );
};

export default Footer;
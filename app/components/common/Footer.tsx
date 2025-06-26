const Footer = () => (
  <footer className="w-full  text-amber-800 py-6 text-center mt-auto">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
      <span className="text-sm">
        &copy; {new Date().getFullYear()} Skyne. All rights reserved.
      </span>
      <span className="text-xs text-gray-400">
        Made with <span className="text-amber-500">♥</span> by Skyne Team
        <p>Our Email: team@skyne.ng</p>
      </span>
    </div>
  </footer>
);

export default Footer;

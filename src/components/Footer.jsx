import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'fab fa-facebook-f' },
    { name: 'Twitter', href: '#', icon: 'fab fa-twitter' },
    { name: 'Instagram', href: '#', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', href: '#', icon: 'fab fa-linkedin-in' },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Spectra Community</h3>
            <p className="text-gray-400 text-sm">
              Connecting students, clubs, and opportunities to build a vibrant college community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white">Events</Link></li>
              <li><Link to="/blogs" className="text-gray-400 hover:text-white">Blogs</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/vision-mission" className="text-gray-400 hover:text-white">Vision & Mission</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <a key={link.name} href={link.href} className="text-gray-400 hover:text-white">
                  <span className="sr-only">{link.name}</span>
                  <i className={`${link.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Spectra Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
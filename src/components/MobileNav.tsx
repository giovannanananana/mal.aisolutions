import { useState } from 'react';
import { Home, Briefcase, Users, Star, Mail } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '#' },
  { icon: Briefcase, label: 'Services', href: '#services' },
  { icon: Users, label: 'About', href: '#about' },
  { icon: Star, label: 'Reviews', href: '#reviews' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

const MobileNav = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleClick = (label: string, href: string) => {
    setActiveItem(label);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass-nav mx-4 mb-4 rounded-2xl px-2 py-3">
        <div className="flex items-center justify-around">
          {navItems.map(({ icon: Icon, label, href }) => (
            <button
              key={label}
              onClick={() => handleClick(label, href)}
              className={`mobile-nav-item ${activeItem === label ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="text-[10px]">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;

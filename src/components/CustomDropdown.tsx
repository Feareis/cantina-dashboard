import React, { useState, useEffect, useRef } from 'react';
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface CustomDropdownProps {
  options: string[];
  className?: string;
  onSelect: (selected: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  className,
  onSelect,
  placeholder = 'Select an option',
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className || ''}`}>
      {/* Dropdown button */}
      <div>
        <button
          onClick={toggleDropdown}
          className={`flex items-center justify-between w-full font-medium py-2 rounded transform transition duration-250 hover:scale-105 bg-gray-800 text-white ${className}`}
        >
          {Icon && <Icon className="mr-2 ml-2" />} {/* Décalage ajouté ici avec ml-2 */}
          <span>{selectedItem || placeholder}</span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 ml-4 text-gray-400 transition-transform duration-250" />
          ) : (
            <ChevronDown className="h-5 w-5 ml-4 text-gray-400 transition-transform duration-250" />
          )}
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-lg bg-gray-800 shadow-lg">
          <ul className="py-1 text-sm text-white">
            {options.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleSelect(item)}
                  className="block w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

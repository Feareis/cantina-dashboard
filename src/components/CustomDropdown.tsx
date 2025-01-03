// Importing necessary modules
import React, { useState, useEffect, useRef } from 'react';
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';

// Define props interface for the dropdown
interface CustomDropdownProps {
  options: string[];                    // List of options to display
  className?: string;                   // Additional class names for custom styling
  onSelect: (selected: string) => void; // Callback function when an option is selected
  placeholder?: string;                 // Placeholder text for the dropdown
  icon?: LucideIcon;                    // Optional icon component
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  className,
  onSelect,
  placeholder = 'Select an option',
  icon: Icon,
}) => {
  // State to manage the dropdown's visibility
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Ref to handle clicks outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle the dropdown's open/closed state
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle option selection
  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  // Close the dropdown if a click occurs outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Attach and detach event listeners for outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left rounded ${className || ''}`}
      style={{ zIndex: 50 }}
    >
      {/* Dropdown button */}
      <div>
        <button
          onClick={toggleDropdown}
          className={`
            flex items-center justify-between w-full font-medium py-2 rounded
            transform transition duration-250 hover:scale-105 bg-gray-800 text-white ${className}`}
        >
          {Icon && <Icon className="mr-2 ml-2" />} {/* Icon with spacing */}
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
        <div
          className="absolute items-center w-full top-full mt-2 w-48 bg-gray-900 shadow-lg rounded-lg"
          style={{
            zIndex: 50, // Ensure dropdown appears above other elements
            backgroundColor: 'rgba(33, 33, 33, 1)', // Opaque background
          }}
        >
          <ul className="py-1 text-sm text-white">
            {options.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleSelect(item)}
                  className="block w-full text-center px-4 py-2 hover:bg-indigo-500 hover:text-white"
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

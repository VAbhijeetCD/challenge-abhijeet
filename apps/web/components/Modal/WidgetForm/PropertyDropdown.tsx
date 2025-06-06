import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Property {
  id: string;
  name: string;
  image: string;
}

interface PropertyDropdownProps {
  value: string;
  onChange: (propertyId: string) => void;
  properties: Property[];
  disabled?: boolean;
  placeholder?: string;
}

const PropertyDropdown = ({ 
  value, 
  onChange, 
  properties, 
  disabled = false, 
  placeholder = "Select a property" 
}: PropertyDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedProperty = properties.find(p => p.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (propertyId: string) => {
    onChange(propertyId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'
        } ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
      >
        <div className="flex items-center flex-1 min-w-0">
          {selectedProperty ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-base">Property</span>
              <div className="relative w-8 h-8 overflow-hidden rounded-full">
                <Image
                  src={selectedProperty.image}
                  alt={selectedProperty.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="text-gray-900 font-medium text-base">
                {selectedProperty.name}
              </span>
            </div>
          ) : (
            <span className="text-gray-500 text-base">{placeholder}</span>
          )}
        </div>
        
        <div className="ml-2 flex-shrink-0">
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="">
            {properties.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                No properties available
              </div>
            ) : (
              properties.map((property) => (
                <button
                  key={property.id}
                  type="button"
                  onClick={() => handleSelect(property.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    value === property.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="relative w-6 h-6 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      value === property.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {property.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Property ID: {property.id}
                    </p>
                  </div>
                  {value === property.id && (
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDropdown;
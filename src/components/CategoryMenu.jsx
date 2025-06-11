import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const CategoryMenu = ({ title, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const genderPath = title.toLowerCase();

  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-1 text-[#737373] hover:text-[#252B42] py-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span>{title}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/${genderPath}/${category.name.toLowerCase()}/${category.id}`}
              className="block px-4 py-2 text-[#737373] hover:bg-gray-100 hover:text-[#252B42]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryMenu; 
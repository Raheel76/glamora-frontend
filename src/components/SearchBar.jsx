import React from 'react';
import { Input, Select } from 'antd';
import { Search, SlidersHorizontal } from 'lucide-react';
import { handFeel } from '../data/shirts';

const { Option } = Select;

const SearchBar = ({ searchQuery, setSearchQuery, feelType, setFeelType }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input */}
        <div className="flex-grow">
          <Input
            placeholder="Search for shirts..."
            prefix={<Search size={18} className="text-gray-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 text-base"
            allowClear
          />
        </div>
        
        {/* Category filter */}
        <div className="w-full md:w-48">
          <Select
            value={feelType}
            onChange={setFeelType}
            className="w-full h-10"
            placeholder="Category"
            suffixIcon={<SlidersHorizontal size={16} className="text-gray-500" />}
          >
            {handFeel.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
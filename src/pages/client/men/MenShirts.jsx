import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { ChevronRight, Home, Tag } from 'lucide-react';
import { shirts } from '../../../data/shirts';
import { SearchBar, ShirtGrid, SortOptions } from '../../../components';

const { Content } = Layout;

const MenShirts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [feelType, setFeelType] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [filteredShirts, setFilteredShirts] = useState(shirts);

  useEffect(() => {
    // Filter shirts based on search query and handFeel
    let filtered = [...shirts];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(shirt => 
        shirt.title.toLowerCase().includes(query) || 
        shirt.description.toLowerCase().includes(query)
      );
    }
    
    if (feelType && feelType !== 'All') {
     filtered = filtered.filter(shirt => shirt.handFeel === feelType);
    }
    
    // Sort shirts based on selected option
    switch (sortOption) {
      case 'newest':
        filtered = filtered.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => (a.onSale ? a.salePrice : a.price) - (b.onSale ? b.salePrice : b.price));
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => (b.onSale ? b.salePrice : b.price) - (a.onSale ? a.salePrice : a.price));
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no specific sorting
        break;
    }
    
    setFilteredShirts(filtered);
  }, [searchQuery, feelType, sortOption]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Content className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          className="mb-6"
          separator={<ChevronRight size={14} className="text-gray-400" />}
          items={[
            {
              title: (
                <div className="flex items-center">
                  <Home size={14} className="mr-1" />
                  <span>Home</span>
                </div>
              ),
              href: '/'
            },
            {
              title: 'Men',
              href: '/men'
            },
            {
              title: (
                <div className="flex items-center">
                  <Tag size={14} className="mr-1" />
                  <span>Shirts</span>
                </div>
              )
            }
          ]}
        />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Men's Shirts</h1>
          <p className="text-gray-600 mt-2">
            Find the perfect shirt for any occasion, from casual to formal.
          </p>
        </div>
        
        {/* Search & Filter */}
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          feelType={feelType}
          setFeelType={setFeelType}
        />
        
        {/* Sort Options */}
        <SortOptions 
          sortOption={sortOption} 
          setSortOption={setSortOption}
          totalShirts={filteredShirts.length}
        />
        
        {/* Product Grid */}
        {filteredShirts.length > 0 ? (
          <ShirtGrid shirts={filteredShirts} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No shirts found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </Content>
    </div>
  );
};

export default MenShirts;





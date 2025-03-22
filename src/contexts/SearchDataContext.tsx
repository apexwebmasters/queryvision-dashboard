
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SearchConsoleData } from '@/utils/excelParser';

interface SearchDataContextType {
  searchData: SearchConsoleData[];
  setSearchData: (data: SearchConsoleData[]) => void;
  isDataLoaded: boolean;
  getDataByType: (type: 'query' | 'page' | 'country' | 'device' | 'search_appearance' | 'date') => SearchConsoleData[];
}

const SearchDataContext = createContext<SearchDataContextType | undefined>(undefined);

export const SearchDataProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<SearchConsoleData[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const updateSearchData = (data: SearchConsoleData[]) => {
    setSearchData(data);
    setIsDataLoaded(true);
    // Store in localStorage for persistence
    localStorage.setItem('searchConsoleData', JSON.stringify(data));
    console.log('Data saved to context and localStorage:', data.length, 'items');
  };

  const getDataByType = (type: 'query' | 'page' | 'country' | 'device' | 'search_appearance' | 'date') => {
    return searchData.filter(item => item.dataType === type);
  };

  // Load data from localStorage on first render
  React.useEffect(() => {
    const storedData = localStorage.getItem('searchConsoleData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setSearchData(parsedData);
          setIsDataLoaded(true);
          console.log('Loaded data from localStorage:', parsedData.length, 'items');
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
  }, []);

  return (
    <SearchDataContext.Provider value={{ 
      searchData, 
      setSearchData: updateSearchData, 
      isDataLoaded, 
      getDataByType 
    }}>
      {children}
    </SearchDataContext.Provider>
  );
};

export const useSearchData = () => {
  const context = useContext(SearchDataContext);
  if (context === undefined) {
    throw new Error('useSearchData must be used within a SearchDataProvider');
  }
  return context;
};


import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SearchConsoleData } from '@/utils/excelParser';
import { toast } from 'sonner';

interface SearchDataContextType {
  searchData: SearchConsoleData[];
  setSearchData: (data: SearchConsoleData[]) => void;
  isDataLoaded: boolean;
  getDataByType: (type: 'query' | 'page' | 'country' | 'device' | 'search_appearance' | 'date') => SearchConsoleData[];
  clearData: () => void;
}

const SearchDataContext = createContext<SearchDataContextType | undefined>(undefined);

export const SearchDataProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<SearchConsoleData[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const updateSearchData = (data: SearchConsoleData[]) => {
    if (data.length === 0) {
      toast.error('No data to save');
      return;
    }
    
    setSearchData(data);
    setIsDataLoaded(true);
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem('searchConsoleData', JSON.stringify(data));
      console.log('Data saved to context and localStorage:', data.length, 'items');
      toast.success(`Saved ${data.length} data points`);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      toast.error('Failed to save data to localStorage');
    }
  };

  const clearData = () => {
    setSearchData([]);
    setIsDataLoaded(false);
    localStorage.removeItem('searchConsoleData');
    toast.success('Data cleared');
  };

  const getDataByType = (type: 'query' | 'page' | 'country' | 'device' | 'search_appearance' | 'date') => {
    return searchData.filter(item => item.dataType === type);
  };

  // Load data from localStorage on first render
  useEffect(() => {
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
      getDataByType,
      clearData 
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

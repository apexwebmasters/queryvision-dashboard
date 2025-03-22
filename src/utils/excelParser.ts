
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

export interface SearchConsoleData {
  date?: string;
  query?: string;
  page?: string;
  country?: string;
  device?: string;
  searchAppearance?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  dataType: 'query' | 'page' | 'country' | 'device' | 'search_appearance' | 'date';
}

interface SheetMapping {
  name: string;
  keyField: string;
  dataType: 'query' | 'page' | 'country' | 'device' | 'search_appearance' | 'date';
}

export const parseExcelFile = async (file: File): Promise<SearchConsoleData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        // Define sheet mappings for Google Search Console exports
        const sheetMappings: SheetMapping[] = [
          { name: 'Queries', keyField: 'Query', dataType: 'query' },
          { name: 'Pages', keyField: 'Top pages', dataType: 'page' },
          { name: 'Countries', keyField: 'Country', dataType: 'country' },
          { name: 'Devices', keyField: 'Device', dataType: 'device' },
          { name: 'Search appearance', keyField: 'Search Appearance', dataType: 'search_appearance' },
          { name: 'Dates', keyField: 'Date', dataType: 'date' },
        ];
        
        // Collect data from all sheets
        let allData: SearchConsoleData[] = [];
        
        for (const mapping of sheetMappings) {
          // Try variations of sheet names (GSC can have slight variations)
          const possibleNames = [
            mapping.name,
            mapping.name.toLowerCase(),
            mapping.name.toUpperCase(),
            mapping.name.replace(' ', '_'),
            mapping.name.replace(' ', '-'),
          ];
          
          let foundSheet = null;
          for (const name of possibleNames) {
            if (workbook.SheetNames.includes(name)) {
              foundSheet = name;
              break;
            }
          }
          
          if (!foundSheet) continue;
          
          const worksheet = workbook.Sheets[foundSheet];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(`Sheet ${foundSheet} data:`, jsonData);
          
          if (jsonData.length === 0) continue;
          
          // Map the data based on the sheet type
          const mappedData: SearchConsoleData[] = jsonData.map((row: any) => {
            const baseData: SearchConsoleData = {
              clicks: Number(row.Clicks || row.clicks || 0),
              impressions: Number(row.Impressions || row.impressions || 0),
              ctr: parseFloat(String(row.CTR || row.ctr || '0%').replace('%', '')) / 100,
              position: Number(row.Position || row.position || 0),
              dataType: mapping.dataType,
            };
            
            // Add specific field based on sheet type
            if (mapping.dataType === 'query') {
              baseData.query = row.Query || row.query || '';
            } else if (mapping.dataType === 'page') {
              baseData.page = row['Top pages'] || row.Page || row.page || row.URL || row.url || '';
            } else if (mapping.dataType === 'country') {
              baseData.country = row.Country || row.country || '';
            } else if (mapping.dataType === 'device') {
              baseData.device = row.Device || row.device || '';
            } else if (mapping.dataType === 'search_appearance') {
              baseData.searchAppearance = row['Search Appearance'] || row.searchAppearance || '';
            } else if (mapping.dataType === 'date') {
              baseData.date = row.Date || row.date || '';
            }
            
            return baseData;
          });
          
          allData = [...allData, ...mappedData];
        }

        console.log('Parsed Excel data from all sheets:', allData);
        
        if (allData.length === 0) {
          toast.error('No valid data found in the Excel file. Please check if this is a Google Search Console export.');
          reject(new Error('No valid data found'));
        } else {
          toast.success(`Successfully parsed ${allData.length} rows of data from ${workbook.SheetNames.length} sheets`);
          resolve(allData);
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        toast.error('Failed to parse Excel file. Please check the file format.');
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      toast.error('Error reading file');
      reject(error);
    };
    
    reader.readAsBinaryString(file);
  });
};

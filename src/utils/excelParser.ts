
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

export const parseExcelFile = async (file: File): Promise<SearchConsoleData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        
        console.log("Available sheets:", workbook.SheetNames);
        
        // Define mappings for each sheet type
        const sheetMappings = [
          { 
            name: "Queries", 
            keyField: "Query",
            dataType: 'query' as const,
            possibleNames: ["Queries", "queries", "QUERIES", "Query", "query"]
          },
          { 
            name: "Pages", 
            keyField: "Top pages",
            dataType: 'page' as const,
            possibleNames: ["Pages", "pages", "PAGES", "Page", "page", "Top pages", "URLs", "urls"]
          },
          { 
            name: "Countries", 
            keyField: "Country",
            dataType: 'country' as const,
            possibleNames: ["Countries", "countries", "COUNTRIES", "Country", "country"]
          },
          { 
            name: "Devices", 
            keyField: "Device",
            dataType: 'device' as const,
            possibleNames: ["Devices", "devices", "DEVICES", "Device", "device"]
          },
          { 
            name: "Search appearance", 
            keyField: "Search Appearance",
            dataType: 'search_appearance' as const,
            possibleNames: ["Search appearance", "search appearance", "SEARCH APPEARANCE", "Search Appearance"]
          },
          { 
            name: "Dates", 
            keyField: "Date",
            dataType: 'date' as const,
            possibleNames: ["Dates", "dates", "DATES", "Date", "date"]
          }
        ];
        
        let allData: SearchConsoleData[] = [];
        
        // Process each sheet in the workbook
        for (const sheetMapping of sheetMappings) {
          // Find the sheet by trying all possible names
          let sheetName = null;
          for (const possibleName of sheetMapping.possibleNames) {
            if (workbook.SheetNames.includes(possibleName)) {
              sheetName = possibleName;
              break;
            }
          }
          
          if (!sheetName) {
            console.log(`Sheet not found for mapping: ${sheetMapping.name}`);
            continue;
          }
          
          const worksheet = workbook.Sheets[sheetName];
          console.log(`Processing sheet: ${sheetName}`);
          
          // Convert sheet to JSON with header row
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
          
          if (jsonData.length === 0) {
            console.log(`No data found in sheet: ${sheetName}`);
            continue;
          }
          
          console.log(`First row of data in ${sheetName}:`, jsonData[0]);
          
          // Process data based on sheet type
          const processedData = jsonData.map((row: any) => {
            // Basic data structure for all types
            const baseData: SearchConsoleData = {
              clicks: parseFloat(row.Clicks || row.clicks || '0'),
              impressions: parseFloat(row.Impressions || row.impressions || '0'),
              ctr: parseFloat(String(row.CTR || row.ctr || '0%').replace('%', '')) / 100,
              position: parseFloat(row.Position || row.position || '0'),
              dataType: sheetMapping.dataType
            };
            
            // Add type-specific field
            switch (sheetMapping.dataType) {
              case 'query':
                baseData.query = row.Query || row.query || '';
                break;
              case 'page':
                baseData.page = row['Top pages'] || row['Page'] || row['page'] || row['URL'] || row['url'] || '';
                break;
              case 'country':
                baseData.country = row.Country || row.country || '';
                break;
              case 'device':
                baseData.device = row.Device || row.device || '';
                break;
              case 'search_appearance':
                baseData.searchAppearance = row['Search Appearance'] || row['Search appearance'] || '';
                break;
              case 'date':
                baseData.date = row.Date || row.date || '';
                break;
            }
            
            return baseData;
          });
          
          allData = [...allData, ...processedData];
        }
        
        console.log(`Total processed data items: ${allData.length}`);
        
        if (allData.length === 0) {
          toast.error('No valid data found in the Excel file');
          reject(new Error('No valid data found'));
        } else {
          toast.success(`Successfully processed ${allData.length} rows of data`);
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
    
    // Use ArrayBuffer instead of BinaryString for more reliable parsing
    reader.readAsArrayBuffer(file);
  });
};

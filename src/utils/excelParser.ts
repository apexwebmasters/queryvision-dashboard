
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

export interface SearchConsoleData {
  date?: string;
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export const parseExcelFile = async (file: File): Promise<SearchConsoleData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Map Google Search Console data to our interface
        const mappedData: SearchConsoleData[] = jsonData
          .filter((row: any) => row.Query && row.Page) // Ensure required fields exist
          .map((row: any) => {
            // Handle different possible column names from GSC
            return {
              query: row.Query || row.query || '',
              page: row.Page || row.page || row.URL || row.url || '',
              clicks: Number(row.Clicks || row.clicks || 0),
              impressions: Number(row.Impressions || row.impressions || 0),
              ctr: Number(parseFloat(String(row.CTR || row.ctr || '0').replace('%', '')) || 0),
              position: Number(row.Position || row.position || 0),
              date: row.Date || row.date || new Date().toISOString().split('T')[0]
            };
          });

        console.log('Parsed Excel data:', mappedData);
        
        if (mappedData.length === 0) {
          toast.error('No valid data found in the Excel file');
          reject(new Error('No valid data found'));
        } else {
          toast.success(`Successfully parsed ${mappedData.length} rows of data`);
          resolve(mappedData);
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        toast.error('Failed to parse Excel file');
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

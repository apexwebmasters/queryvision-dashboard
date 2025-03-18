
// Generate mock data for development/testing
export const generateOverviewData = () => {
  const data = [];
  const startDate = new Date(2023, 0, 1);
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      clicks: Math.floor(Math.random() * 500) + 100,
      impressions: Math.floor(Math.random() * 10000) + 1000,
      ctr: (Math.random() * 5 + 1).toFixed(2),
      position: (Math.random() * 20 + 1).toFixed(1),
    });
  }
  
  return data;
};

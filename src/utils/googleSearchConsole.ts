
import { toast } from "sonner";

// Google OAuth configuration
// Replace with your Google Client ID from Google Cloud Console
// See the GoogleClientInstructions component for setup details
export const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

export interface SearchConsoleProperty {
  siteUrl: string;
  permissionLevel: string;
}

export interface SearchConsoleReport {
  date: string;
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

// Initialize Google API client
export const initGoogleApi = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !(window as any).gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        (window as any).gapi.load("client:auth2", () => {
          (window as any).gapi.client
            .init({
              clientId: GOOGLE_CLIENT_ID,
              scope: "https://www.googleapis.com/auth/webmasters.readonly",
              discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/webmasters/v3/rest",
              ],
            })
            .then(() => {
              resolve(true);
            })
            .catch((error: any) => {
              console.error("Google API initialization error", error);
              toast.error("Failed to initialize Google API");
              resolve(false);
            });
        });
      };
      document.body.appendChild(script);
    } else {
      resolve(true);
    }
  });
};

// Check if user is authenticated with Google
export const isGoogleAuthenticated = (): boolean => {
  if (
    typeof window === "undefined" ||
    !(window as any).gapi ||
    !(window as any).gapi.auth2
  ) {
    return false;
  }
  const authInstance = (window as any).gapi.auth2.getAuthInstance();
  return authInstance && authInstance.isSignedIn.get();
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<boolean> => {
  if (
    typeof window === "undefined" ||
    !(window as any).gapi ||
    !(window as any).gapi.auth2
  ) {
    await initGoogleApi();
  }
  
  try {
    const authInstance = (window as any).gapi.auth2.getAuthInstance();
    await authInstance.signIn();
    return authInstance.isSignedIn.get();
  } catch (error) {
    console.error("Google sign in error", error);
    toast.error("Google sign in failed");
    return false;
  }
};

// Sign out from Google
export const signOutFromGoogle = async (): Promise<void> => {
  if (
    typeof window === "undefined" ||
    !(window as any).gapi ||
    !(window as any).gapi.auth2
  ) {
    return;
  }
  
  try {
    const authInstance = (window as any).gapi.auth2.getAuthInstance();
    await authInstance.signOut();
    toast.success("Signed out from Google");
  } catch (error) {
    console.error("Google sign out error", error);
    toast.error("Google sign out failed");
  }
};

// Get list of Search Console properties
export const getSearchConsoleProperties = async (): Promise<SearchConsoleProperty[]> => {
  if (!isGoogleAuthenticated()) {
    throw new Error("User not authenticated with Google");
  }
  
  try {
    const response = await (window as any).gapi.client.webmasters.sites.list();
    return response.result.siteEntry || [];
  } catch (error) {
    console.error("Failed to fetch Search Console properties", error);
    toast.error("Failed to fetch your Search Console properties");
    return [];
  }
};

// Fetch report data from Search Console API
export const fetchSearchConsoleReport = async (
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<SearchConsoleReport[]> => {
  if (!isGoogleAuthenticated()) {
    throw new Error("User not authenticated with Google");
  }
  
  try {
    const response = await (window as any).gapi.client.webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query", "page"],
        rowLimit: 1000,
      },
    });
    
    return (response.result.rows || []).map((row: any) => ({
      query: row.keys[0],
      page: row.keys[1],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
      date: `${startDate} to ${endDate}`,
    }));
  } catch (error) {
    console.error("Failed to fetch Search Console report", error);
    toast.error("Failed to fetch Search Console data");
    return [];
  }
};

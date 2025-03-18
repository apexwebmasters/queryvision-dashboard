
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

export function GoogleClientInstructions() {
  return (
    <Card className="p-4 bg-gray-50 border border-gray-200">
      <h3 className="text-lg font-medium mb-3">Setting Up Google Client ID</h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="step1">
          <AccordionTrigger className="text-sm">
            How to obtain a Google Client ID
          </AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal ml-5 space-y-3 mb-4 text-sm">
              <li>
                Go to the{" "}
                <a 
                  href="https://console.cloud.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center"
                >
                  Google Cloud Console
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>Create a new project or select an existing one</li>
              <li>Navigate to "APIs & Services" → "Library"</li>
              <li>Search for and enable "Google Search Console API"</li>
              <li>Go to "APIs & Services" → "Credentials"</li>
              <li>Click "Create Credentials" and select "OAuth client ID"</li>
              <li>
                Select "Web application" as the application type and provide a name
              </li>
              <li>
                Add authorized JavaScript origins (your app domain, e.g.,
                https://yourdomain.com)
              </li>
              <li>
                Add authorized redirect URIs (usually your app domain with the path
                /auth/callback)
              </li>
              <li>
                Click "Create" and note down your Client ID (it will look like
                123456789-abcdef.apps.googleusercontent.com)
              </li>
              <li>
                Open <code>src/utils/googleSearchConsole.ts</code> and replace the
                placeholder value for <code>GOOGLE_CLIENT_ID</code> with your actual
                Client ID
              </li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step2">
          <AccordionTrigger className="text-sm">
            No Google Cloud Console access?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3 text-sm">
              If you don't have a Google Cloud Console account or can't create a project, you have these options:
            </p>
            <ul className="list-disc ml-5 space-y-2 text-sm">
              <li>
                Ask your IT administrator to create a Google Cloud project and provide you with a Client ID
              </li>
              <li>
                Use the manual upload option instead (download reports from Search Console and upload them to this dashboard)
              </li>
              <li>
                Sign up for a Google Cloud account - it's free to start, and you only pay for resources you use beyond the free tier
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step3">
          <AccordionTrigger className="text-sm">
            OAuth authentication details
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 text-sm">
              <p>
                <strong>For dashboard providers (you):</strong> You need to set up 
                one OAuth Client ID for the application in your Google Cloud Console. 
                This Client ID is used by all your users.
              </p>
              <p>
                <strong>For dashboard users:</strong> Each user of the dashboard will 
                need to authenticate with their own Google account that has access to 
                Search Console. Users grant permission to your application to access 
                their Search Console data.
              </p>
              <p>
                Every user of this application will see a Google consent screen when they 
                click "Connect with Google" that asks for permission to access their 
                Search Console data. They will use their own Google account credentials, 
                not yours.
              </p>
              <p>
                This separation allows for secure access where:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Your application is verified by Google</li>
                <li>Users maintain control of their own data</li>
                <li>Users can revoke access at any time</li>
                <li>No user credentials are stored in your application</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

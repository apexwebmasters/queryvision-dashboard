
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Steps, Step } from "@/components/ui/steps";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";

export const DeploymentGuide = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Deployment Guide</CardTitle>
        <CardDescription>Steps to deploy this app on Hostinger</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard">
          <TabsList className="mb-4">
            <TabsTrigger value="standard">Standard Deployment</TabsTrigger>
            <TabsTrigger value="advanced">Advanced (CI/CD)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard">
            <Alert className="mb-4">
              <AlertTitle>Quick Deployment</AlertTitle>
              <AlertDescription>
                Follow these steps to deploy your React app on Hostinger
              </AlertDescription>
            </Alert>
            
            <Steps>
              <Step title="Build the Application" description="Run on your local machine">
                <Code>
                  npm run build
                </Code>
                <p className="text-sm text-muted-foreground mt-2">
                  This will create a <code>dist</code> folder with all static files
                </p>
              </Step>
              
              <Step title="Upload to Hostinger" description="Using Hostinger File Manager or FTP">
                <p className="text-sm">
                  1. Log in to your Hostinger control panel<br />
                  2. Navigate to File Manager<br />
                  3. Go to the domain/subdomain directory (search.apexwebmasters.com)<br />
                  4. Upload all files from the <code>dist</code> folder to this directory
                </p>
              </Step>
              
              <Step title="Configure Server Routing" description="Create .htaccess file">
                <Code>
{`<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`}
                </Code>
                <p className="text-sm text-muted-foreground mt-2">
                  Create this file in your domain's root directory
                </p>
              </Step>
              
              <Step title="Update Google Configuration" description="Update authorized domains">
                <p className="text-sm">
                  Add <code>search.apexwebmasters.com</code> to your Google Cloud Console as an authorized JavaScript origin
                </p>
              </Step>
            </Steps>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Alert className="mb-4">
              <AlertTitle>Advanced Deployment</AlertTitle>
              <AlertDescription>
                For automated deployment using GitHub Actions or similar CI/CD tools
              </AlertDescription>
            </Alert>
            
            <p className="mb-4">
              For a more automated deployment workflow, consider setting up GitHub Actions to automatically build and deploy your application whenever you push changes.
            </p>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Sample GitHub Actions Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <Code>
{`name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install Dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Hostinger
      uses: SamKirkland/FTP-Deploy-Action@4.0.0
      with:
        server: \${{ secrets.FTP_SERVER }}
        username: \${{ secrets.FTP_USERNAME }}
        password: \${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/
        server-dir: /public_html/search.apexwebmasters.com/`}
                </Code>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

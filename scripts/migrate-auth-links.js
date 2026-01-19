import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load service account key
// ensure you have placed service-account.json in the root of your project
const serviceAccountPath = join(process.cwd(), 'service-account.json');

console.log(`Looking for service account at: ${serviceAccountPath}`);

try {
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount)
    });
  }

  const updateEmailAuthDomain = async () => {
      // Use the literal 'HOSTING_DOMAIN' to switch to Firebase Hosting
      const hostingDomain = 'HOSTING_DOMAIN';
      
      console.log(`Updating mobile links config to use domain: ${hostingDomain}`);

      const updateRequest = {
          mobileLinksConfig: {
              domain: hostingDomain,
          },
      };

      const projectConfigManager = getAuth().projectConfigManager();

      try {
          const response = await projectConfigManager.updateProjectConfig(updateRequest);
          console.log('Project configuration updated successfully:', JSON.stringify(response, null, 2));
      } catch (error) {
          console.error('Error updating the project:', error);
      }
  };

  updateEmailAuthDomain();

} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('Error: service-account.json not found. Please download your service account key from the Firebase Console and save it as "service-account.json" in the project root.');
  } else {
    console.error('Error initializing Firebase Admin:', error);
  }
}

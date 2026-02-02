const fs = require('node:fs');
const path = require('node:path');

const ANDROID_DEST = path.join(
  __dirname,
  '../../../apps/droid/android/app/google-services.json',
);
const IOS_DEST = path.join(
  __dirname,
  '../../../apps/ios/ios/Runner/GoogleService-Info.plist',
);

function restoreSecrets() {
  try {
    if (process.env.GOOGLE_SERVICES_JSON) {
      fs.writeFileSync(ANDROID_DEST, process.env.GOOGLE_SERVICES_JSON);
      console.log('✅ Restored Android google-services.json');
    }

    if (process.env.GOOGLE_SERVICE_INFO_PLIST) {
      fs.writeFileSync(IOS_DEST, process.env.GOOGLE_SERVICE_INFO_PLIST);
      console.log('✅ Restored iOS GoogleService-Info.plist');
    }
  } catch (error) {
    console.error('❌ Failed to restore mobile secrets:', error);
    if (error) {
      console.error(JSON.stringify(error, null, 2));
    }

    // Check if error is related to missing parent directories
    if (error?.code === 'ENOENT') {
      console.log(
        'ℹ️  Skipping mobile secrets restoration (directories not found). This is expected if mobile apps are not checked out.',
      );
    } else {
      // If it's another error, we might want to fail, or just warn
      console.warn('⚠️  Could not restore mobile secrets, but proceeding.');
    }
  }
}

restoreSecrets();

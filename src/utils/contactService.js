import emailjs from '@emailjs/browser';
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  MONGODB_DATA_API_URL,
  MONGODB_API_KEY,
  MONGODB_DATABASE,
  MONGODB_COLLECTION,
  MONGODB_DATA_SOURCE,
} from './config';

/**
 * Save contact form data to MongoDB Atlas via Data API
 */
export async function saveToMongoDB(formData) {
  // If MongoDB is not configured, skip silently
  if (!MONGODB_DATA_API_URL || MONGODB_DATA_API_URL === 'YOUR_MONGODB_DATA_API_URL') {
    console.log('[MongoDB] Not configured — skipping DB save. Data:', formData);
    return { success: true, skipped: true };
  }

  try {
    const response = await fetch(`${MONGODB_DATA_API_URL}/action/insertOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGODB_API_KEY,
      },
      body: JSON.stringify({
        dataSource: MONGODB_DATA_SOURCE,
        database: MONGODB_DATABASE,
        collection: MONGODB_COLLECTION,
        document: {
          ...formData,
          createdAt: new Date().toISOString(),
          status: 'new',
        },
      }),
    });

    const result = await response.json();
    return { success: true, insertedId: result.insertedId };
  } catch (error) {
    console.error('[MongoDB] Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send email notification to owner via EmailJS
 */
export async function sendEmailNotification(formData) {
  // If EmailJS is not configured, skip silently
  if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
    console.log('[EmailJS] Not configured — skipping email. Data:', formData);
    return { success: true, skipped: true };
  }

  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      project_type: formData.projectType || 'Not specified',
      message: formData.message,
      submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return { success: true, status: result.status };
  } catch (error) {
    console.error('[EmailJS] Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Process contact form: save to DB + send email
 */
export async function processContactForm(formData) {
  const [dbResult, emailResult] = await Promise.allSettled([
    saveToMongoDB(formData),
    sendEmailNotification(formData),
  ]);

  return {
    db: dbResult.status === 'fulfilled' ? dbResult.value : { success: false, error: dbResult.reason },
    email: emailResult.status === 'fulfilled' ? emailResult.value : { success: false, error: emailResult.reason },
  };
}

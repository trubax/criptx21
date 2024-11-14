import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const sendNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snap, context) => {
    const notification = snap.data();
    const { tokens, notification: notificationData } = notification;

    const messaging = admin.messaging();

    const messages = tokens.map((token: string) => ({
      token,
      notification: notificationData,
      webpush: {
        notification: {
          ...notificationData,
          icon: notificationData.icon || '/logo.svg',
          badge: '/logo.svg'
        },
        fcmOptions: {
          link: notificationData.click_action
        }
      }
    }));

    try {
      const response = await messaging.sendAll(messages);
      console.log('Notifiche inviate:', response.successCount);
    } catch (error) {
      console.error('Errore invio notifiche:', error);
    }
  }); 
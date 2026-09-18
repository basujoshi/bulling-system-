BILLING MULTI-USER SETUP

1. Upload all files/folders to GitHub repository root.
2. Firebase Console > Authentication > Sign-in method > Email/Password > Enable.
3. Firebase Console > Realtime Database > Rules: paste firebase-rules.json and Publish.
4. Open index.html. Register a shop. Firebase creates the UID automatically.
5. Every billing database path is scoped under users/<UID>/...
6. Existing data from the old Firebase project is NOT automatically migrated.
7. Do not put Firebase Admin SDK/service-account private keys in this website.

#!/bin/bash

# Add Firebase configuration
echo "https://hive-9265c-default-rtdb.firebaseio.com" | vercel env add NEXT_PUBLIC_FIREBASE_DATABASE_URL production
echo "AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ" | vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
echo "hive-9265c.firebaseapp.com" | vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
echo "hive-9265c" | vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
echo "hive-9265c.appspot.com" | vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production
echo "573191826528" | vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production
echo "1:573191826528:web:1d5eaeb8531276e4c1a705" | vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production
echo "G-NK3E12MSFD" | vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production

# Add server Firebase variables
echo "hive-9265c" | vercel env add FIREBASE_PROJECT_ID production
echo "firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com" | vercel env add FIREBASE_CLIENT_EMAIL production
echo "-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDV/x7UM8f7q9no
Fd5i/SMsZUDMvqWvjYrC9KWK0aVrtW0hTJ6rZrW/xWJBC+UKgQQXOtSbpevy/7rM
EoH/hWYp1xvFFWKCD+D4V7aSbPekZuctg2SAXI3gfyJJ5yIB6dM7UHuD4UZTQ2i7
K7nLeoSUtXa1bgDx+OBy5Zr8FZqhnCzd/USJTvyUtHCdIuZsZiu42w3uHw/FUcd3
LH7Go1fMPnD+pkSzJCtAl609AUWliVwEEXBZtGy1VaH42GQno9bmwdy05zybS6Ta
vqeTVmDIGQIVH/rsa2EU1TyMBsZZFQkVsBT671/oHzFIRa+iAZGnbRmGGqiynzy5
dlxNZve1AgMBAAECggEAAY1L9Tm6Vtfo7V3Q8uuwepzx8YEKKbZ67dtO7AjzMOHH
hdRxa9rMsTRY06Q5KALGFvbAsEH/7sY3JwSVDsUyLp82UQ8oNwRmLWt2kez+8+pq
j6Rd3u/fLvadElT+EknEQbBLTipBXLzv++7xY9urv+fE/1Zp5MUQAVwq7ADO9rTH
tV2WkwEC+hnivH3yTnhootrbZNYHqDSNfPZPkDvQXBHMYD/iKXyGlAiKeDRgRPkA
XOr4FfH9hqLr10ZAhUqaRacdBYcb9VHHNWC69g+4fywiEu/jHecz/Rowo4wlsVW2
Nx8M+l+YqkpKtia6F5MU8Vw99iA/dRU/TxPfcJQ2AQKBgQDswckqmraXmmqpmpwc
Bt152mOIGkMo9csZt6bjDqER/vT64oL3VOOHUoQC9dXNNzZ5PAYute7/DsEWW2Z/
hsZnTiZSIILe/XoYXA4W2Wt7i2XvwvXZ8imRe9eOx+UoULaf7ebOovkD0r058jHP
dWRShrXLv2zGAJYRI9xHuAxHgQKBgQDnY8HyEA8h+UjxDMb+zaRC2PgK9Lezvt6j
stttkMs+jgdusoFDPi4jb75yFyleT/AjEzIJDa9mFIa+6OEJbHmkFvn5zmp9jJIX
c9+M/bmAzY7GLvGyv+nXvkphMTPNGE9Diqw2awsdR5MiQ66jJb/TFolY90YAcwWm
hfX7t6EqNQKBgQCfMQW0UeboNPn3JHBHIA6XOlKmVxJFXk+78RKTpWiEEyxh7SAm
cbuzZ7Y/z1B89dz403VMvyP998u43qgio1qQZ6m4mwekLEeGTY9jqbltjqNx/WMV
spBktCKSbLIW036YNnx1AHvzKCX36nO3jLVyEAX5A7N9xzMgPz6EMqp/AQKBgH/l
I84oEjU1FJwn89Xi1GgehPuJSACR/3173s0wuyZYWsNU5x3DwLzVhu6I3tTCWnkI
ox9d8RT7Q39COSB8VL/d802gSjwa9qT/5xCHLYGEHOZuDCpA6X/WLkaKa5dxWF58
x7NMd1g3t5u4zU5gDycdzcze4FJfQUBJyyzW0r4BAoGAP+7hvC6PpNwaPD8F0hnP
SX0EntFjEJEL6yhmPAaGeCjjO/CX+tKdYtny5rzQN9R9cCGIsW7nUjQxcq2S+gOq
zYeXJPMwVUKlzv5Rzq9jxESnRrUGNGLbBzytXRP6LzQSD1ccT1NoufB2fnfMd+gd
BRG9GzfMf/ykJpQ1vvucfBQ=
-----END PRIVATE KEY-----" | vercel env add FIREBASE_PRIVATE_KEY production

# Add auth variables
echo "4MBL08yfx2kLytAP/fVXMuZQ/V6MwPEGz/iLfFLOAxs=" | vercel env add NEXTAUTH_SECRET production
echo "https://www.hive.college" | vercel env add NEXTAUTH_URL production

# Add app config
echo "production" | vercel env add NODE_ENV production
echo "production" | vercel env add NEXT_PUBLIC_ENVIRONMENT production
echo "HIVE" | vercel env add NEXT_PUBLIC_APP_NAME production
echo "https://www.hive.college" | vercel env add NEXT_PUBLIC_APP_URL production
echo "1.0.0" | vercel env add NEXT_PUBLIC_APP_VERSION production

# Add campus config
echo "ub-buffalo" | vercel env add NEXT_PUBLIC_CAMPUS_ID production
echo "University at Buffalo" | vercel env add NEXT_PUBLIC_CAMPUS_NAME production
echo "buffalo.edu" | vercel env add NEXT_PUBLIC_CAMPUS_EMAIL_DOMAIN production
echo "UB" | vercel env add NEXT_PUBLIC_CAMPUS_SHORT_NAME production

# Add feature flags
echo "true" | vercel env add NEXT_PUBLIC_ENABLE_ANALYTICS production
echo "true" | vercel env add NEXT_PUBLIC_ENABLE_ERROR_REPORTING production
echo "true" | vercel env add NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING production
echo "true" | vercel env add NEXT_PUBLIC_ENABLE_APP_CHECK production
echo "false" | vercel env add NEXT_PUBLIC_ENABLE_PUSH_NOTIFICATIONS production
echo "true" | vercel env add NEXT_PUBLIC_ENABLE_BUILDER_APPLICATIONS production
echo "true" | vercel env add NEXT_PUBLIC_ENABLE_RITUALS production

echo "Environment variables added successfully!"
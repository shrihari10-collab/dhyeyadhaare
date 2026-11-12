# ಹೊಸಚಿಗುರು ಹಳೆಬೇರಿನ ಧ್ಯೇಯಧಾರೆ – Website setup

## 1. Put the site online (5 minutes, free)
1. Open https://app.netlify.com/drop in your browser (sign up with Google if asked).
2. Drag this whole folder (the one that contains `index.html`) onto the page.
3. You get a link like `https://something-random.netlify.app`. Open it on your phone and check.
4. Site settings > Change site name > e.g. `hosachiguru-hadigallu` gives `https://hosachiguru-hadigallu.netlify.app`.
5. Send me that link. I will put it in the WhatsApp preview tags (`og:image` in index.html) so the poster picture shows when the link is shared.

## 2. Save sign-ups in Google Sheet + live counter (optional, 5 minutes)
1. Create a new Google Sheet. Menu: Extensions > Apps Script.
2. Delete the existing code and paste everything from `apps-script.gs`. Save.
3. Deploy > New deployment > type: Web app. Execute as: Me. Who has access: Anyone. Deploy, then Authorize.
4. Copy the Web app URL (ends with `/exec`).
5. Open `index.html` in Notepad, find `var RSVP_URL = "";` and paste the URL between the quotes. Save and upload the folder to Netlify again.

Without step 2 the site still works. The invitation image is created and shared, and the "ಸಂಘಟಕರಿಗೆ WhatsApp ಮಾಡಿ" button sends the sign-up to the organiser's WhatsApp, but there is no list and no live counter.

## Things to confirm
- Organiser WhatsApp number for sign-up messages: `ORGANISER_PHONE` in index.html (now 9663702615).
- Map button searches Google Maps for the temple. Open it once and check it lands at the right place.

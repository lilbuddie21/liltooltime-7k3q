DEAL DESK - installable phone app (web app, no App Store)

WHAT IT IS
A small offline web app for finding, pricing and tracking resale deals, and for comparing where to sell your own gear.
Five tabs: Find (search Home Depot, Lowe's and HiBid), Check (profit calculator), Sell (where to sell your own stuff),
Inventory (every item with its details and photos), Profit (totals, profit-and-loss charts and backup).

It has no accounts, no tracking and no outside services. The inventory and sales are stored only
on the phone it runs on (photos too; photos are not part of the backup file). It does not send anything anywhere.

TO USE IT ON AN iPHONE
1. Put this whole folder on any static web host (see below) so it has an https:// address.
2. On the iPhone, open that address in Safari.
3. Tap the Share button, then Add to Home Screen.
4. Open it from the Home Screen icon. After the first load it works without a connection.

HOSTING OPTIONS (free static hosts; steps differ by service)
- Netlify, Cloudflare Pages or GitHub Pages all serve a folder of files like this one.
- Upload the files in this folder as they are. index.html must sit at the top level.
- The address will be reachable by anyone who has it. The page has no personal data in it,
  and it asks search engines not to list it, but pick a hard-to-guess name for the site.
- The app must be opened over https:// (not as a file) for Add to Home Screen and offline use.

BACKUPS
The log lives in the phone's storage for this app. Use Log, then Back up now and then,
and before deleting the app or clearing Safari data. Restore reads the same file back in.

UPDATING
The app checks for a new version whenever it is brought back to the front (and hourly while
open) and switches to it by itself. The page itself is never served from an old copy while
online; the saved copy is only used offline or on a very slow connection.
If you change an icon or the manifest, change CACHE = 'deal-desk-v7' in sw.js to a new value
(for example 'deal-desk-v8') so those files are saved again. Changes to index.html alone
need nothing extra.

FILES
index.html            the app
manifest.webmanifest  name, colors and icons for the Home Screen
sw.js                 offline cache
icon-192.png, icon-512.png, apple-touch-icon.png   icons

DEAL DESK - installable phone app (web app, no App Store)

WHAT IT IS
A small offline web app for finding, pricing and tracking resale deals, and for comparing where to sell your own gear.
Five tabs: Find (search Home Depot, Lowe's and HiBid), Check (profit calculator), Sell (where to sell your own stuff),
Inventory (every item with its details and photos), Profit (totals, profit-and-loss charts and backup).

It has no accounts and no tracking. By default the inventory and sales are stored only on the device it runs
on (photos too; photos are not part of the backup file) and nothing is sent anywhere. Sync between devices
is optional and off until you connect it (see SYNC BETWEEN DEVICES).

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

SYNC BETWEEN DEVICES (optional)
A Safari tab, the Home Screen app and each phone or Mac keep separate data, so by default they do not see each other.
Sync keeps them the same through a PRIVATE GitHub repository that you own. Item data only; photos stay on the device.
Set up once, on the first device:
1. On GitHub create a new repository named deal-desk-data. Set it to Private and tick "Add a README".
2. GitHub > Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate new token.
   Repository access: Only select repositories > deal-desk-data. Permissions > Repository permissions > Contents: Read and write.
   Pick an expiry (up to a year) and copy the token. It is shown once.
3. In the app: Profit tab > Sync between devices > "First device" > enter your-username/deal-desk-data and the token > Connect.
4. On that device tap Show sync code, and send the code to your other devices in Messages or AirDrop (treat it like a password).
5. On each other device: Profit tab > Sync code > paste > Connect with code.
How it behaves: changes upload a moment after you make them and every 30 seconds while the app is open, and the app
checks again whenever you switch back to it. If the same item is changed on two devices, the later change wins. A deleted item is
deleted everywhere, unless it was edited somewhere after it was deleted. It works offline and catches up when the connection returns.
The app refuses to connect to a public repository. Restoring a backup while sync is on also changes your other devices.
When a token expires, create a new one and Disconnect then Connect again. To cut access at any time, delete the token on GitHub.
The access token and the sync code are kept in the browser's normal storage on each device and are never added to backups.

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

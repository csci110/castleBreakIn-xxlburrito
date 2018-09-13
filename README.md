# Assignment 3: Castle Break-In
## How to complete the assignment
In your c9 workspace, you will implement the Castle Break-In game by following the instructions found at https://csci110.github.io/3_CastleBreakIn.html.

## Limit caching of Web content
To improve performance, many Web browsers "cache" content-- they keep a local temporary copy, so that if you reload the same URL, they can quickly respond without connecting to the Web server across the network.

There is a serious downside to this for programmers. When you change your code on the server, you want your browser to load the latest version, not an outdated version in its local cache.

c9 uses the Apache Web server, and you can configure it to include special headers that tell the browser not to cache content. In your c9 workspace, create a file named .htaccess, with the content of the file shown here.

```
# To prevent caching game files. 
# Requires `sudo a2enmod headers`, `sudo a2enmod expires`, `service apache2 restart`
### Apply a Cache-Control header
<FilesMatch "\.(html|js|jpg|jpeg|png|gif)$">
Header append Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>
```

Then, in a terminal, run these three commands.

```
sudo a2enmod headers
sudo a2enmod expires
service apache2 restart
```
const express = require("express");
const app = express();
const port = 3000;

// fake user data
const userData = {
  username: "pasarguard-admin",
  role: "admin",
  wallet: "0xA1b2C3d4E5",
  balance: 1500000,
  email: "pasarguard@fakemail.com",
  lastLogin: "2025-09-10 14:20"
};


app.get("/profile", (req, res) => {
  const callback = req.query.callback || "callback";

  res.type("text/javascript");
  res.send(`${callback}(${JSON.stringify(userData)});`);
});

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>JSONP Profile System</title>
    </head>
    <body>
      <h1>🔥 Pentest Profile Center 🔥</h1>
      <div id="profile"></div>

      <script>
        function renderProfile(data) {
          document.getElementById("profile").innerHTML = \`
            <p><b>Username:</b> \${data.username}</p>
            <p><b>Role:</b> \${data.role}</p>
            <p><b>Wallet:</b> \${data.wallet}</p>
            <p><b>Balance:</b> \$\${data.balance}</p>
            <p><b>Email:</b> \${data.email}</p>
            <p><b>Last Login:</b> \${data.lastLogin}</p>
          \`;
        }
      </script>

      <!-- load profile from API -->
      <script src="/profile?callback=renderProfile"></script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`JSONP lab running at http://localhost:${port}/ (profile at /profile)`);
});

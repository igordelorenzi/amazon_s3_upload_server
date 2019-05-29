# Setup

**Install dependencies:**

`npm install`

`npm install -g pm2`

**Configure your Amazon S3 Key:**

`cp config/default.json.example config/default.json`

`vim config/default.json`

**Run the Upload Server and configure a Startup Script to keep PM2 and your processes alive at every server restart:**

`pm2 start index.js`

`pm2 startup`


# Test

**Upload a file:**

`curl --request POST --url "http://localhost:1337/upload" --form 'files[]=@/path/to/your/image/file' --include`


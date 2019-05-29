# Test:
`curl --request POST --url "http://localhost:1337/upload" --form 'image=@/path_to_your_file' --include`

# Setup:
`npm install`
`npm install -g pm2`
`pm2 start index.js`
`pm2 startup`

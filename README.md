- *Start*: `npm install` and `npm start`
- *Fetch*: `curl http://localhost:4000/encached/goo`
- *Add*: `curl http://localhost:4000/encached/goo -X PUT --data '{"value": 34}' -H 'Content-Type: application/json'`
- *Remove*: `curl http://localhost:4000/encached/goo -X DELETE`
- *Test*: `mocha`
const express = require('express'),
db = require('./firebase.js'),
url = require('url');
let app = express();
const PORT = 8505;
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.post('/bciapi/post/Pallet', function(req,res){
    console.log("Post request activated");
    console.log(req.body);
    let data = req.body;
    console.log(data.License_Plate);
    db.collection('Pallets').doc(data.License_Plate).set(data)
    .then(result=>{
        console.log(result);
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
});
app.post('/bciapi/post/UpdatePalletOrder', function(req,res){
    console.log("Post request activated");
    console.log(req.body);
    let data = JSON.parse(req.body);
    console.log(data.License_Plate);
    console.log(data.Order_Num)
    db.collection('Pallets').doc(data.License_Plate).update({Order_Num: data.Order_Num})
    .then(result=>{
        console.log(result);
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
});
app.post('/bciapi/post/Inbound_Shipment', function(req,res){
    console.log("Post request activated");
    console.log(req.body);
    let data = req.body;
    console.log(data.Shipment_Num);
    db.collection('Inbound_Shipments').doc(data.Shipment_Num).set(data)
    .then(result=>{
        console.log(result);
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
});
app.post('/bciapi/post/Outbound_Shipment', function(req,res){
    console.log("Post request activated");
    console.log(req.body);
    let data = req.body;
    console.log(data.Shipment_Num);
    db.collection('Outbound_Shipments').doc(data.Shipment_Num).set(data)
    .then(result=>{
        console.log(result);
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
});
app.post('/bciapi/post/Order', function(req,res){
    console.log("Post request activated");
    console.log(req.body);
    let data = req.body;
    console.log(data.Order_Num);
    db.collection('Orders').doc(data.Order_Num).set(data)
    .then(result=>{
        console.log(result);
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
});
app.post('/bciapi/post/User', function(req,res){
    console.log("Post request activated");
    console.log(req.body);
    let data = req.body;
    console.log(data.Username);
    db.collection('Users').doc(data.Username).set(data)
    .then(result=>{
        console.log(result);
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
});

app.get('/bciapi/get/Pallet', async (req, res) => {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    let plate = '';
    if (query.lp !== undefined){
        plate = query.lp;
    } else {
        res.send("no lp provided")
    }
    const pallets = db.collection('Pallets');
    const snapshot = await pallets.where("License_Plate", "==", plate).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      res.send("no data");
    }
    let data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
    res.send(data);
//   'pallet = get pallet';
//   'res.send(pallet)';
});

app.get('/bciapi/get/Pallets', async (req, res) => {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    let plates = [];
    //  url.searchParams.getAll("options[]");
    if (query.lps !== undefined){
        plates = query.lps.split(",");
    } else {
        res.send("no lps provided")
    }
    // res.send(plates)
    const pallets = db.collection('Pallets');
    const snapshot = await pallets.where("License_Plate", "in", plates).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      res.send("no data");
    }
    let data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
    res.send(data);
});

app.get('/bciapi/get/AvailablePallets', async (req, res) => {
    const pallets = db.collection('Pallets');
    const snapshot = await pallets.where("Order_Num", "==", "").get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      res.send("no data");
    }
    let data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
    res.send(data);
});

app.get('/bciapi/get/Inbound_Shipments', async (req, res) => {
    const shipments = db.collection('Inbound_Shipments');
    const snapshot = await shipments.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      res.send("no data");
    }
    let data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
    res.send(data);
});

app.get('/bciapi/get/Inbound_Shipment', async (req, res) => {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    let shipmentNum = '';
    if (query.shipment !== undefined){
        shipmentNum = query.shipment;
    } else {
        res.send("no order provided")
    }
    const pallets = db.collection('Inbound_Shipments');
    const snapshot = await pallets.where("shipment", "==", shipmentNum).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      res.send("no data");
    }
    let data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
    res.send(data);
});


app.get('/bciapi/get/Outbound_Shipment', async (req, res) => {
    const shipments = db.collection('Outbound_Shipments');
    const snapshot = await shipments.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      res.send("no data");
    }
    let data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
    res.send(data);
});
app.get('/bciapi/get/Orders', async (req, res) => {
    const orders = db.collection('Order_List');
    const snapshot = await orders.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      res.send("no data");
    }
    let data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
    res.send(data);
});
app.get('/bciapi/get/Order', async (req, res) => {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let Order_Num = '';
    if (query.Order_Num !== undefined) {
        Order_Num = query.Order_Num
    } else {
        res.send("No Order_Num Provided");
    }
    const orders = db.collection('Order_List');
    const snapshot = await orders.where("Order_Num", "==", Order_Num).get();
    if (snapshot.empty) {
        console.log("No Matching Orders");
        res.send("No Matching Orders");
    }
    let data = [];
    snapshot.forEach(doc => {
        data.push(doc.data());
    });
    res.send(data);
});
app.get('/bciapi/get/hello', (req, res) => {
    // var url_parts = url.parse(req.url, true);
    // var query = url_parts.query;
    // if (query.shipment !== undefined){
    //     res.send(query.shipment);
    // } else {
    //     res.send("no shipment")
    // }
    res.send("hi there")
});
app.listen(PORT,function(req,res){
    console.log('started ' + req + res);
});
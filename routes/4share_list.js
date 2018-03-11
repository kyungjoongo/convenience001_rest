var fourSharedApi = require('4shared/index');
var express = require('express');
var app = express();
var fs = require('fs');


var fileId = "";
var rootFolder = "";
var folderID = "";
var userID= "";
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/*Consumer Key:
    97503ad1ebf86fcf0760e26a27f5edaf
Consumer Secret:
    0915495d0b030b81791a5cbe44d3a41a5724d7dc*/


var client = new fourSharedApi({
    "oauth_consumer_key": "97503ad1ebf86fcf0760e26a27f5edaf",
    "oauth_secret_key": "0915495d0b030b81791a5cbe44d3a41a5724d7dc",
    "callback": "http://localhost:3000/callback",
    "access_token": "optional",
    "access_secret": "optional",
    "authorized": true
});

client.on('error', function(err) {
    console.log(err);
});

client.on('connected', function(is) {
    console.log(is);
});

app.get('/start', function(req, res) {
    client.authenticate(function(err, data) {
        if (err) throw err;
        res.redirect('https://api.4shared.com/v0/oauth/authorize?oauth_token=' + data.token);
    });
});

app.get('/callback', function(req, res) {
    client.callback(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

app.get('/filesearch', function(req, res) {
    client.fileSearch(function(err, resp, body) {
        console.log(err);
        res.send(body)
    });
});

app.get('/filesearchparams', function(req, res) {
    var queryOpts = {
        category: "2",
        query: "Sky"
    };
    client.fileSearch(queryOpts, function(err, resp, body) {
        console.log(err);
        res.send(body)
    });
});

app.get('/userinfo', function(req, res) {
    client.userInfo(function(err, resp, body) {
        console.log(err);
        rootFolder = JSON.parse(body).rootFolderId;
        userID = JSON.parse(body).id;
        res.send(body);
    });
});

app.get('/uploadFile', function(req, res) {
    var formData = {
        folderId: "2iVI6yt1",
        description: "testing",
        tags: "test",
        file: fs.createReadStream(__dirname + '/origin.js')
    };

    client.uploadFile(formData, function(err, resp, body) {
        console.log(err);
        fileId = JSON.parse(body).id;
        res.send(body);
    });
});

app.get('/updateFile', function(req, res) {
    var formData2 = {
        file: fs.createReadStream(__dirname + '/replacement.js')
    }
    console.log(fileId);
    client.updateFile(fileId, formData2, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

app.get('/updateFileInfo', function(req, res) {
    var dad = {
        name: "nameisChanged"
    }
    console.log(fileId);
    client.updateFileInfo(fileId, dad, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

app.get('/fileinfo', function(req, res) {
    client.getfileInfo(fileId, false, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
})

app.get('/updateUserInfo', function(req, res) {
    var data = {
        firstName: "UpdateUser",
        description: "Hi How Are Yu!!"
    };
    client.updateUserInfo(data, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

app.get('/userfiles', function(req, res) {
    client.userFiles(function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

app.get('/getOwnerInfo', function(req, res) {
    client.getOwnerInfo(userID, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

app.get('/foldersInfo', function(req, res) {
    console.log(rootFolder);
    client.foldersInfo(rootFolder, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

app.get('/childrenFolderInfo', function(req, res) {
    client.childrenFolderInfo(rootFolder, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

app.get('/listFilesInFolder', function(req, res) {
    client.listFilesInFolder(rootFolder, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

app.get('/createFolder', function(req, res) {
    var foldata = {
        parentId: "2iVI6yt1",
        name: "testFolder",
        description: "test Folder.."
    }
    client.createFolder(foldata, function(err, resp, body) {
        console.log(err);
        folderID = JSON.parse(body).id;
        res.send(body);
    });
});

app.get('/updateFolderInfo', function(req, res) {
    var foldata = {
        name: "testFolderUpdated",
        description: "test Folder.."
    }
    client.updateFolderInfo(folderID, foldata, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});


app.get('/deleteFolder', function(req, res) {
    client.deleteFolder(folderID, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

app.get('/deleteFile', function(req, res) {
    client.deleteFile(fileId, function(err, resp, body) {
        console.log(err);
        res.send(body);
    });
});

var server = app.listen(3000,function(){
    console.log("Server Started");
});
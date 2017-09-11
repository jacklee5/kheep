//READ
//readComments: callback function for data
// - data: variable containing data from API call
var readComments = function(data) {
    var d = getData(data, req)
    console.log(d)
    d.test = "TEST"
    writeData("5354970272694272", {
        "test": "TEST1",
        "test2": "TEST2"
    })
};
//private function: checks if string can be read as JSON
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
//getData: processes data
// - data: data from callback
// - request: object specifying the request type. Object has two properties:
//    - user: Nickname of user you are getting data from
//    - fileName: fileName of file you are trying to get.
var getData = function(data, request) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].authorNickname === request["user"]) {
            data[i].content = data[i].content.split("##").join("\"");
            if (IsJsonString(data[i].content)) {
                var d = JSON.parse(data[i].content);
                for (var j = 0; j < d.length; j++) {
                    if (d[j]["$$fileName$$"] === request["fileName"]) {
                        return d[j]
                    }
                }
            } else {
                return -1;
            }

        }
    }
    return -1;
}
//init: initializes everything 
var init = function() {
    var s = document.createElement("script");
    s.setAttribute("src", "https://www.khanacademy.org/api/internal/discussions/kaencrypted_192007009d5a0227d3f7555ec1d8adb1_d0eba9d1bbd1527acab0e91867c655539d2422788e0e48dcdeb987c29d53a9ae4b196c2fad8fb4d67f30d65d28de0db07b9f2c49ed460259f9fcf028fee8344216fa7f1fb2e70846b7ef7470cbbdf6a808559f34b19b13cf522980218aeacbb9106600dacfdae0ec5f7f8f3fe76a6e10987dd72d4b6b212410c8c48cca5bea628cfa68a85afa217456ff8e57d48cd67f80eb5d627f6f36a7ec1f559d1cac9ddc/replies?casing=camel" + "&callback=readComments&\x5f=" + Date.now());
    document.body.appendChild(s);
}
//WRITE
//writeData: prompts user to use bookmarklet to save data
// - fileName: name of file to save to
// - object: an object containing the data to be saved
var writeData = function(fileName, object) {
    object.$$fileName$$ = fileName;
    prompt("To save your data: \n 1. Copy the below data.\n 2. Click on the Kheeper bookmarklet.\n 3. Copy the data into the text area. DO NOT CHANGE THE DATA!!! If you do, your account may be banned from Kheep.", JSON.stringify(object))
}
//code for the bookmarklet
var bookmarkletFunction() {
    if (window.location.href.indexOf("khanacademy.org") < 0) {
        alert("Use on a Khan Academy page");
        return;
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                var kaid = KAdefine.require("./javascript/shared-package/ka.js").getKaid();
                console.log(kaid);
                var found = false;
                var a = prompt("Copy and paste the data here:");
                if (a !== "") {
                    for (var i = 0; i < data.length; i++) {
                        if (kaid === data[i].authorKaid) {
                            var id = data[i].key;
                            var r = new XMLHttpRequest();
                            var a1 = JSON.parse(a);
                            if (IsJsonString(data[i].content)) {
                                var data1 = JSON.parse(data[i].content);
                            } else {
                                var data1 = [];
                            }
                            var exists = false;
                            for (var j = 0; j < data1.length; j++) {
                                if (data1[j] !== null) {
                                    if (a1.$$fileName$$ === data1[j].$$fileName$$) {
                                        data1[j] = a1;
                                        exists = true;
                                    }
                                }
                            }
                            if (!exists && data1.push !== undefined) {
                                data1.push(a1);
                            } else if (!exists) {
                                data1 = [a1];
                            }
                            a = data1;
                            if (a === "") return;
                            a = JSON.stringify(a);
                            a = a.split("\"").join("##");
                            r.open("PUT", "https://www.khanacademy.org/api/internal/discussions/" + "scratchpad" + "/" + "5354970272694272" + "/comments/" + id);
                            r.setRequestHeader("Content-Type", "application/json");
                            r.setRequestHeader("X-KA-FKey", document.cookie.substr(document.cookie.indexOf("fkey=") + 5, 31));
                            r.send('{"text":' + '"' + a + '"' + '}');
                            found = true;
                            return;
                        }
                    }
                }
                if (a !== "" && !found) {
                    prompt("To save data, post a comment in this thread: ", "https://www.khanacademy.org/computer-programming/kheep-save-and-share-your-files/5354970272694272?qa_expand_key=kaencrypted_192007009d5a0227d3f7555ec1d8adb1_d0eba9d1bbd1527acab0e91867c655539d2422788e0e48dcdeb987c29d53a9ae4b196c2fad8fb4d67f30d65d28de0db07b9f2c49ed460259f9fcf028fee8344216fa7f1fb2e70846b7ef7470cbbdf6a808559f34b19b13cf522980218aeacbb9106600dacfdae0ec5f7f8f3fe76a6e10987dd72d4b6b212410c8c48cca5bea628cfa68a85afa217456ff8e57d48cd67f80eb5d627f6f36a7ec1f559d1cac9ddc")
                }
            }
        };
        xhttp.open("GET", "https://www.khanacademy.org/api/internal/discussions/kaencrypted_192007009d5a0227d3f7555ec1d8adb1_d0eba9d1bbd1527acab0e91867c655539d2422788e0e48dcdeb987c29d53a9ae4b196c2fad8fb4d67f30d65d28de0db07b9f2c49ed460259f9fcf028fee8344216fa7f1fb2e70846b7ef7470cbbdf6a808559f34b19b13cf522980218aeacbb9106600dacfdae0ec5f7f8f3fe76a6e10987dd72d4b6b212410c8c48cca5bea628cfa68a85afa217456ff8e57d48cd67f80eb5d627f6f36a7ec1f559d1cac9ddc/replies?casing=camel", true);
        xhttp.send();
    }
}

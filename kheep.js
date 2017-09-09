var writeData = function(fileName,object){
        object.$$fileName$$=fileName;
        prompt("To save your data: \n 1. Copy the below data.\n 2. Click on the Kheeper bookmarklet.\n 3. Copy the data into the text area. DO NOT CHANGE THE DATA!!! If you do, your account may be banned from Kheep.",JSON.stringify(object))
    }
    var readComments = function (data) {
        var d = getData(data,req)
        console.log(d)
        d.test="TEST"
        writeData("5354970272694272",{"test":"TEST1","test2":"TEST2"})
    };
    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    var getData = function(data, request) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].authorNickname === request["user"]) {
                data[i].content=data[i].content.split("##").join("\"");
                if(IsJsonString(data[i].content)){
                    var d = JSON.parse(data[i].content);
                    for(var j = 0; j < d.length; j++){
                        if(d[j]["$$fileName$$"]===request["fileName"]){
                            return d[j]
                        }
                    }
                }else{
                    return -1;
                }
                
            }
        }
        return -1;
    }
    var init = function(){
        var s = document.createElement("script");
        s.setAttribute("src","https://www.khanacademy.org/api/internal/discussions/kaencrypted_192007009d5a0227d3f7555ec1d8adb1_d0eba9d1bbd1527acab0e91867c655539d2422788e0e48dcdeb987c29d53a9ae4b196c2fad8fb4d67f30d65d28de0db07b9f2c49ed460259f9fcf028fee8344216fa7f1fb2e70846b7ef7470cbbdf6a808559f34b19b13cf522980218aeacbb9106600dacfdae0ec5f7f8f3fe76a6e10987dd72d4b6b212410c8c48cca5bea628cfa68a85afa217456ff8e57d48cd67f80eb5d627f6f36a7ec1f559d1cac9ddc/replies?casing=camel" + "&callback=readComments&\x5f=" + Date.now());
        document.body.appendChild(s);
    }

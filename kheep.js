var getData = function(data,request){
        var result = new Object();
        for(var i = 0; i < data.length; i++){
            if(data[i].authorNickname===request["user"]){
                var d = data[i].content.split("___")
                d.shift()
                for(var j = 0; j < d.length; j++){
                    a=d[j].split("::")
                    if(a[0]===request["fileName"]){
                        b=a[1].split("__")
                        b.shift()
                        for(var k = 0; k < b.length; k++){
                            if(k%2===0){
                                if(b[k]==="NUM"){
                                    result[(b[k+1].split(":")[0]).toString()]=parseInt(b[k+1].split(":")[1])
                                }else if(b[k]==="STRING"){
                                    result[(b[k+1].split(":")[0]).toString()]=b[k+1].split(":")[1].toString()
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
    var init = function(){
        var s = document.createElement("script");
        s.setAttribute("src","https://www.khanacademy.org/api/internal/discussions/kaencrypted_192007009d5a0227d3f7555ec1d8adb1_d0eba9d1bbd1527acab0e91867c655539d2422788e0e48dcdeb987c29d53a9ae4b196c2fad8fb4d67f30d65d28de0db07b9f2c49ed460259f9fcf028fee8344216fa7f1fb2e70846b7ef7470cbbdf6a808559f34b19b13cf522980218aeacbb9106600dacfdae0ec5f7f8f3fe76a6e10987dd72d4b6b212410c8c48cca5bea628cfa68a85afa217456ff8e57d48cd67f80eb5d627f6f36a7ec1f559d1cac9ddc/replies?casing=camel" + "&callback=readComments&\x5f=" + Date.now());
        document.body.appendChild(s);
    }

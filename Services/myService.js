var Service = useRoot("/System/Service.js");
var net = require('net');
var server = net.createServer();



function myService(port){
    this.users = [
        { name : "Igor", status: "offline"},
        { name : "Caroline", status: "online"}
    ];
    var self = this;
    // это публичная функция:
    server.on('connection',function(socket){
     console.log('user connect');
     var jsocket = new JsonSocket(socket);
     jsocket.write('json','OOOOOO');
    });
    this.GetUsers = function(status) {
        return self.getUsersList(status);
    };
    return Service.call(this, port, "myService");
}

myService.serviceId = "MyService";

Inherit(myService, Service, {
        //... тут какие-то внутренние методы сервиса
        getUsersList : function(status){
        var result = [];
        for(var i=0; i<this.users.length; i++)
            if(this.users[i].status==status) result.push(this.users[i]);
        return result;
    }
})

module.exports = myService;

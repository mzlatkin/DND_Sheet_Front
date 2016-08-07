function dashboard_viewModel()
{
    var self = this;    

    self.characters = ko.observableArray();
    self.username = ko.observable("");

    socket.on("get_all_characters", function(data) {
        self.get_all_characters_success(data)
    })

    self.join = function(name)
    {
        if (name != "") {
            socket.emit("join", name);
            ready = true;
        }
    }

    self.get_all_characters_success = function(data)
    {
        self.characters(JSON.parse(data));
        console.log(self.characters());
    }
    
	self.start_app = function() 
    {
        console.log("hello!")
    }
}
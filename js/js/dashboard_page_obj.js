function dashboard_viewModel()
{
    var self = this;    

    self.characters = ko.observableArray();
    self.username = ko.observable("");
    self.character_detail = ko.observable();

    socket.on("get_all_characters", function(data) {
        self.get_all_characters_success(data)
    })

    socket.on("got_character", function(data) {
        self.get_character_success(data)
    })

    self.join = function(name)
    {
        if (name != "") {
            socket.emit("join", name);
            ready = true;
        }
    }

    self.get_character = function(pk,asdf)
    {
        console.log(pk);
        socket.emit("get_character", pk);
    }
    self.get_character_success = function(data)
    {
        self.character_detail(JSON.parse(data));
        console.log(self.character_detail());
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
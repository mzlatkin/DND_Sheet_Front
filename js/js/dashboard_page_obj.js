function dashboard_viewModel()
{
    var self = this;    

    self.characters = ko.observableArray();
    self.username = ko.observable("");
    self.character_detail = ko.observable();

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
        data = JSON.parse(data);
        temp_array = [];
        for (var i = 0, i_len = data.length; i < i_len; ++i)
        {
            temp_array.push(new character_viewModel(data[i]));
        }
        self.character_detail(temp_array[0]);
        self.characters(temp_array);
    }
    
	self.start_app = function() 
    {
        console.log("hello!")
    }
}
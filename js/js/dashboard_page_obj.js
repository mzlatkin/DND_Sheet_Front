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

    self.get_character = function(character)
    {
        console.log(character.pk);
        socket.emit("get_character", character.pk);
    }
    self.get_character_success = function(data)
    {
        console.log(data);
        data = JSON.parse(data);
        temp_array = [];
        for (var i = 0, i_len = data.length; i < i_len; ++i)
        {
            temp_array.push(new character_details_viewModel(data[i]));
        }
        self.character_detail(temp_array);
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
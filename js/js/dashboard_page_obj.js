function dashboard_viewModel()
{
    var self = this;    

    self.characters = ko.observableArray();
    self.username = ko.observable("");
    self.joined = ko.observable(false);

    socket.on("get_all_characters", function(data) {
        self.get_all_characters_success(data)
    })

    self.join = function(name)
    {
        if (name != "") {
            socket.emit("join", name);
            ready = true;
            self.joined(true);
        }
    }

    self.select_character = function(character)
    {
        for (var i = 0, i_len = self.characters().length; i < i_len; ++i)
        {
            self.characters()[i].selected(false);
        }
        character.select();
    }

    self.get_all_characters_success = function(data)
    {
        data = JSON.parse(data);
        temp_array = [];
        for (var i = 0, i_len = data.length; i < i_len; ++i)
        {
            temp_array.push(new character_viewModel(data[i]));
        }
        self.characters(temp_array);
    }

	self.start_app = function() 
    {
        console.log("hello!")
    }
}
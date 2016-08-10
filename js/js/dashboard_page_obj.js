function dashboard_viewModel()
{
    var self = this;    

    self.characters = ko.observableArray();
    self.username = ko.observable("");
    self.joined = ko.observable(false);

    socket.on("get_all_characters", function(data) {
        self.get_all_characters_success(data)
    })

    socket.on("update_equiped", function(data) {
        self.update_equipped_weapon(data);
    })

    self.join = function(name)
    {
        if (name != "") {
            socket.emit("join", name);
            ready = true;
            self.joined(true);
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
        self.characters(temp_array);
    }

    
    self.update_equipped_weapon = function(data)
    {
        for (var i = 0, i_len = self.characters().length; i < i_len; ++i)
        {
            if (data["character"] == self.characters()[i].pk())
            {
                for (var w = 0, w_len = self.characters()[i].weapons().length; w < w_len; ++w)
                {
                    if(self.characters()[i].weapons()[w].pk() == data.pk)
                    {
                        self.characters()[i].weapons()[w].equipped(data.equipped)
                    }
                }
            }
        } 
    }
    
	self.start_app = function() 
    {
        console.log("hello!")
    }
}
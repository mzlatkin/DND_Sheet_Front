function character_viewModel(character_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_obj, {}, self);

    self.selected = ko.observable(false);

    self.character_detail = ko.observableArray();
    self.items = ko.observableArray();
    self.weapons = ko.observableArray();
    self.armor = ko.observableArray();
    self.skills = ko.observableArray();
    self.char_attributes = ko.observableArray();
    self.car_class = ko.observableArray();

    console.log(self);

    socket.on("got_character_details", function(data) {
        self.get_details_success(data)
    })

    socket.on("got_character_skills", function(data) {
        self.get_skills_success(data)
    })

    self.select = function()
    {
        self.selected(!self.selected());
    }

    self.get_details = function()
    {
        socket.emit("get_character_details", self.pk());
    }

    self.get_details_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                temp_array.push(new character_details_viewModel(data[i]));
            }
            self.character_detail(temp_array[0]);
        }
    }

    self.get_skills = function()
    {
        socket.emit("get_character_skills", self.pk());
    }

    self.get_skills_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                temp_array.push(new character_skill_viewModel(data[i]));
            }
            self.skills(temp_array[0]);
        }
    }


}
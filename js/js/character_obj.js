function character_viewModel(character_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_details_obj, {}, self);

    console.log(self);

    socket.on("got_character_details", function(data) {
        self.get_details_success(data)
    })

    self.get_details = function()
    {
    	socket.emit("get_character_details", self.pk);
    }

    self.get_details_success = function(data)
    {
        console.log(data);
        data = JSON.parse(data);
        temp_array = [];
        for (var i = 0, i_len = data.length; i < i_len; ++i)
        {
            temp_array.push(new character_details_viewModel(data[i]));
        }
        self.character_detail(temp_array[0]);
        console.log(self.character_detail());
    }

}
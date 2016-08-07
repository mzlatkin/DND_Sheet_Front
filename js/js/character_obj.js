function character_viewModel(character_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_obj, {}, self);

    self.character_detail = ko.observableArray();

    console.log(self);

    socket.on("got_character_details", function(data) {
        self.get_details_success(data)
    })

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


}
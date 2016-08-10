function character_attribute_viewModel(character_attribute_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_attribute_obj, {}, self);

    self.calculate_modifier = function(){
    	console.log(self.rank());
    	ret = 0
    	ret = Math.floor((self.rank()-10)/2)
    }
    self.modifier = ko.observable(self.calculate_modifier());
}
function character_attribute_viewModel(character_attribute_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_attribute_obj, {}, self);

    self.calculate_modifier = function(){
    	console.log(self.rank());
    }
    self.modifier = ko.observable(self.calculate_modifier());
}
function character_attribute_viewModel(character_attribute_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_attribute_obj, {}, self);

    self.calculate_modifier = function(){
    	return 0
    }
    self.modifier = ko.observable(self.calculate_modifier());


}
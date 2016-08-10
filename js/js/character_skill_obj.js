function character_skill_viewModel(character_skill_obj,attributes)
{
    var self = this;    
    ko.mapping.fromJS(character_skill_obj, {}, self);

    self.calculate_modifier = function()
    {
    	console.log(attributes);
    }

    self.skill_modifier = ko.observable(self.calculate_modifier());


}
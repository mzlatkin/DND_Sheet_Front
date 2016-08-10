function character_skill_viewModel(character_skill_obj,attributes)
{
    var self = this;    
    ko.mapping.fromJS(character_skill_obj, {}, self);

    self.calculate_modifier = function()
    {
    	for (var i = 0, i_len = attributes.length; i < i_len; ++i)
        {
        	console.log(attributes[i].rank())
        	if(attributes[i].attribute() == self.skill.attribute())
        	{
        		return attributes.rank+self.rank()
        	}
        }
    }

    self.skill_modifier = ko.observable(self.calculate_modifier());


}
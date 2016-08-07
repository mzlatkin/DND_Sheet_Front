function character_skill_viewModel(character_skill_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_skill_obj, {}, self);
}
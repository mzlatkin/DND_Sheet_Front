function character_weapon_viewModel(character_weapon_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_weapon_obj, {}, self);
}
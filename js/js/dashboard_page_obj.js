function dashboard_viewModel(dashboard_obj)
{
    var self = this;    
    
    self.client_logo_success = function()
    {
        console.log("success!")
        // language = self.launch_data.lang();
        // get_json_async_from_server('/lms/get_localization/?language='+language,{},self.load_localization_success);
    }
    
    
	self.start_app = function() 
    {
        console.log("hello!")
        get_json_async_from_server('/lms/client_logo_item/', {}, self.client_logo_success);
    }
}
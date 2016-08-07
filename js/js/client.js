var viewModel;
$(document).ready(function(){ 
    viewModel = new dashboard_viewModel();
    ko.applyBindings(viewModel);
    viewModel.start_app(); 

    
    $("#chat").hide();
    $("#name").focus();
    $("form").submit(function(event){
        event.preventDefault();
    });
    ready = false;

    $("#join").click(function(){
        var name = $("#name").val();
        if (name != "") {
            socket.emit("join", name);
            $("#login").detach();
            $("#chat").show();
            $("#msg").focus();
            ready = true;
        }
    });

    $("#name").keypress(function(e){
        if(e.which == 13) {
            var name = $("#name").val();
            if (name != "") {
                socket.emit("join", name);
                ready = true;
                $("#login").detach();
                $("#chat").show();
                $("#msg").focus();
            }
        }
    });
    socket.on("get_all_characters", function(data) {
        console.log(data)
    })

    socket.on("update", function(msg) {
        if(ready)
            $("#msgs").append(" " + msg + " ");
    })

    socket.on("update-people", function(people){
        if(ready) {
            $("#people").empty();
            $.each(people, function(clientid, name) {
                $('#people').append("   " + name + "    ");
            });
        }
    });

    socket.on("chat", function(who, msg){
        if(ready) {
            $("#msgs").append(" " + who + " says: " + msg + "   ");
        }
    });

    socket.on("disconnect", function(){
        $("#msgs").append(" The server is not available ");
        $("#msg").attr("disabled", "disabled");
        $("#send").attr("disabled", "disabled");
    });


    // $("#send").click(function(){
    //     var msg = $("#msg").val();
    //     socket.emit("send", msg);
    //     $("#msg").val("");
    // });

    // $("#msg").keypress(function(e){
    //     if(e.which == 13) {
    //         var msg = $("#msg").val();
    //         socket.emit("send", msg);
    //         $("#msg").val("");
    //     }
    // });

});
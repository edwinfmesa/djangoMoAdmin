// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Place any jQuery/helper plugins in here.

function main(){
    //-------------------<letra blanca del perfil on hover>-------------------------//
    $("ul.dropdown-menu li.current-user").hover(
        function(e){
            $(".content-box *").addClass("color-fff");
        },
        function(e){
            $(".content-box *").removeClass("color-fff");
        }
    );
    //-------------------</letra blanca del perfil on hover>-------------------------//
    
    //------<No cierra el Menú de login al dar click>---------------/
    $(".next-li").focus(function(e){
        $("ul.dropdown-menu").addClass("disblock");
    }).blur(function(e){
        // $("ul.dropdown-menu").removeClass("disblock")
    });
    //------ </No cierra el Menú de login al dar click>--------------/

    //------ <On Login Submit >--------------/
    $("#close-login-menu").on("click",function(e){
        e.preventDefault();
        $("ul.dropdown-menu").removeClass("disblock");
    });
    //------ </On Login Submit >--------------/

    //----------<On Menu hover>-------------------/
    $(".navbar-element").hover(function(){
            $(this).children("div.navbar-item").addClass("navbar-item-hover");
            $(this).children("div.navbar-button-propierties").css({"height":"15px"}, 100);
    },function(){
        if(!$(this).hasClass("menu-active")){
            $(this).children("div.navbar-item").removeClass("navbar-item-hover");
            $(this).children("div.navbar-button-propierties").css({"height":"10px"}, 100);
        }
    });
    //----------</On Menu hover>-------------------/

    //----------------<>-------------------/
    $("#drop-d-menu").on("click",function(){
        $("#navbar-button-container").slideToggle("fast");
    });
    //----------------</>-------------------/

    //----------------<feedback>-------------------/
    $("#feed-option, #callFeed").on("click", openFeedBack);
    $("#close-feed, #cancel-feed").on("click", closeFeedBack);
    function openFeedBack(e){
        e.preventDefault();
        $("#feed-modal").animate({
            'right':'0px'
        });
    }
    function closeFeedBack(e) {
        e.preventDefault();
        $("#feed-modal").animate({
            'right':'-505px'
        });
    }
    var num = 0;
    $("#feed-imput > button.btn").on("click", function(){
        num = $(this).val();
        $("#textComent").focus();
        ph = "";
        switch(parseInt(num)){
            case 0 : ph = "Escribenos tus comentarios..."; break;
            case 1 : ph = "Tienes alguna idea para Actarium? Escribenos."; break;
            case 2 : ph = "Encontraste un error? Escribenos"; break;
            case 3 : ph = "Tienes una duda o una pregunta en general?"; break;
            default: ph = "Error";
        }
        $("#textComent").attr({"placeholder": ph});
    });
    function enablendButton(e) {
        if($("#textComent").val().length>0){
            $("#send-feed-back").removeClass("disabled");
        }
        else{
            $("#send-feed-back").addClass("disabled");
        }
    }
    $("#textComent").on("keyup",enablendButton);
    $("#send-feed-back").on("click",function(e){
        e.preventDefault();
        if(!$(this).hasClass("disabled")){
            comment = $("#textComent");
            mail = $("#fb-email");
            params = {"rate": num, "comment": comment.val(), "email": mail.val()}
            $("#send-feed-back").addClass("disabled");
            sendAjax("/feed-back",params, "#load-feed-back", function(data) {
                console.log(data)
                if(data['error']){
                    $("#send-feed-back").removeClass("disabled");
                    mail.focus().parent().addClass("error")
                }
                else{
                    setAlertMessage("Muchas gracias", "Tu mensaje ha sido enviado, te agradecemos por escribirnos y esperamos poder responderte pronto.")
                    comment.val("");
                    mail.parent().removeClass("error");
                    $("#feed-imput > button.btn").removeClass("active");
                    closeFeedBack();  
                }
            });//sendAjax
        }
    });
    //----------------</feedback>-------------------/
}

function setAlert(tittle, message, type){
    var l = message.length;
    var t=0;
    if (l===0) t=0;
    else if (l<=50)  t=3000;
    else if (l<=100) t=5000;
    else if (l<=200) t=6000;
    else if (l> 200) t=7000;
    $(type+" h4").html(tittle);
    $(type+" p").html(message);
    $(type).fadeIn().delay(t).fadeOut(1500);
    
}
function setAlertError(t, m){
    setAlert(t, m, '#alert-error');
}
function setAlertMessage(t, m){
    setAlert(t, m, '#alert-message');
}
function sendAjax(url, params, load_elem, myCallback){
    // $(load_elem).show().html('<img src="/static/img/load16.gif" />');
    $("#ac-load").fadeIn().html('<img src="/static/img/load.gif" />');
    $.get(url, params, function(data,error) {
            myCallback(data,error);
            // $(load_elem).hide();
            $("#ac-load").fadeOut();
        }
    );
}
$(document).on("ready",main);

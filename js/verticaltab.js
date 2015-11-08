$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
    $( "div.bhoechie-tab>div.bhoechie-tab-content" ).click(function() {
  		alert("CAN CAN SHI BEN DAN");
  		var index = $(this).index();
  		$("div.#mycard>div.ecard").removeClass("active");
  		$("div.#mycard>div.ecard").eq(index).addClass("active");
	});
});


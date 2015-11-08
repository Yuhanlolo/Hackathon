$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
    $( "#bg1" ).click(function() {
  		$(".bg2").hide();
      $(".bg3").hide();
      $(".bg4").hide();
      $(".bg1").show();
	  });
    $( "#bg2" ).click(function() {
      $(".bg1").hide();
      $(".bg3").hide();
      $(".bg4").hide();
      $(".bg2").show();
    });
    $( "#bg3" ).click(function() {
      $(".bg1").hide();
      $(".bg2").hide();
      $(".bg4").hide();
      $(".bg3").show();
    });
    $( "#bg4" ).click(function() {
      $(".bg1").hide();
      $(".bg2").hide();
      $(".bg3").hide();
      $(".bg4").show();
    });
});


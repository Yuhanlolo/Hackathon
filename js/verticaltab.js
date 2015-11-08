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
      var index = $(this).index();
      $(".ecard").show();
    });
    $("#btn1").on("click", function(event) {
      html2canvas(document.getElementById("mycard"), {
      onrendered: function(canvas) {
      var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      window.location.href=img; 
        }
    });
    });
});





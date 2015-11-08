var catimagelib = {
    nameitems : [],
    "images" : [
        {
            "name" : "bg1",
            "link" : "images/bg1.jpg",
           
        },
        {
            "name" : "bg2",
            "link" : "images/bg2.jpg",
           
        },
        {
            "name" : "bg3",
            "link" : "images/bg3.jpg",
           
        },
        {
            "name" : "bg4",
            "link" : "images/bg4.jpg",
           
        }
        
    ]
};

<<<<<<< HEAD
var catlistitemPH = '<img src="%data%" id = "%number%" width="250" height="100">';
=======
var catlistitemPH = '<img src="%data%" id = "%number%" width="250" height="100" class="clickindex">';
>>>>>>> origin/master

$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });

    catimagelib.namelist = function() {
      for (cat in catimagelib.images) {
        var catlistitem = catlistitemPH.replace("%data%" , catimagelib.images[cat].link).replace("%number%" , cat);
        catimagelib.nameitems[cat] = catimagelib.images[cat].name;
        $('.background').append(catlistitem);
      }
    };

    catimagelib.namelist();
    //$(".background").children().first().addClass("active");
<<<<<<< HEAD
    $(".background").click(
    function () {
        var idnumber = $(this).attr('id');
=======
    $(".clickindex").click(
    function () {
        var idnumber = $(this).attr('id');
        console.log(idnumber);
>>>>>>> origin/master
        //$(".ecard").removeClass('active');
        //$(this).addClass('active');
        var catimagelink = catimagelib.images[idnumber].link;
        $(".ecard").children().attr("src" , catimagelink).attr("id", idnumber);
    });

});


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

var catimagestart = '<div class="row imagestart"></div>';
var catimagePH = '<div class="col-md-8 col-sm-6 col-xs-12"><img class="catslib" id="%number%" src="%data%"></div>';
var catnamePH = '<div class="col-md-2"><h2>%data%</h2></div>';
var catclickerPH = '<div class="col-md-2 col-sm-3 col-xs-12"><p class="clickcount">Click: </p></div>';
var catlistitemPH = '<img src="%data%" width="250" height="100">';

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
        var catlistitem = catlistitemPH.replace("%data%" , catimagelib.images[cat].link);
        catimagelib.nameitems[cat] = catimagelib.images[cat].name;
        $('.catnamelist').append(catlistitem);
      }
    };

    catimagelib.namelist();
    $(".catnamelist").children().first().addClass("active");
    $("li").click(
    function () {
        var idnumber = $(this).attr('id');
        $(".nav li").removeClass('active');
        $(this).addClass('active');
        var catimagelink = catimagelib.images[idnumber].link;
        $(".ecard").children().attr("src" , catimagelink).attr("id" , idnumber);
    });

});


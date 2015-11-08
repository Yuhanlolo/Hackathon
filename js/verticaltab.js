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

var textlib = {
    textstyles : [],
    "styles" : [
        {
            "name" : "style1",
            "link" : "images/style1.jpg",
            "color": "#ffffff",
           
        },
        {
            "name" : "style2",
            "link" : "images/style2.jpg",
            "color": "#F99259",
        },
        {
            "name" : "style3",
            "link" : "images/style3.jpg",
            "color": "#ffffff",
           
        },
        {
            "name" : "style4",
            "link" : "images/style4.jpg",
            "color": "#F99259",
           
        }
        
    ]
};


var catlistitemPH = '<img src="%data%" id = "%number%" width="250" height="100" class="backgroundindex">';
var textstyleitemPH = '<img src="%data%" id = "%number%" width="250" height="100" class="textindex">';


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
    textlib.stylelist = function() {
      for (ts in textlib.styles) {
        var styleitem = textstyleitemPH.replace("%data%" , textlib.styles[ts].link).replace("%number%" , ts);
        textlib.textstyles[ts] = textlib.styles[ts].name;
        $('.greetingtext').append(styleitem);
      }
    };

    catimagelib.namelist();
    textlib.stylelist();
    //$(".background").children().first().addClass("active");

    $(".backgroundindex").click(
    function () {
        var idnumber = $(this).attr('id');
        var catimagelink = catimagelib.images[idnumber].link;
        $(".ecard").children().attr("src" , catimagelink).attr("id", idnumber);
    });

    $(".textindex").click(
    function () {
        var idnumber = $(this).attr('id');
        var textcolor = textlib.styles[idnumber].color;
        $(".text").children().css({color:textcolor});
    });

});


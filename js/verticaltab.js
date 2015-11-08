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
            "name" : "style0",
            "link" : "images/style0.png",
            "color": "#bf567d",
            "size" : "23px",
            "family":"Noteworthy",
            "x":"500px",
            "y":"60px",
           
        },
        {
            "name" : "style1",
            "link" : "images/style1.png",
            "color": "#3e4754",
            "size" : "28px",
            "family":"Tekton Pro",
            "x":"240px",
            "y":"130px",
        },
        {
            "name" : "style2",
            "link" : "images/style2.png",
            "color": "#ffffff",
            "size" : "35px",
            "family":"optima",
            "x":"230px",
            "y":"130px",
           
        },
        {
            "name" : "style3",
            "link" : "images/style3.png",
            "color": "#ffffff",
            "size" : "28px",
            "family":"Nueva Std",
            "x":"250px",
            "y":"110px",
           
        },
        {
            "name" : "style4",
            "link" : "images/style4.png",
            "color": "#542306",
            "size" : "28px",
            "family":"Trajan Pro",
            "x":"0px",
            "y":"0px",
           
        },
        {
            "name" : "style5",
            "link" : "images/style5.png",
            "color": "#5f3912",
            "size" : "28px",
            "family":"Times New Roman",
            "x":"250px",
            "y":"50px",
           
        },
        {
            "name" : "style6",
            "link" : "images/style6.png",
            "color": "#000000",
            "size" : "24px",
            "family":"Snell Roundhand",
            "x":"250px",
            "y":"110px",
           
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
        var Dleft = textlib.styles[idnumber].x;
        var Dtop = textlib.styles[idnumber].y;
        var Fsize = textlib.styles[idnumber].size;
        var FFamiy = textlib.styles[idnumber].family;
        $(".text").children().css({'font-size':Fsize, 'color':textcolor, 'font-family':FFamiy, 'padding-left':Dleft, 'padding-top':Dtop});      
    });

});


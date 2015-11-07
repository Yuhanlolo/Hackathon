<!DOCTYPE html>
<html>
<body>

<form action="mailto:you@yourdmainhere.com" method="post" enctype="text/plain">
    FirstName:<input type="text" name="FirstName">
    Email:<input type="text" name="Email">
    <input type="submit" name="submit" value="Submit">
</form>

<div id="annotary-scripts-loaded" style="display:none;"></div>


<script>
    var subject = "mail Test";
    var infor = "Hi";
    var emailAddress = "446537718@qq.com";
    //var emailAdrress = document.getElementById('Email');

    function getAjax() {
        try {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                } catch (try_again) {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            }
        } catch (fail) {
            return null;
        }
    }

    function sendMail(to, subject) {
        var rq = getAjax();

        if (rq) {
            // Success; attempt to use an Ajax request to a PHP script to send the e-mail
            try {
                rq.open('GET', 'sendmail.php?to=' + encodeURIComponent(to) + '&subject=' + encodeURIComponent(subject) + '&d=' + new Date().getTime().toString(), true);

                rq.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status >= 400) {
                            // The request failed; fall back to e-mail client
                            window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
                        }
                    }
                };

                rq.send(null);
            } catch (fail) {
                // Failed to open the request; fall back to e-mail client
                window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
            }
        } else {
            // Failed to create the request; fall back to e-mail client
            window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
        }
    }

    sendMail(emailAddress, subject);


</script>

<?php
echo "Curren Url: ";
$actual_link = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
echo $actual_link;
?>


</body>
</html>
document.addEventListener('deviceready', function () {
    swiping();
    $("#camera").click(camera);
    FingerprintAuth.delete({
        clientId: "liran",
        username: 'liranliran',
    }, successCallback, errorCallback);
    FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

}, false);


function swiping() {
    var box = {
        horizontal: 'left',
        vertical: 'up',
        el: document.getElementById('box'),
        $el: $('#box'),
        $information: $('#information'),
    }
    var margin = (box.$el.height() / 3) + 'px'
    box.$information.css('margin-top', margin);

    mc = new Hammer(box.el);
    mc.get('pan').set({
        direction: Hammer.DIRECTION_ALL
    });
    mc.on("swipeleft swiperight", function (ev) {
        if (ev.type === 'swiperight') {
            box.$el.animate({
                left: box.$el.parent().width() - box.$el.width()
            });
            box.$el.addClass('red').removeClass('green');
            $('#swipe-strength').text(Math.abs(ev.deltaX) + 'px');


        }
        if (ev.type === 'swipeleft') {
            box.$el.animate({
                left: 0
            });
            $('#swipe-strength').text(Math.abs(ev.deltaX) + 'px');
            box.$el.addClass('green').removeClass('red');
        }

    });
}

function camera() {
    $("#camera-information").hide();
    pictureWidth = $("body").width() * 0.9;
    console.log(pictureWidth);
    console.log($("#toggle").width());
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,

    });

    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        console.log(imageURI);
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function isAvailableSuccess(result) {
    console.log("FingerprintAuth available: " + JSON.stringify(result));
    if (result.isAvailable) {
        var encryptConfig = {
            clientId: 'liran',
            username: 'liranliran',
        }; // See config object for required parameters
        FingerprintAuth.encrypt(encryptConfig, encryptSuccessCallback, encryptErrorCallback);
    }
}

function isAvailableError(message) {
    console.log("isAvailableError(): " + message);
}

function encryptSuccessCallback() {
    console.log("u are authenticated !!");
}

function encryptErrorCallback(error) {
    console.log('error ! ', error);
}

function successCallback(result) {
    console.log("Successfully deleted cipher: " + JSON.stringify(result));
}

function errorCallback(error) {
    console.log(error);
}
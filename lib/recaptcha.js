if(Meteor.isClient){
  Meteor.startup(function() {
    reCAPTCHA.config({
        publickey: '6LcWghYUAAAAAMb2O3GozlR2lg03_l6ln0CdxupU',
    });
});
}

if(Meteor.isServer){
	Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: '6LcWghYUAAAAAN6qof5feCn76b7oaNQh9bxkKCpp'
    });
});
}

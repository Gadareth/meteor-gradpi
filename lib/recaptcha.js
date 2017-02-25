if(Meteor.isClient){
  Meteor.startup(function() {
    reCAPTCHA.config({
        publickey: Meteor.settings.public.recaptcha,
    });
});
}

if(Meteor.isServer){
	Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: Meteor.settings.recaptcha
    });
});
}

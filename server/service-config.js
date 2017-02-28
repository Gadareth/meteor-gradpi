Meteor.startup(function(){
	// if (process.env.NODE_ENV !== 'production') {

	ServiceConfiguration.configurations.upsert(
	  { service: "github" },
	  { $set: { clientId: Meteor.settings.github.clientId, secret: Meteor.settings.github.secret } }
	);

	ServiceConfiguration.configurations.upsert(
	  { service: "facebook" },
	  { $set: { appId: Meteor.settings.facebook.appId, secret: Meteor.settings.facebook.secret  } }
	);

	ServiceConfiguration.configurations.upsert(
	  { service: "google" },
	  { $set: { clientId: Meteor.settings.google.clientId, secret: Meteor.settings.google.secret } }
	);
});

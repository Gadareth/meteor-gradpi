Meteor.startup(function(){
	if (process.env.NODE_ENV !== 'production') {
	  
		ServiceConfiguration.configurations.upsert(
		  { service: "github" },
		  { $set: { clientId: "d3b6f9e0d079cbb44ea1", secret: "f79d0e30ff582684b4cb1da84033f3eabe20b423" } }
		);

		ServiceConfiguration.configurations.upsert(
		  { service: "facebook" },
		  { $set: { appId: "164661220695245", secret: "a0ae5c1f5487c16c6228a053bef86cf9" } }
		);

	} else {
		ServiceConfiguration.configurations.upsert(
		  { service: "github" },
		  { $set: { clientId: "d56c5b6d83ba72f5d98e", secret: "8b5b858eb0e8ac452ec962a5d9b073bfbf024217" } }
		);

		ServiceConfiguration.configurations.upsert(
		  { service: "facebook" },
		  { $set: { appId: "164646670696700", secret: "b902b19fbf6849c03e13c92073bfa639" } }
		);
	}

	ServiceConfiguration.configurations.upsert(
	  { service: "google" },
	  { $set: { clientId: "1051789464456-macqaaehbotl0s0iirgu7dkk89304ach.apps.googleusercontent.com", secret: "wjiqeqR51iWDL2dc2JwDyd8H" } }
	);
	
	

});
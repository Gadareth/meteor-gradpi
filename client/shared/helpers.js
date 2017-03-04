Template.registerHelper('isAdmin', function(userId=Meteor.userId()){
	return Roles.userIsInRole(userId, 'admin');
});
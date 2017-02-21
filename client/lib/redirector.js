Tracker.autorun(function(){
	if(!Meteor.userId() && !Meteor.loggingIn()){
		FlowRouter.redirect('/');
	}
});
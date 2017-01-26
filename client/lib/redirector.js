Tracker.autorun(function(){
	if(!Meteor.userId()){
		FlowRouter.redirect('/');
	}
});
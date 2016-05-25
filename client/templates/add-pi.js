Template.addpi.events({
	'click #piSubmit': function(event,template) {
		event.preventDefault();	
     	var name = template.find("#name").value;
     	var school = template.find("#school").value;
      	
	Meteor.call('add_advisor',name,school, function(error,result){
		console.info("Added PI");
		console.log(result);
		if(error){
			console.log(error);
		} else {
			Router.go('/rate-pi/'+result);
		}
	});
	}
})
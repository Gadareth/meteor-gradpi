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
	'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
             // handle success depending what you need to do
            var userId = Meteor.userId();
            var imagesURL = {
              “profile.image”: “/cfs/files/images/“ + fileObj._id
            };
            Meteor.users.update(userId, {$set: imagesURL});
          }
        });
     });
   },
})
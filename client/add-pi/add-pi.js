
let imagesURL;
Template.addpi.events({
	
	'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
             // handle success depending what you need to do
            var userId = Meteor.userId();
           	imagesURL = "/cfs/files/images/" + fileObj._id;
  
            console.log(imagesURL);
            // Meteor.users.update(userId, {$set: imagesURL});
          }
        });
     });
   },

	'click #piSubmit': function(event,template) {
		event.preventDefault();	
     	var name = template.find("#name").value;
     	var school = template.find("#school").value;
      	var dept = template.find("#dept").value;
      	var image = imagesURL;
      	
	Meteor.call('add_advisor',name,school,dept,image, function(error,result){
		// console.info("Added PI");
		console.log(result);
		if(error){
			console.log(error);
		} else {
			console.log(imagesURL);
			Router.go('/rate-pi/'+result);
		}
	});

  }
});
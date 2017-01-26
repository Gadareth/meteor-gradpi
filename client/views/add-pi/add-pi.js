let imagesURL;
let name;
Template.addpi.onCreated(function(){

});

Template.addpi.events({

    'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function(err, fileObj) {
                if (err) {
                    // handle error
                    console.log(err);
                    toastr.err(err.err);
                } else {
                    // handle success depending what you need to do
                    var userId = Meteor.userId();
                    template.imageURL = "/cfs/files/images/" + fileObj._id;
                }
            });
        });
    },

    'click #piSubmit': function(event, template) {
        event.preventDefault();
        var name = template.find("#name").value;
        var school = template.find("#school").value;
        var dept = template.find("#dept").value;
        var image = template.imageURL;

        Meteor.call('add_advisor', name, school, dept, image, function(error, result) {
            if (error) {
                console.log(error);
                toastr.error(error.error);
            } else {
                console.log(name);
                FlowRouter.go('/rate-pi/' + result);
            }
        });
    },

    'click #login-buttons-password': function() {
        console.log(document.getElementById('login-username-or-email').value);
    }

});
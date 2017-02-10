Template.advisorProfileCard.onCreated(function(){
    this.autorun(()=>{
        let advisor = Template.currentData().advisor;
        advisor && advisor.imageId && this.subscribe('images', advisor.imageId);
    });
});

Template.advisorProfileCard.helpers({
	
    wasCreatedByUser () {
        // return true;
        return Template.currentData().advisor && Template.currentData().advisor.createdBy === Meteor.userId();
    },
    image (_id) {
        return Images.findOne(_id);
    }
});

Template.advisorProfileCard.events({

	'change input[type=file]'(event, template) {
        FS.Utility.eachFile(event, function(file) {
            if(file.size/1024/1024 > 1) {
                toastr.error('File size should be less than 1 mb');
                return
            }
            Images.insert(file, function(err, fileObj) {
                if (err) {
                    // handle error
                    console.log(err);
                    toastr.err(err.err);
                } else {
                    // handle success depending what you need to do
                    let imageUrl = "/cfs/files/images/" + fileObj._id,
                        imageId = fileObj._id;

                    let advisorId = FlowRouter.getParam('id');
                    let formData = {
                        imageId,
                        imageUrl
                    }

                    Meteor.call('advisors.update', advisorId, formData, (error)=>{
                        if(error){
                            console.log(error);
                            toastr.error(error.reason);
                        } else {
                            toastr.success('Profile was successfully updated');
                        }
                    });
                }
            });
        });
    },
});
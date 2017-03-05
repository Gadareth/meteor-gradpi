Template.reportModal.events({
    'submit #submitReport'(event, instance){
        event.preventDefault();
        let message = event.currentTarget.reportMessage.value;
        Meteor.call('sendReport', message, function(error){
            if(error){
                console.log(error);
                toastr.error(error.reason);
                return;
            }
        });

        }
});

Template.reportModal.events({
    'submit #submitReport' (event, instance) {
        event.preventDefault();
        let message = event.currentTarget.reportMessage.value,
            advisorId = FlowRouter.getParam('id');

        Meteor.call('inapropriateContentMessage', advisorId, message, function(error) {
            if (error) {
                console.log(error);
                toastr.error(error.reason);
                return;
            }

            toastr.success('Thank you for making GradPI better!');
            Modal.hide('reportModal');
        });

    }
});
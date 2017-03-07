Template.advisorsNew.helpers({
    createAdvisor() {

        return function(formData){
            Meteor.call('advisors.insert', formData, function(error, result) {
                if (error) {
                    console.log(error);
                    toastr.error(error.reason);
                } else {
                    FlowRouter.go('advisors.rate', { id:result });
                }
            });
        }        

    }
});
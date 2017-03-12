Template.advisorDetails.onCreated(function advisorDetailsOnCreated() {
    var id = FlowRouter.getParam('id');

    this.subscribe('advisor', id);
    this.subscribe('ratings', id);
    this.subscribe('rating', id);

    this.criterias = [{
        key: 'stature',
        name: 'Stature',
        tooltip: '(How well-known is this PI in the field? Does this PI do impactful research?)'
    }, {
        key: 'mentorship',
        name: 'Mentorship',
        tooltip: '(How well does this PI mentor students in the lab and prepare them for life after lab?)'
    }, {
        key: 'autonomy',
        name: 'Autonomy',
        tooltip: '(How well does this PI delegate tasks and trust students to get them done?)'
    }, {
        key: 'resources',
        name: 'Resources',
        tooltip: '(How well is this PI funded?)'
    }, {
        key: 'tact',
        name: 'Tact',
        tooltip: '(How well does this PI convey feedback?)'
    }];
});


Template.advisorDetails.helpers({
    advisor () {
        let returnVar = Advisors.findOne({
            _id: FlowRouter.getParam('id')
        });
        return returnVar;
    },
    ratings () {
        let ratings = Ratings.find({
            advisorId: FlowRouter.getParam('id')
        }).fetch();
        // console.log('All ratings:', ratings);
        return ratings;
    },

    averageRating (criteriaKey) {
        //Compute average rating for passed criteria
        let ratings = Ratings.find({
            advisorId: FlowRouter.getParam('id')
        }).fetch();
        ratings = ratings.map((r) => {
            return r[criteriaKey];
        });
        return _.reduce(ratings, (memo, num) => {
            return memo + num;
        }, 0) / (ratings.length === 0 ? 1 : ratings.length);
    },

    criterias () {
        return Template.instance().criterias;
    },

    alreadyRated () {
        return !!Ratings.findOne({
            advisorId: FlowRouter.getParam('id'),
            owner: Meteor.userId()
        });
    },

});

Template.advisorDetails.events({
    'click [action="remove-rating"]'(event, instance) {
        let ratingId = this._id;
        BootstrapModalPrompt.prompt({
            btnDismissText: 'Cancel',
            btnOkText: 'Yes',
            title: 'Confirm removing rating',
            content: 'Are you sure you want to remove this rating?'
        }, function(result) {
            if (result) {
                Meteor.call('ratings.remove', ratingId, function(error){
                    if(error) {
                        console.log(error);
                        toastr.error(error.reason);
                    }
                    else {
                        toastr.success('Successfully removed!');
                    }
                });
            }
        });
    },

    'click [action="remove-own-rating"]'(event, instance){
        let advisorId = this._id;
        let rating = Ratings.findOne({advisorId:advisorId, owner:Meteor.userId()});
        let ratingId = rating._id || '';
        BootstrapModalPrompt.prompt({
            btnDismissText: 'Cancel',
            btnOkText: 'Yes',
            title: 'Confirm removing rating',
            content: 'Are you sure you want to remove this rating?'
        }, function(result) {
            if (result) {
                Meteor.call('ratings.remove', ratingId, function(error){
                    if(error) {
                        console.log(error);
                        toastr.error(error.reason);
                    }
                    else {
                        toastr.success('Successfully removed!');
                    }
                });
            }
        });
    },

    'click #reportShow'(event, instance){
        Modal.show('reportModal');
    }
})

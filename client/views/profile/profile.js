Template.profile.onCreated(function profileOnCreated() {
    var id = FlowRouter.getParam('id');

    this.subscribe('advisor', id);
    this.subscribe('ratings', id);
    this.subscribe('rating', id);

    this.criterias = [{
        key: 'stature',
        name: 'Stature',
        tooltip: 'How well-known is this PI in the field? Does this PI do impactful research?'
    }, {
        key: 'mentorship',
        name: 'Mentorship',
        tooltip: 'How well does this PI mentor students in the lab?'
    }, {
        key: 'autonomy',
        name: 'Autonomy',
        tooltip: 'Does this PI delegate tasks and trust students to get them done? Or does this PI micromanage everything?'
    }, {
        key: 'resources',
        name: 'Resources',
        tooltip: 'How well is this PI funded?'
    }, {
        key: 'tact',
        name: 'Tact',
        tooltip: 'How well does this PI convey feedback?'
    }];
});


Template.profile.helpers({
    thisAdvisor () {
        let returnVar = Advisors.findOne({
            _id: FlowRouter.getParam('id')
        });
        return returnVar;
    },
    allRatings () {
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

    wasCreatedByUser () {
        return true;
        return this.createBy === Meteor.userId();

    }
});  

Template.profile.events({
    'change .myFileInput'(event, template) {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function(err, fileObj) {
                if (err) {
                    // handle error
                    console.log(err);
                    toastr.err(err.err);
                } else {
                    // handle success depending what you need to do
                    let image = "/cfs/files/images/" + fileObj._id;
                    let advisorId = FlowRouter.getParam('id');
                    let formData = {
                        image
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
})
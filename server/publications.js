Meteor.publish('advisors', function() {
    return Advisors.find();
});

Meteor.publish('advisor', function(id) {
    return Advisors.find({
        _id: id
    });
});

Meteor.publish('images', function() {
    return Images.find({});
});

Meteor.publish('ratings', function(advisorId){
    return Ratings.find({advisorId});
});

Meteor.publish('rating', function(advisorId){
    let owner = this.userId;
    return Ratings.find({advisorId, owner});
});
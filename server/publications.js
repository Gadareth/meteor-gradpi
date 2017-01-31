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

Meteor.publish('schools:search', function(searchString) {
	return Schools.find({
		name: {
			$regex: searchString,
			$options : 'i'
		}
	});
});

Meteor.publish('departments:search', function(schoolId, searchString) {
	return Departments.find({
		schoolId, 
		name:{
			$regex: searchString,
			$options : 'i'
		}
	});
});

Meteor.publish('school', function(schoolId) {
	return Schools.find({_id:schoolId});
});
Meteor.publish('department', function(departmentId) {
	return Departments.find({_id:departmentId});
});
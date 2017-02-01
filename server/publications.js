Meteor.publish('advisors', function(query={}) {
    return Advisors.find(query);
});

Meteor.publish('advisor', function(_id) {
    return Advisors.find({
        _id
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

Meteor.publish('departments:search', function(school, searchString) {
	return Departments.find({
		school, 
		name:{
			$regex: searchString,
			$options : 'i'
		}
	});
});

Meteor.publish('schools', function(query={}) {
	return Schools.find(query);
});

Meteor.publish('departments', function(query={}) {
	return Departments.find(query);
});

Meteor.publish('school', function(schoolId) {
	return Schools.find({_id:schoolId});
});
Meteor.publish('department', function(departmentId) {
	return Departments.find({_id:departmentId});
});
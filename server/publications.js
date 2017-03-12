Meteor.publish('advisors', function(query={}, options={}) {
    return Advisors.find(query, options);
});

Meteor.publish('advisor', function(_id) {
    return Advisors.find({
        _id
    });
});

// Meteor.publish('images', function() {
//     return Images.find({});
// });

Meteor.publish('ratings', function(advisorId){
    return Ratings.find({advisorId});
});

Meteor.publish('rating', function(advisorId){
    let owner = this.userId;
    return Ratings.find({advisorId, owner});
});

Meteor.publish('universities:search', function(query={}, searchString) {
	let searchObj = {
		name: {
			$regex: searchString,
			$options : 'i'
		}
	}

	_.extend(query, searchObj);
	return Universities.find(query, {
		sort: {
			name:1
		}
	});
});

Meteor.publish('schools:search', function(query={}, searchString) {
	let searchObj = {
		name: {
			$regex: searchString,
			$options : 'i'
		}
	}

	_.extend(query, searchObj);

	return Schools.find(query, {
		sort: {
			name:1
		}
	});
});

Meteor.publish('departments:search', function(query={}, searchString) {
	let searchObj = {
		name: {
			$regex: searchString,
			$options : 'i'
		}
	}

	_.extend(query, searchObj);
	return Departments.find(query, {
		sort: {
			name:1
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

Meteor.publish('advisorsImages', function(advisorId){
	let query = null;
	if(typeof advisorId === 'string'){
		let advisor = Advisors.findOne(advisorId) || {};
		query = {_id: advisor.imageId};
	} else if(advisorId.isArray()){
		let imageIds = [];
		advisorId.forEach((a)=>{
			let advisor = Advisors.findOne(a) || {};
			advisor.imageId && imageIds.push(advisor.imageId);
		});
		query = {
			_id: {
				$in : imageIds
			}
		}
	}
	return Images.find(query);
});

Meteor.publish('images', function(imageId){
	if(typeof imageId === 'string'){
		return Images.find(imageId);
	}
	return Images.find({
		_id: {
			$in : imageId
		}
	});
});
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Ratings, Advisors } from '../../imports/collections.js';

Template.profile.onCreated(function profileOnCreated() {
	this.subscribe('advisor', Router.current().params.id);
	this.subscribe('ratings', Router.current().params.id);

	this.criterias = [
		{
			key: 'stature',
			name: 'Stature',
			tooltip: 'How well-known is this PI in the field? Does this PI do impactful research?'
		},{
			key: 'mentorship',
			name: 'Mentorship',
			tooltip: 'How well does this PI mentor students in the lab?'
		},{
			key: 'autonomy',
			name: 'Autonomy',
			tooltip: 'Does this PI delegate tasks and trust students to get them done? Or does this PI micromanage everything?'
		},{
			key: 'resources',
			name: 'Resources',
			tooltip: 'How well is this PI funded?'
		},{
			key: 'tact',
			name: 'Tact',
			tooltip: 'How well does this PI convey feedback?'
		}
	];
});


Template.profile.helpers({
	thisAdvisor: function (){
		let returnVar = Advisors.findOne({_id: Router.current().params.id});
		return returnVar;
	},
	allRatings: function(){
		let ratings = Ratings.find({advisorId: Router.current().params.id}).fetch();
		console.log('All ratings:', ratings);
		return ratings;
	},

	averageRating: function(criteriaKey) {
		//Compute average rating for passed criteria
		let ratings = Ratings.find({advisorId: Router.current().params.id}).fetch();
		ratings = ratings.map((r) => {
			return r[criteriaKey];
		});
		return _.reduce(ratings, function(memo, num) {
	        return memo + num;
	    }, 0) / (ratings.length === 0 ? 1 : ratings.length);
	},

	criterias: function() {
		return Template.instance().criterias;
	},

	alreadyRated: function() {
		return !!Ratings.findOne({advisorId: Router.current().params.id, owner: Meteor.userId()});
	}
});

function removeTextAreaWhiteSpace() {
	var myTxtArea = document.getElementById('#comments');
	myTxtArea.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
}
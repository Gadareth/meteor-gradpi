import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Advisors } from '../../imports/collections.js';

Template.profile.onCreated(function profileOnCreated() {
	this.subscribe('advisors');
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
	]
});


Template.profile.helpers({
	thisAdvisor: function (){
		let returnVar = Advisors.findOne({_id: Router.current().params.id});
		return returnVar;
	},
	allRatings: function(){
		let returnVar = Advisors.findOne({_id: Router.current().params.id});
		let all_ratings = [];
		let total_responses = returnVar.stature.length;

		for(let i = 0; i < total_responses; i++){
			all_ratings[i] = {
				stature: returnVar.stature[i],
				mentorship: returnVar.mentorship[i],
				autonomy: returnVar.autonomy[i],
				resources: returnVar.resources[i],
				tact: returnVar.tact[i],
				free_response: returnVar.free_response[i]
			}
		}

		console.log(all_ratings);
		return all_ratings;
	},

	averageRating: function(criteriaKey) {
		let advisor = Advisors.findOne({_id: Router.current().params.id});
		let overall_ratings = {};

		//Compute average rating for passed criteria
		let rating = advisor[criteriaKey];
		return _.reduce(rating, function(memo, num) {
	        return memo + num;
	    }, 0) / (rating.length === 0 ? 1 : rating.length);
	},

	criterias: function() {
		return Template.instance().criterias;
	}
});

function removeTextAreaWhiteSpace() {
	var myTxtArea = document.getElementById('#comments');
	myTxtArea.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
}
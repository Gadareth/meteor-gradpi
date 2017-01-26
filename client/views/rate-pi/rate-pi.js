Template.ratepi.onCreated(function ratepiOnCreated() {
	let id = FlowRouter.getParam('id');
	this.subscribe('advisor', id);
	this.subscribe('rating', id);

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

Template.ratepi.events({
	'click #ratingSubmit': function(event,instance) {
		console.log ("rate submit clicked");
		event.preventDefault();

		let criterias = instance.criterias;
		let rating = {};
		criterias.forEach((criteria) => {
			const value = instance.$(`#rating-${criteria.key} input.rating`).val() - 0 // -0 means number from string
			if(!value){
				const errorMsg = `You didn't enter a rating for ${criteria.key}!`;
				alert(errorMsg);
				throw errorMsg;
			}
			rating[criteria.key] = value;
		});	
		
		let f = instance.find("#comments").value;
		const advisorId = FlowRouter.getParam('id');

		Meteor.call('rate_advisor',advisorId,rating,f,(error,success)=>{
			if(error){
				toastr.error(error.error);
				console.log(error);
				return;
			} else {
				toastr.success('Successfully rated!')
				FlowRouter.go("/profile/"+ FlowRouter.getParam('id'));
			}
		});
	}
});

Template.ratepi.helpers({
	thisAdvisor: function (){
		//console.log(Advisors.find().count());
		let returnVar = Advisors.findOne({_id: FlowRouter.getParam('id')});
		console.log(Advisors.find().fetch());
		return returnVar;
	},

	criterias: function() {
		return Template.instance().criterias;
	},

	rating: function(criteriaKey) {
		//Compute average rating for passed criteria
		let rating = Ratings.findOne({advisorId:FlowRouter.getParam('id'), owner: Meteor.userId()});
		if(!rating) return null;
		return rating[criteriaKey];
	},

	free_feedback: function() {
		let rating = Ratings.findOne({advisorId: FlowRouter.getParam('id'), owner: Meteor.userId()});
		if(!rating) return null;
		return rating['free_response'];
	}
});

function removeTextAreaWhiteSpace() {
	var myTxtArea = document.getElementById('#comments');
	myTxtArea.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
}
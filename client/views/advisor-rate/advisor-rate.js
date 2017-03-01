Template.advisorRate.onCreated(function advisorRateOnCreated() {
	let id = FlowRouter.getParam('id');
	this.subscribe('advisor', id);
	this.subscribe('rating', id);

	this.gradSelected = new ReactiveVar(false);
	this.autorun(()=>{
		let rating = Ratings.findOne({advisorId:FlowRouter.getParam('id'), owner: Meteor.userId()});
		if(rating){
			this.gradSelected.set(rating.role === 'grad');
		}
	});

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

Template.advisorRate.events({
	'submit #rating-form': function(event,instance) {
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

		let comments = instance.find("#comments").value;
		const advisorId = FlowRouter.getParam('id');

		let additionalFields = {
			role : event.currentTarget.role.value,
			PIrole: null
		}
		if(event.currentTarget.PIrole && event.currentTarget.PIrole.value) {
			additionalFields['PIrole'] = event.currentTarget.PIrole.value;
		}
		Meteor.call('advisors.rate',advisorId,rating,comments, additionalFields, (error,success)=>{
			if(error){
				toastr.error(error.error);
				console.log(error);
				return;
			} else {
				toastr.success('Successfully rated!');
				Modal.show('rateAnotherPIModal', {advisorId: FlowRouter.getParam('id')});
				// FlowRouter.go('advisors.details' , {id:FlowRouter.getParam('id')});
			}
		});
	},

	'change [name="role"]'(event,instance) {
		event.preventDefault();
		if(event.currentTarget.value === 'grad') {
			instance.gradSelected.set(true);
		} else {
			instance.gradSelected.set(false);
		}
	} ,

});

Template.advisorRate.helpers({
	advisor(){
		//console.log(Advisors.find().count());
		let returnVar = Advisors.findOne({_id: FlowRouter.getParam('id')});
		console.log(Advisors.find().fetch());
		return returnVar;
	},

	criterias() {
		return Template.instance().criterias;
	},

	rating(criteriaKey) {
		//Compute average rating for passed criteria
		let rating = Ratings.findOne({advisorId:FlowRouter.getParam('id'), owner: Meteor.userId()});
		if(!rating) return null;
		return rating[criteriaKey];
	},

	free_feedback() {
		let rating = Ratings.findOne({advisorId: FlowRouter.getParam('id'), owner: Meteor.userId()});
		if(!rating) return null;
		return rating['free_response'];
	},

	ratingsObj() {
		let rating = Ratings.findOne({advisorId: FlowRouter.getParam('id'), owner: Meteor.userId()});
		if(!rating) return null;
		return rating;
	},

	gradSelected() {
		return Template.instance().gradSelected.get();
	},

	isEqual(val1 , val2) {
		return val1 === val2;
	}
});

function removeTextAreaWhiteSpace() {
	var myTxtArea = document.getElementById('#comments');
	myTxtArea.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
}

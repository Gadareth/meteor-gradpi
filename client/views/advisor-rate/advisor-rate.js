Template.advisorRate.onCreated(function advisorRateOnCreated() {

	this.autorun(()=>{
		let id = FlowRouter.getParam('id');
		this.subscribe('advisor', id);
		this.subscribe('rating', id);
	});

	this.gradSelected = new ReactiveVar(false);
	this.autorun(()=>{
		let rating = Ratings.findOne({advisorId:FlowRouter.getParam('id'), owner: Meteor.userId()});
		if(rating){
			this.gradSelected.set(rating.role === 'grad');
		}
	});

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
    }]
});

Template.advisorRate.onRendered(function(){

	this.$datePicker = $('#date-picker').datepicker({
	    autoclose: true,
	    minViewMode: 1,
	    format: 'MM yyyy',
	    endDate:'today'
	});

    this.autorun(()=>{
    	let rating = Ratings.findOne({advisorId:FlowRouter.getParam('id'), owner: Meteor.userId()}) || {};
    	let date = rating.lastInteraction || new Date();
    	Tracker.afterFlush(()=>{
	    	this.$datePicker.datepicker('update', date);
    	});
    });

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

		let comments = instance.find("#comments").value.trim();
		const advisorId = FlowRouter.getParam('id');

		let additionalFields = {
			role : event.currentTarget.role.value,
			lastInteraction : $('#date-picker').datepicker('getDate'),
			PIrole: null
		}
		if(event.currentTarget.PIrole && event.currentTarget.PIrole.value) {
			additionalFields['PIrole'] = event.currentTarget.PIrole.value;
		}
		Meteor.call('advisors.rate',advisorId,rating,comments, additionalFields, (error,success)=>{
			if(error){
				toastr.error(error.reason);
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

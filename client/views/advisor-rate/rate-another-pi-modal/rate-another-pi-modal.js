Template.rateAnotherPIModal.onCreated(function(){
	this.state = new ReactiveVar('ask');
});

Template.rateAnotherPIModal.helpers({
	state(val) {
		return Template.instance().state.get() === val;
	}
});

Template.rateAnotherPIModal.events({
	'click [action="set-state"]'(event,instance) {
		let state = event.currentTarget.dataset['state'];
		Template.instance().state.set(state);
	},
	'click #do-not-rate'(){
		FlowRouter.go('advisors.details' , {id:FlowRouter.getParam('id')});
	},

	'click #rate-listed-pi'(){
		FlowRouter.go('advisors');
	},

	'click #do-not-rate-listed-pi'(){
		FlowRouter.go('advisors.new');
	},
});

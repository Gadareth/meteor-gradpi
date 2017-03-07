Template.advisorDetailsTableRow.onCreated(function(){
	this.state = new ReactiveVar('view');
});

Template.advisorDetailsTableRow.helpers({
	state(state) {
		return Template.instance().state.get() === state;
	}
});

Template.advisorDetailsTableRow.events({
	'click [action=set-state]'(event, instance) {
		let state = event.currentTarget.dataset['state'];
		instance.state.set(state);
	},

	'click [action=save-rating]'(event,instance) {
		let fields = [ 
			'stature',
			'mentorship',
			'autonomy',
			'resources',
			'tact',
			'free_response'
		];

		let formData = {};


		fields.forEach((f)=>{
			formData[f] = instance.$(`[name=${f}]`).val();
			if(f !== 'free_response') formData[f] = formData[f].trim();

		});

		Meteor.call('ratings.update', this._id, formData, (error) => {
			if(error){
				console.log(error);
				toastr.error(error.reason);
				return;
			}
			toastr.success('Successfully saved');
			instance.state.set('view');
		});
	}
});
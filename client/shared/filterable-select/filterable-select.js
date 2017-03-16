Template.filterableSelect.onCreated(function(){

});

Template.filterableSelect.onRendered(function(){

});

Template.filterableSelect.events({
	'mousedown .input-dropdown-option'(event, instance) {
		let option = this,
			displayKey = instance.data.displayKey,
			valueKey = instance.data.valueKey;

	    instance.$('input.display-holder').val(this[displayKey]);
	    instance.$('input.value-holder').val(this[valueKey]);

	    if(typeof instance.data.onSelect === 'function'){
	    	instance.data.onSelect(this);
	    }
	},
	'input [action="filter-options"]'(event, instance) {
		let value = event.currentTarget.value;
		instance.$('input.value-holder').val(value);
		if(typeof instance.data.onInput === 'function'){
			instance.data.onInput(value);
		}
	}
});

Template.filterableSelect.helpers({
	getDisplayValue() {
		let displayKey = Template.instance().data.displayKey;
		return this[displayKey];
	},
	getOptionValue(option,key) {
		console.log(option[key])
		if(option){
			return option[key];
		}
	},

});

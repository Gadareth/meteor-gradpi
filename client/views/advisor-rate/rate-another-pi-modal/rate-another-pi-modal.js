Template.rateAnotherPIModal.onCreated(function() {
    this.state = new ReactiveVar('ask');
    this.advisorsSearchString = new ReactiveVar('');
    this.autorun(() => {
        let searchString = this.advisorsSearchString.get();
        this.subscribe('advisors', {
            $or: [{
                firstName: {
                    $regex: searchString,
                    $options: 'i'
                }
            }, {
                lastName: {
                    $regex: searchString,
                    $options: 'i'
                }
            }]
        }, {
            limit : 10
        });
    });
});

Template.rateAnotherPIModal.helpers({
    state(val) {
        return Template.instance().state.get() === val;
    },

    advisors() {
        let searchString = Template.instance().advisorsSearchString.get();
        if (!searchString) return [];
        return Advisors.find({
            $or: [{
                firstName: {
                    $regex: searchString,
                    $options: 'i'
                }
            }, {
                lastName: {
                    $regex: searchString,
                    $options: 'i'
                }
            }]
        }, {
            limit : 10
        }).fetch();
    },


});

Template.rateAnotherPIModal.events({
    'click [action="set-state"]' (event, instance) {
        let state = event.currentTarget.dataset['state'];
        Template.instance().state.set(state);
    },
    'click #do-not-rate' () {
        FlowRouter.go('share');
    },

    'click #rate-listed-pi' () {
        FlowRouter.go('advisors.list');
    },

    'click #do-not-rate-listed-pi' () {
        FlowRouter.go('advisors.new');
    },

    'click [action="rate-another-pi"]' (event, instance) {
        let advisorId = this._id;
        FlowRouter.go('advisors.rate', {id:advisorId});
    },

    'input [action="search-advisors"]' (event, instance) {
        event.preventDefault();
        let value = event.currentTarget.value;
        instance.advisorsSearchString.set(value);
    }
});
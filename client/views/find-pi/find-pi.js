Template.findPi.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    this.subscribe('advisors');
});

Template.findPi.helpers({
    findAdvisors: function() {
        const instance = Template.instance();
        let clicked_school = instance.state.get('school');
        let clicked_dept = instance.state.get('dept');
        if (clicked_school || clicked_dept) {
            if (clicked_school && clicked_dept) {
                return Advisors.find({
                    school: clicked_school,
                    dept: clicked_dept
                });
            } else if (clicked_school && !(clicked_dept)) {
                return Advisors.find({
                    school: clicked_school
                });
            } else if (clicked_dept && !(clicked_school)) {
                return Advisors.find({
                    dept: clicked_dept
                });
            }
        }
        return Advisors.find();
    }
});

Template.findPi.events({
    'change #schoolSelect' (event, instance) {
        instance.state.set('school', event.target.value);
    },
    'change #deptSelect' (event, instance) {
        instance.state.set('dept', event.target.value);
    },
    'click .advisor' (event) {
        FlowRouter.go("/profile/" + this._id);
    }
});
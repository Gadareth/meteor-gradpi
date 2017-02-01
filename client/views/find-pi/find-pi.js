Template.findPi.onCreated(function bodyOnCreated() {
    this.subscribe('schools');
    this.school = new ReactiveVar('');
    this.department = new ReactiveVar('');

    this.autorun(()=>{
        let school = this.school.get();
        this.subscribe('departments', {school})
        let department = this.department.get();

        let query = {};
        if(school){
            query.school = school;
        }
        if(department) {
            query.department = department
        }
        this.subscribe('advisors', query);    
    }); 

});

Template.findPi.helpers({
    advisors() {
        const instance = Template.instance();
        let school = instance.school.get();
        let department = instance.department.get();

        let query = {};
        if(school){
            query.school = school;
        }
        if(department) {
            query.department = department
        }
        return Advisors.find(query);
    }, 
    schools() {
        return Schools.find();
    },
    departments() {
        let school = Template.instance().school.get();
        return Departments.find({school});
    }
});

Template.findPi.events({
    'change #schoolSelect' (event, instance) {
        instance.school.set(event.currentTarget.value);
    },
    'change #deptSelect' (event, instance) {
        instance.department.set(event.currentTarget.value);
    },
    'click .advisor'(event,instance) {
        FlowRouter.go(`/profile/${this._id}`);
    } 
});
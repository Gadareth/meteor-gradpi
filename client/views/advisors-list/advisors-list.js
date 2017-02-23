Template.advisorsList.onCreated(function bodyOnCreated() {
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
            query.dept = department
        }
        this.subscribe('advisors', query);
    });

});

Template.advisorsList.helpers({
    advisors() {
        const instance = Template.instance();
        let school = instance.school.get();
        let department = instance.department.get();

        let query = {};
        if(school){
            query.school = school;
        }
        if(department) {
            query.dept = department
        }
        let advisors = Advisors.find(query, {
            sort:{
                firstName: 1,
                lastName: 1
            }
        }).fetch();
        console.log(query)

        return _.sortBy((_.sortBy(advisors, (a) => {
            return a.firstName.toLowerCase();
        })), (a) => {
            return a.lastName.toLowerCase();
        });
    },
    schools() {
        return Schools.find();
    },
    departments() {
        let school = Template.instance().school.get();
        return Departments.find({school});
    }
});

Template.advisorsList.events({
    'change #schoolSelect' (event, instance) {
        instance.school.set(event.currentTarget.value);
    },
    'change #deptSelect' (event, instance) {
        instance.department.set(event.currentTarget.value);
    },
    'click .advisor'(event,instance) {
        FlowRouter.go('advisors.rate' , {id : this._id});
    }
});

Template.advisorsList.onCreated(function bodyOnCreated() {
    this.school = new ReactiveVar('');
    this.department = new ReactiveVar('');
    this.university = new ReactiveVar('');
    this.subscribe('universities');

    this.autorun(()=>{
        let university = this.university.get();
        this.subscribe('schools', {university});
        let school = this.school.get();
        this.subscribe('departments', {university,school})
        let department = this.department.get();

        let query = {};
        if(university) {
            query.university = university;
            if(school){
                query.school = school;
                if(department) {
                    query.department = department
                }
            }
        }
        this.subscribe('advisors', query);
    });
});

Template.advisorsList.helpers({
    advisors() {
        const instance = Template.instance();
        let school = instance.school.get();
        let department = instance.department.get();
        let university = instance.university.get();

        let query = {};
        if(university) {
            query.university = university;
            if(school){
                query.school = school;
                if(department) {
                    query.department = department
                }
            }
        }
        
        let advisors = Advisors.find(query, {
            sort:{
                firstName: 1,
                lastName: 1
            }
        }).fetch();

        return _.sortBy((_.sortBy(advisors, (a) => {
            return a.firstName.toLowerCase();
        })), (a) => {
            return a.lastName.toLowerCase();
        });
    },
    universities() {
        return Universities.find();
    },
    schools() {
        let university = Template.instance().university.get();
        return Schools.find({university});
    },
    departments() {
        let university = Template.instance().university.get();
        let school = Template.instance().school.get();
        return Departments.find({university,school});
    }
});

Template.advisorsList.events({
    'change #universitySelect' (event, instance) {
        instance.university.set(event.currentTarget.value);
    },
    'change #schoolSelect' (event, instance) {
        instance.school.set(event.currentTarget.value);
    },
    'change #deptSelect' (event, instance) {
        instance.department.set(event.currentTarget.value);
    },
    'click .advisor'(event,instance) {
        FlowRouter.go('advisors.details' , {id : this._id});
    }
});

Template.advisorsForm.onCreated(function(){
    this.schoolSearchString = new ReactiveVar('');
    this.departmentSearchString = new ReactiveVar('');
    this.school = new ReactiveVar('');
    this.autorun(()=>{
        let advisor = Template.currentData().advisor;
        if(advisor) {
            this.school.set(advisor.school);
            this.schoolSearchString.set(advisor.school);
            this.departmentSearchString.set(advisor.dept);
        }
    });
    this.autorun(()=>{
        this.subscribe('schools:search', this.schoolSearchString.get());
        this.subscribe('departments:search', this.school.get(), this.departmentSearchString.get());
    });

});

Template.advisorsForm.helpers({
    schools() {
        let searchString = Template.instance().schoolSearchString.get();

        return Schools.find({
            name: {
                $regex: searchString,
                $options : 'i'
            }
        });
    },
    departments() {
        let searchString = Template.instance().departmentSearchString.get(),
            school = Template.instance().school.get();

        return Departments.find({
            school,
            name: {
                $regex: searchString,
                $options : 'i'
            }
        });
    }
});

Template.advisorsForm.events({
    'input [action=search-school]'(event, instance){
        instance.schoolSearchString.set(event.currentTarget.value);
    },
    'input [action=search-department]'(event, instance){
        instance.departmentSearchString.set(event.currentTarget.value);
    },
    'mousedown [action=set-school]'(event, instance) {
        instance.school.set(this.name);
        instance.$('input#school').val(this.name);
    },
    'mousedown [action=set-department]'(event, instance) {
        instance.$('input#department').val(this.name);
    },

    'change input[type="file"]#image'(event, template) {
        FS.Utility.eachFile(event, function(file) {
            if(file.size/1024/1024 > 1) {
                toastr.error('File size should be less than 1 mb');
                return
            }
            Images.insert(file, function(err, fileObj) {
                if (err) {
                    // handle error
                    console.log(err);
                    toastr.err(err.err);
                } else {
                    // handle success depending what you need to do
                    template.imageId = fileObj._id;
                }
            });
        });
    },

    'submit #advisorsForm'(event, instance) {
        event.preventDefault();
        var form = event.currentTarget;

        var formData = {
            firstName : form.firstName.value,
            lastName : form.lastName.value,
            school: form.school.value,
            dept: form.department.value,
            website: form.website.value,
        }

        if(instance.imageId) {
            formData['imageUrl'] = "/cfs/files/images/" + instance.imageId;
            formData['imageId'] = instance.imageId;
        }

        if(typeof instance.data.onSubmit === 'function'){
            instance.data.onSubmit(formData)
        }
    }

});

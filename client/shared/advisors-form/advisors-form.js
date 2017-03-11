Template.advisorsForm.onCreated(function(){
    this.searchableSelects = [
        {
            key:'school',
            display: 'School',
            placeholder: 'Full School Name (No acronyms please!)'
        },
        {
            key:'dept',
            display: 'Department',
            placeholder: 'Full Department Name (No acronyms please!)'
        },
    ];

    this.keyToCollectionsMap = {
        school: window.Schools,
        dept: window.Departments
    }

    this.searchableSelectsVariables = {};

    this.searchableSelects.forEach((s)=> {
        this.searchableSelectsVariables[s.key] = {
            search: new ReactiveVar(''),
            value: new ReactiveVar('')
        }
    });

    this.autorun(()=>{
        this.subscribe('schools:search', this.searchableSelectsVariables['school']['search'].get());
        this.subscribe('departments:search', this.searchableSelectsVariables['school']['value'].get(), this.searchableSelectsVariables['dept']['search'].get());
    });

    this.autorun(()=>{
        let advisor = Template.currentData().advisor;
        if(advisor) {
            this.searchableSelects.forEach((s) => {
                this.searchableSelectsVariables[s.key].search.set(advisor[s.key]),
                this.searchableSelectsVariables[s.key].value.set(advisor[s.key])
            });
        }
    });

});

Template.advisorsForm.helpers({
    searchableSelects() {
        return Template.instance().searchableSelects;
    },

    getObjectValue(obj, key) {
        if(typeof obj === 'object')
            return obj[key];
    },

    searchByKey(key) {
        let instance = Template.instance(); 
        return function() {
            return function(value = '') {
                instance.searchableSelectsVariables[key]['search'].set(value);
            }
        }
    },

    setByKey(key) {
        let instance = Template.instance(); 
        return function() {
            return function(doc){
                console.log(doc)
                if(!doc) return;
                instance.searchableSelectsVariables[key]['value'].set(doc.name);
            }
        }
    },

    optionsByKey(key) {
        let instance = Template.instance(); 
        let searchString = instance.searchableSelectsVariables[key]['search'].get();
        console.log(instance.searchableSelectsVariables[key])
        let collection = instance.keyToCollectionsMap[key];
        return collection.find({
            name: {
                $regex: searchString || '',
                $options : 'i'
            }
        }, {
            sort : {
                name: 1
            }
        });
    },

});

Template.advisorsForm.events({
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
            dept: form.dept.value,
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

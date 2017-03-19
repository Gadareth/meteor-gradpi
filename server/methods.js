Meteor.methods({
    // 'add_student'(profile, id){
    //  Students.update(
    //      { "_id": id },
    //      { "profile": profile, createdAt: new Date() },
    //      { upsert: true }
    //  );
    // },

    'advisors.insert' (formData) {
        console.log("advisors.insert", formData);
        let {
            firstName,
            lastName,
            school,
            university,
            department
        } = formData;

        if (Advisors.findOne({
                firstName,
                lastName,
                school,
                department
            })) {
            throw new Meteor.Error(`Advisor is already created!`);
        }

        let universityDoc = Universities.findOne({
            name: university
        });
        if (!universityDoc) {
            Universities.insert({
                name: university
            });
        }
        let schoolDoc = Schools.findOne({
            university,
            name: school,
        });
        if (!schoolDoc) {
            Schools.insert({
                name: school,
                university
            });
        }
        let departmentDoc = Departments.findOne({
            university,
            school,
            name: department
        });
        if (!departmentDoc) {
            Departments.insert({
                university,
                school,
                name: department
            });
        }

        formData.createdAt = new Date();
        formData.createdBy = Meteor.userId();

        return Advisors.insert(formData);
    },
    'advisors.rate' (advisorId, rating, free_response, additionalFields = {}) {
        const advisor = Advisors.findOne({
            "_id": advisorId
        });

        if (!advisor) {
            throw new Meteor.Error(`Not found advisor with id: ${id}!`)
        }

        if (!Meteor.userId()) {
            throw new Meteor.Error(`Access denied. Must be logged in!`)
        }

        let {
            stature,
            mentorship,
            autonomy,
            resources,
            tact
        } = rating;

        const owner = Meteor.userId();
        const oldRating = Ratings.findOne({
            owner,
            advisorId
        });

        if (oldRating) {
            Ratings.update(oldRating._id, {
                $set: {
                    stature,
                    mentorship,
                    autonomy,
                    resources,
                    tact,
                    free_response
                }
            });
            Ratings.update(oldRating._id, {
                $set: additionalFields
            });

            return oldRating._id;
        }

        let ratingId = Ratings.insert({
            advisorId,
            owner,
            stature,
            mentorship,
            autonomy,
            resources,
            tact,
            free_response
        });

        Ratings.update(ratingId, {
            $set: additionalFields
        });

        return ratingId;
    },


    'ratings.remove' (ratingId) {
        let rating = Ratings.findOne(ratingId);

        if(!rating) {
            throw new Meteor.Error(500, "Rating not found", 'Rating id ${ratingId}');
        }
        if (Meteor.userId() !== rating.owner && !Roles.isAdmin()) {
            throw new Meteor.Error(500, "You don't have permissions for this operation");
        }
        Ratings.remove(ratingId);
    },

    'ratings.update' (ratingId, formData) {
        if (!Roles.isAdmin()) {
            throw new Meteor.Error(500, "You don't have permissions for this operation");
        }

        Ratings.update(ratingId, {
            $set: formData
        });
    },

    'advisors.update' (advisorId, formData) {
        const advisor = Advisors.findOne(advisorId);
        if (!advisor) {
            throw new Meteor.Error(404, 'Advisor not found');
        }

        if (!Roles.isAdmin() && advisor.createdBy !== Meteor.userId()) {
            throw new Meteor.Error(500, "You don't have permissions for this operation");
        }

        Advisors.update(advisorId, {
            $set: formData
        });
    },

    'feedbacks.insert' (formData, captchaData) {
        const verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

        if (!verifyCaptchaResponse.success) {
            console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
            throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
        } else {
            console.log('reCAPTCHA verification passed!');
        }
        if (Meteor.userId()) {
            formData.userId = Meteor.userId();
        }

        const id = Feedbacks.insert(formData);

        let {
            fromName,
            fromEmail,
            title,
            message
        } = formData;

        let to = 'gradpi.app@gmail.com',
            from = `${fromName}<${fromEmail}>`;

        message = `From: ${fromName} <${fromEmail}> \n\n\n${message}`;
        message = formData.userId ? `From user with id: ${formData.userId} \n${message}` : message;


        Email.send({
            to: to,
            from: from,
            subject: title,
            text: message,
            replyTo: fromEmail
        });

        return id;
    },
    'sendBulkInvitations' (formData) {
        // Let other method calls from the same client start running
        // without waiting for the email sending to complete.
        let subject = 'Grad PI invitation';
        if (!formData.receivers || !formData.receivers.length) {
            throw new Meteor.Error(500, 'There is no invitation receivers');
        }

        let senderName = formData.senderName;
        if (!senderName) {
            if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) senderName = Meteor.user().profile.name;
            else {
                senderName = 'Anonymous';
            }
        }

        formData.receivers.forEach((r) => {
            let recieverName = r.name;
            let recieverEmail = r.email;
            let regexp = /@\S+\.edu/i;

            if (recieverEmail.search(regexp) == -1) {
                throw new Meteor.Error(`${recieverEmail}: Email domain must include .edu`);
            }

            let message = `Hi ${recieverName}!
            I just rated a PI at www.gradpi.com! Check out the site to learn more about PIs or rate a few!
            Cheers!
            ${senderName}`;

            Email.send({
                to: recieverEmail,
                from: senderName,
                subject,
                text: message
            });

        });


    },
    'inapropriateContentMessage' (advisorId,message) {
        let subject = 'Inappropriate content notification';
        let to = 'gradpi.app@gmail.com';
        let from = Meteor.userId();
        message = `From user with id: ${from};\nAdvisor Id: ${advisorId};\nMessage:\n${message}`;

        console.log(`Sending email: ${subject} \n ${message}`);

        Email.send({
            to,
            from,
            subject,
            text: message
        });
    },

    'universities.update'(query, formData) {
        let university = Universities.findOne(query);
        if(!university) return

        if(formData.name){
            Advisors.update({
                university: university.name
            }, {
                $set: {
                    university: formData.name
                }
            }, {
                multi: true
            });

            Schools.update({
                university: university.name
            }, {
                $set: {
                    university: formData.name
                }
            });

            Departments.update({
                university: university.name
            }, {
                $set: {
                    university: formData.name
                }
            }, {
                multi:true
            });
        }
        Universities.update(query, {
            $set: formData
        });
    },

    'schools.update'(query, formData) {
        let school = Schools.findOne(query);
        if(!school) return
        if(formData.name){
            Advisors.update({
                school: school.name
            }, {
                $set: {
                    school: formData.name    
                }
            }, {
                multi: true
            });
            Departments.update({
                school: school.name
            }, {
                $set: {
                    school: formData.name
                }
            }, {
                multi:true
            });
        }
        Schools.update(query, {
            $set: formData
        });

    },

    'departments.update'(query, formData) {
        let department = Departments.findOne(query);
        if(!department) return

        if(formData.name){
            Advisors.update({
                department: department.name
            }, {
                $set: {
                    department: formData.name    
                }
            }, {
                multi: true
            });
        }
        Departments.update(query, {
            $set: formData
        });
    }


    // 'clearDB'(pass) {
    //     if(pass === '9aGZCA27'){
    //         Meteor.users.remove({});
    //         Departments.remove({});
    //         Schools.remove({});
    //         Advisors.remove({});
    //         Images.remove({});
    //         Students.remove({});
    //         Ratings.remove({});
    //     }
    // }

});

/* User profile
Name, string
Personal Description, string
Education, array
Links, array
Proficiencies, array */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Apprentices } from '../../imports/collections.js';


let user_profile = {
  name: "Batsi Guthrie",
  description: " I am a Computer Science senior at SCSU and a current A100 apprentice. I am looking for part-time or full time work upon graduating on May 25, 2016.",
  education: [{
    school: 'Rensselaer Poly I',
    certificate: "B.S. Poetry"
  }]
  ,
  links: [{
    url: "https://github.com/guthriea",
    name: "Github"
  }, {
    url: "https://github.com/guthriea",
    name: "Github"
  }, {
    url: "https://github.com/guthriea",
    name: "Github"
  }],
  proficiencies: ['assets/gitlogo.png', 'assets/html_css3.png','assets/JSlogo.png']
}

Template.apprenticeProfileCopy.onCreated(function bodyOnCreated() {
  Meteor.subscribe('apprentices',function () {
    console.log(Apprentices.find().count());

    if(Apprentices.find().count() == 0) {
      // console.log(user_profile);
      Meteor.call('add_apprentice', user_profile);
    }
  })
});

Template.apprenticeProfileCopy.onRendered(function(){
  console.log(Apprentices.find().count());
});

Template.apprenticeProfileCopy.helpers({
  // profile: function(){
  //   return 0;
  // },

  find_apprentices() {
      return Apprentices.find({});
    }
});

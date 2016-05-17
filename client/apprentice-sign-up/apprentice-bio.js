Template.studentBio.events({
  'submit #apprenticeBio': function(event, template) {

    event.preventDefault();

    // Summary
    const summary = template.find('#summary').value;

    // Cohort
    // let cohort = '';
    //
    // const newhaven = template.find('#newhaven').checked;
    // const hartford   = template.find('#hartford').checked;
    //
    // if (newhaven == true) {
    //   cohort = 'New Haven';
    // }
    // else if (hartford == true) {
    //   cohort = 'Hartford';
    // }

    // Availability
    const partTime = template.find('#partTime').checked;
    const fullTime = template.find('#fullTime').checked;
    const internship = template.find('#internship').checked;

    let availability = [];

    if (partTime == true) {
      availability.push('Part-time');
    }
    if (fullTime == true) {
      availability.push('Full-time');
    }
    if (internship == true) {
      availability.push('Internship');
    }

    // Education
    const education = template.find('#education').value;
    const education2 = template.find('#education2').value;

    // GitHub
    const gitHub = template.find('#gitHub').value;

    // LinkedIn
    const linkedIn = template.find('#linkedIn').value;

    // Proficiencies
    const git = template.find('#git').checked;
    const htmlcss = template.find('#htmlcss').checked;
    const javascript = template.find('#javascript').checked;
    const meteor = template.find('#meteor').checked;
    const mongo = template.find('#mongo').checked;
    const nodeJS = template.find('#nodeJS').checked;
    const java = template.find('#java').checked;
    const ruby = template.find('#ruby').checked;
    const rubyOnRails = template.find('#rubyOnRails').checked;
    const cPlusPlus = template.find('#cPlusPlus').checked;
    const cSharp = template.find('#cSharp').checked;
    const drupal = template.find('#drupal').checked;

    let proficiencies =[];

    if (git == true) {
      proficiencies.push(' GitHub');
    }
    if (htmlcss == true) {
      proficiencies.push(' HTML & CSS');
    }if (javascript == true) {
      proficiencies.push(' Javascript');
    }if (meteor == true) {
      proficiencies.push(' Meteor');
    }if (mongo == true) {
      proficiencies.push(' MongoDB');
    }if (nodeJS == true) {
      proficiencies.push(' NodeJS');
    }if (java == true) {
      proficiencies.push(' Java');
    }if (ruby == true) {
      proficiencies.push(' Ruby');
    }if (rubyOnRails == true) {
      proficiencies.push(' Ruby on Rails');
    }if (cPlusPlus == true) {
      proficiencies.push(' C++');
    }if (cSharp == true) {
      proficiencies.push(' C#');
    }if (drupal == true) {
      proficiencies.push(' Drupal');
    }


    // Create apprentice JSON document
    const newApprentice = {
    // cohort: cohort,
    summary: summary,
    availability: availability,
    education: education,
    education2: education2,
    gitHub: gitHub,
    linkedIn: linkedIn,
    proficiencies: proficiencies
    }
    console.log(newApprentice);

    Meteor.call('add_apprentice', newApprentice);
    // alert(`Added: ${newApprentice}`);

    // Router.go('/apprentice-profile-copy')
  }
});

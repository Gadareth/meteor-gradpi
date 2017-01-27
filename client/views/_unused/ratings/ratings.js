Template.ratings.onRendered(function() {
    let advisor = Advisors.findOne({
        _id: FlowRouter.getParam('id')
    });
    let overall_ratings = {};

    //Compute average stature rating
    let s_overall = advisor.stature;
    let sum = 0;
    for (let i = 0; i < s_overall.length; i++) {
        sum += s_overall[i];
    }
    if (s_overall.length > 0) {
        s_overall = sum / s_overall.length;
    } else {
        s_overall = 0;
    }
    sum = 0;

    //Compute average mentorship rating
    let m_overall = advisor.mentorship;
    for (let i = 0; i < m_overall.length; i++) {
        sum += m_overall[i];
    }
    if (m_overall.length > 0) {
        m_overall = sum / m_overall.length;
    } else {
        m_overall = 0;
    }
    sum = 0;

    //Compute average autonomy rating
    let a_overall = advisor.autonomy;
    for (let i = 0; i < a_overall.length; i++) {
        sum += a_overall[i];
    }
    if (a_overall.length > 0) {
        a_overall = sum / a_overall.length;
    } else {
        a_overall = 0;
    }
    sum = 0;

    //Compute average resources rating
    let r_overall = advisor.resources;
    for (let i = 0; i < r_overall.length; i++) {
        sum += r_overall[i];
    }
    if (r_overall.length > 0) {
        r_overall = sum / r_overall.length;
    } else {
        r_overall = 0;
    }
    sum = 0;

    //Compute average resources rating
    let t_overall = advisor.tact;
    for (let i = 0; i < t_overall.length; i++) {
        sum += t_overall[i];
    }
    if (t_overall.length > 0) {
        t_overall = sum / t_overall.length;
    } else {
        t_overall = 0;
    }
    sum = 0;

    overall_ratings = {
        s: Math.round(s_overall),
        m: Math.round(m_overall),
        a: Math.round(a_overall),
        r: Math.round(r_overall),
        t: Math.round(t_overall)
    };

    for (prop in overall_ratings) {
        document.getElementById(prop + "star-" + overall_ratings[prop]).click();
        console.log(document.getElementById(prop + "star-" + overall_ratings[prop]));
    }
});
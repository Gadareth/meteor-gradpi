Meteor.methods({
    migrateToLatest : function() {
        Migrations.migrateTo('latest');
    }
});

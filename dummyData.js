var db = require("./models");

module.exports = function () { 

    db.Person.create({
        username: 'august',
        userEmail: 'august.conwell@gmail.com',
        fullName: 'August Conwell'
    });

    db.Person.create({
        username: 'jimmy',
        userEmail: 'jim@gmail.com',
        fullName: 'Jim Jonwell'
    });

    db.Tag.create({ tag: 'outdoors' });
    db.Tag.create({ tag: 'travel' });
    db.Tag.create({ tag: 'adventure' });
    db.Tag.create({ tag: 'food' });
    db.Tag.create({ tag: 'social' });

    db.Activity.create({
        PersonId: 1,
        itemName: 'Meet a famous person',
        description: 'I want to meet a famous person... Like, any famous person. Help me meet a famous person.',
        location: 'Washington, DC',
        TagId: 5
    }).then(function (dbActivity) { 
        db.TagActivity.create({
            ActivityId: dbActivity.id,
            TagId: 5
        });
        db.JoinedActivity.create({
            ActivityId: dbActivity.id, PersonId: 1
        });
    });



    db.Activity.create({
        PersonId: 1,
        itemName: 'Eat a Nathan\'s Hot Dog',
        description: 'I heard they are so good! Like, unbelievable. Lets go to the Big Apple and eat a Big Hotdog!',
        location: 'New York, NY',
        TagId: 4
    }).then(function (dbActivity) { 
        db.TagActivity.create({
            ActivityId: dbActivity.id,
            TagId: 4
        });
        db.TagActivity.create({
            ActivityId: dbActivity.id,
            TagId: 5
        });
        db.JoinedActivity.create({
            ActivityId: dbActivity.id, PersonId: 1
        });
    });

    db.Activity.create({
        PersonId: 2,
        itemName: 'See the Grand Canyon',
        description: 'My friends said it wasn\'nt so big, but I don\'t believe them',
        location: 'Arizona',
        tagId: 2
    }).then(function (dbActivity) { 
        db.TagActivity.create({
            ActivityId: dbActivity.id,
            TagId: 2
        });
        db.JoinedActivity.create({
            ActivityId: dbActivity.id, PersonId: 2
        });
    });
}
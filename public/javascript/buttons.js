$(document).ready(function () { 

  //join activity not as creator: Add ids to person activity table
  $(".join-activity").click(function (e) {
    console.log(this);
    var self = this;
    e.preventDefault();
    var activityId = $(this).data('id');
    var userId = $('#user-id').data('userid');
    $.post("/api/personactivity", { ActivityId: activityId, PersonId: userId}, function (result) {
      console.log(result);
      $(self).html('Joined!');
      $(self).attr('disabled', 'disabled');
    });
  });

  //leave activity not as creator: destory row in activity table 
  $(".leave-activity").click(function (e) {
    e.preventDefault();
    $.post("/api/personactivity/leave", { ActivityId: req.body.ActivityId, PersonId: req.body.PersonId }, function (result) {
      console.log(result);
    });
  });

  //edit activity as creator
  $(".edit-activity").click(function (e) {
    e.preventDefault();
    $.get("/api/activity/edit/:id", { where: { ActivityId: req.params.ActivityId } }, function (result) {
      console.log(result);
      // open the modal
      // populate fields to edit with the result
      // html put (with method override)
    });
  });

  //reopen activity as creator
  $(".reopen-activity").click(function (e) {
    e.preventDefault();
    $.get("/api/activity/reopen/:id", { where: { ActivityId: req.params.ActivityId } }, function (result) {
      console.log(result);
    });
  });

  // //Browse all activities
  // $("#browse-all-activity").click(function (e) {
  //   e.preventDefault();
  //   console.log('hello');
  //   $.get("/allactivities", function (result) {
  //     console.log(result);
  //   });
  // });

  //Browse activities by tag
  $("#browse-tag-activity").click(function (e) {
    e.preventDefault();
    console.log(req.body);
    $.post("/api/allactivities/:tag", { ActivityId: req.body.ActivityId, PersonId: req.body.PersonId }, function (result) {
      console.log(result);
    });
  });
})
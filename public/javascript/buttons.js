$(document).ready(function () {

  //join activity not as creator: Add ids to person activity table
  $(".join-activity").click(function (e) {
    console.log(this);
    var self = this;
    e.preventDefault();
    var activityId = $(this).data('id');
    var userId = $('#user-id').data('userid');
    $.post("/api/personactivity", { ActivityId: activityId, PersonId: userId }, function (result) {
      console.log(result);
      $(self).html('Joined!');
      $(self).attr('disabled', 'disabled');
    });
  });

  //leave activity not as creator: destory row in activity table 
  $(".leave-activity").click(function (e) {
    e.preventDefault();
    $.post("/api/personactivity/leave", function (result) {
      console.log(result);
    });
  });

  //edit activity as creator
  $(".edit-activity").click(function (e) {
    e.preventDefault();
    var queryUrl = "/api/activity/edit/" + $(this).data('activityid');
    $.get(queryUrl, function (result) {
      console.log(result);
      $('.tag').prop('checked', false);
      // populate fields to edit with the result
      $('#edit-name').val(result.itemName);
      $('#edit-location').val(result.location);
      $('#edit-description').val(result.description);
      result.TagActivities.forEach(function (tag) { 
        console.log(tag);
        $('#tag-' + tag.TagId).prop('checked', true);
      })
      
      // open the modal
      $('#edit-modal').show()
      // html put (with method override)
      $('#edit-activity-form').attr('action', queryUrl + '?_method=PUT');
    });
  });

  //reopen activity as creator
  $(".reopen-activity").click(function (e) {
    e.preventDefault();
    $.get("/api/activity/reopen/:id", { where: { ActivityId: req.params.ActivityId } }, function (result) {
      console.log(result);
    });
  });

  //Browse activities by tag
  $(".search").click(function (e) {
    e.preventDefault();
    console.log(e);
    console.log(this);
    $.get("/allactivities/one", function (result) {
      console.log(result);
    });
  });
})
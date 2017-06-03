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


  $(".leave-activity").click(function (e) {
    e.preventDefault();
    var section = $(this).parent().children(".activity-name").html();
    var itemName = $(this).parent().children(".activity-name").html();
    var location = $(this).parent().children(".activity-location").html();
    var description = $(this).parent().children(".activity-description").html();
    var personId = $("#user-id").attr('data-userid');
    var activityId = $(this).parent().children(".activityId").attr('id');
    console.log(personId);
    console.log(itemName);
    console.log(location);
    console.log(description);
    console.log(activityId);
    $('#leave-activity-form').attr('action', '/api/personactivity/leave/' + activityId + '/' + personId + '?method=DELETE');
    $('#exit-modal').show();
    // $("#leave").css('display', 'inline');
    // var url = "/api/personactivity/leave/" + activityId + "/" + personId;
    // console.log(url);
    // $.ajax({
    //   url: url,
    //   type: 'DELETE',
    //   success: function () {
    //     window.location.replace('/profile?key=id&val=' + personId);
    //   }
    // });
  });

  //edit activity as creator
  $(".edit-activity").click(function (e) {
    e.preventDefault();
    var queryUrl = "/api/activity/edit/" + $('.activityId').attr('id');
    console.log(queryUrl);
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
    console.log(this.id);
    var tagId = this.id;
    console.log(tagId);
    var profile = $("#user-id").attr('data-userid');
    var url = "/allactivities/" + tagId + "?key=id&id=" + profile;
    console.log(url);
    console.log($("#user-id").attr('data-userid'));
    console.log($(location).attr('href'));
    $.get(url, function (result) {
      console.log(result);
      window.location.replace(url);
    });
  });
});

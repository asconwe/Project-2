//Open modal
$(document).ready(function () {
  $("#modal-button").click(function () {
    $("#modal").css('display', 'inline');
  });

  $("#browse-tag-activity").click(function () {
    $("#modal2").css('display', 'inline');
    // console.log("success")
  });

  //Close modal
  $("#close").click(function () {
    $(".modal").css('display', 'none');
  });

  // //enter data into tables
  // $("#signupform").submit(function (e) {
  //   e.preventDefault();
  //   var userEmail = $("#userEmail").val().trim();
  //   var fullName = $("#fullName").val().trim();
  //   var username = $("#username").val().trim();

  //   console.log(userEmail);
  //   console.log(fullName);
  //   console.log(username);

  //   $.post("/api/user/new", { userEmail: userEmail, fullName: fullName, username: username }, function (result) {
  //     console.log(result);
  //   });
  // });

  // $("#addactivityform").submit(function (e) {
  //   e.preventDefault();
  //   var itemName = $("#activity").val().trim();
  //   var tags = $("#tags").val().trim();
  //   var location = $("#location").val().trim();
  //   var description = $("#description").val().trim();
  //   var PersonId = $(".username").data("id");

  //   console.log(itemName);
  //   console.log(tags);
  //   console.log(location);
  //   console.log(description);
  //   console.log(PersonId);

  //   $.post("/api/activity/new", { PersonId: PersonId, itemName: itemName, tags: tags, location: location, description: description, complete: false }, function (result) {
  //     console.log(result);
  //   });
  // });

});

//Open modal
$(document).ready(function () {
  $("#modal-button").click(function () {
    $("#modal").css('display', 'block');
  });

  //Close modal
  $("#close").click(function () {
    $("#modal").css('display', 'none');
  });

  //enter data into tables
  $("#signupform").submit(function (e) {
    e.preventDefault();
    var userEmail = $("#userEmail").val().trim();
    var fullName = $("#fullName").val().trim();
    var username = $("#username").val().trim();
    console.log(userEmail);
    console.log(fullName);
    console.log(username);

    $.post("/api/user/new", { userEmail: userEmail, fullName: fullName, username: username }, function (result) {
      console.log(result);
    });
  });

});

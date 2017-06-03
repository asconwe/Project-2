//Open modal
$(document).ready(function () {
  $("#modal-button").click(function () {
    $("#modal").css('display', 'inline');
  });

  $("#browse-tag-activity").click(function () {
    $("#modal2").css('display', 'inline');
    // console.log("success")
  });

 
  $(".leave-activity").click(function () {
    // $("#leave").css('display', 'inline');
    // console.log("success")
  });

  //Close modal
  $(".close").click(function () {
    $(".modal").css('display', 'none');
  });

  
});

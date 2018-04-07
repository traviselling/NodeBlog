$(document).ready(function(){
  $('.smarty').animate({
      left:"0px"
  },2000, "linear");

  $(".welcome").animate({
      fontSize : "5rem"
  },6000);

  $('.info').fadeIn(9000);
  $;

  $(".logo").click(function(){
    if ($('#nav').display !== "none") {
      $("#nav").slideToggle("fast");

    }
  });
  console.log(document);


});

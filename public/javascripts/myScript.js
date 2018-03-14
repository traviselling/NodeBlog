$(document).ready(function(){
  $('.smarty').animate({
      left:"0px"
  },2000, "linear");
  
  // $('h1').animate({
  //     fontSize : "2em"
  // },3000);
  $(".welcome").animate({
      fontSize : "5rem"
  },6000);

  $('.info').fadeIn(9000);
  $('.contactHeader').animate({
      fontSize : "2em"
  },3000);
  $('.formWrapper').animate({
      right:"0px"
  },2000, "linear");
  $('.aboutSectionHeader').animate({
      fontSize:"4em"
  },3000);

$(".logo").click(function(){
  if ($('#nav').display !== "none") {
    $("#nav").slideToggle("slow");
    $("#mainWindow").toggleClass("col-md-12");
    $("#mainWindow").toggleClass("col-md-9");
      if(  $(".logo img").css('height')=== "150px"){
          $(".logo img").css('height','100px');
      }else if($(".logo img").css('height')=== "100px"){
          $(".logo img").css('height','150px');
      }
  }
});


});

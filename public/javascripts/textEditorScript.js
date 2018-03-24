$(document).ready(function(){
  $("#previewBtn").click(function(){
    var content = $('.textArea').val();
    var title = $('#title').val();
    var category = $('#category').val();
    var author = $('#author').val();
    $('#previewWindow').append("<h3 class='previewTitle'>" + title + "</h3><p class='previewAuthor'><span class='authorSpan'> written by </span>"+ author + "<p class='previewCategory'>in "+ category + "</p><div class='divider'></div><p class='previewText'>" + content + "</p>");
  });
});

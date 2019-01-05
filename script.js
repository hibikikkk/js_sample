$(function(){
  var q = ""
  var page = 1

  //urlのパラメータを取得する
  if(location.href.indexOf("search_result.html") !== -1){
    var url = location.href;
    params = [url.split("?")[1]];
    if(params.indexOf("&") == -1){
      params = params[0].split("&");
    };

    for(items of params){
      if(items.indexOf("q=") >= 0){
        q = items.split("=")[1];
      };

      if(items.indexOf("page=") >= 0){
        page = items.split("=")[1];
      };
    };

    if(q !== ""){
      searching();
    };
  };

  $(".search").submit(function(){
    $('form').attr('action', "./search_result.html?q=" + $('#query').val());
    $('form').submit();
  });

  // $(window).on('scroll', function(){
  //   var docHeight = $(document).innerHeight(), //ドキュメントの高さ
  //   windowHeight = $(window).innerHeight(), //ウィンドウの高さ
  //   pageBottom = docHeight - windowHeight; //ドキュメントの高さ - ウィンドウの高さ
  //   if(pageBottom <= $(window).scrollTop() && $(".load").css("display") == "block") {
  //     //ウィンドウの一番下までスクロールした時に実行
  //     add_load();
  //   }
  // });

  $('.load').on('inview', function(event,isInView) {
    //ブラウザの表示域に表示されたときに実行する処理
    if(isInView){
      add_load();
    };
  });

  function searching(){
    $.getJSON("https://niconico-rank-search-api.herokuapp.com/search?callback=?",
    {
      q: q,
      page: page
    },
    function(json){
      page = Number(json["page_number"]) + 1
      q = decodeURI(json.query);
      $("#search_query").text(q)

      if($('.item').length){
        $(".item").remove();
      }

      for(var result of json.result){
        $('.videos').append(
          "<div class='video'><div class='thumbs'><p class='timestamp'>"+ result.timestamp +"</p><a href='" + result.url + "'><img class='thumbnail' src='" + result.thumb + "' alt='サムネイル'/></a></div><div class='video-info'><a href='"+ result.url+"'><h3>" + result.title + "</h3></a><p class='description'>" + result.description + "</p><ul class='list'><li class='count view'>再生数 " + result.views + "</li><li class='count comment'>コメント数 "+ result.comment +"</li><li class='count mylist'>マイリスト "+ result.mylist +"</li></ul></div></div>"
        );
      };
      $(".load").css("display","block");
    });
  };

  function add_load(){
    $.getJSON("https://niconico-rank-search-api.herokuapp.com/search?callback=?",
    {
      q: q,
      page: page
    },
    function(json){
      page = Number(json["page_number"]) + 1
      q = decodeURI(json.query);
      $("#search_query").text(q)

      for(var result of json.result){
        $('.videos').append(
          "<div class='video'><div class='thumbs'><p class='timestamp'>"+ result.timestamp +"</p><a href='" + result.url + "'><img class='thumbnail' src='" + result.thumb + "' alt='サムネイル'/></a></div><div class='video-info'><a href='"+ result.url+"'><h3>" + result.title + "</h3></a><p class='description'>" + result.description + "</p><ul class='list'><li class='count view'>再生数 " + result.views + "</li><li class='count comment'>コメント数 "+ result.comment +"</li><li class='count mylist'>マイリスト "+ result.mylist +"</li></ul></div></div>"
        );
      };
    }
  )};
});

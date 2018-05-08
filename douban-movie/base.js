$('footer>div').on('click', function () {
  var index = $(this).index();
  $('section').hide().eq(index).fadeIn();
  $(this).addClass('active').siblings().removeClass("active");
})
$('.ranking-header>div').on('click', function () {
  var index = $(this).index();
  console.log(index);
  $('.ranking-sub').hide().eq(index).fadeIn();
  $(this).addClass('active').siblings().removeClass("active");
})
$('#footer-search').on('click', function () {
  $('.ranking-header').hide()
})
$('#footer-ranking').on('click', function () {
  $('.ranking-header').show()
})

var reqStart = 0
var isloading = false //避免重复请求
start()

function start() {
  if (isloading) {
    return
  }
  isloading = true
  $('.loading').show();
  $.ajax({
    url: "https://api.douban.com/v2/movie/top250",
    type: "GET",
    data: {
      start: reqStart,
      count: 20
    },
    dataType: 'jsonp'
  }).done(function (ret) {
    console.log(ret)
    setData(ret)
    reqStart += 20
  }).fail(function () {
    console.log('error')
  }).always(function () {
    isloading = false
    $('.loading').hide()
  })
}
// 节流
var clock
$('main').scroll(function () {
  if (clock) {
    clearTimeout(clock)
  }
  if(reqStart<=240){
  clock = setTimeout(function () {
    if ($('section').eq(0).height().toFixed(0) == ($('main').scrollTop() + $('main').height()).toFixed(0)) {
      start() 
    }
  }, 300)
}})

function setData(data) {
  // 用字符串拼接的方式，容易发生XSS攻击，如<script>alert(1)</script>，会读取操作
  // 直接创建节点，内容作为text设置。
  data.subjects.forEach(function (movie) {
    var template = `<div class="item">
    <a href="#">
      <div class="cover-image">
        <img src='https://img3.doubanio.com/view/photo/l/public/p2452075545.webp'>
      </div>
      <div class="movie-instruction">
        <h2 class="movie-name"></h2>
        <div class="detail">
        <span class="stars"></span>
        <span class="stars"></span>
        <span class="stars"></span>
        <span class="stars"></span>
        <span class="stars"></span>
        <span class="score"></span></div>
        <div class="detail"><span class="tabs"></span></div>
        <div class="detail">导演：<span class="directors"></span></div>
        <div class="detail">主演：<span class="actors"></span></div>
      </div>
    </a>
  </div>`

    var $node = $(template)
    $node.find('.cover-image img').attr('src', movie.images.medium)
    $node.find('.movie-instruction h2').text(movie.title)
    $node.find('.detail .score').text(movie.rating.average)
    var starNum = movie.rating.average
    var node = $node.find('.detail .stars')
    rating(node, starNum)
    $node.find('.detail .tabs').text(function () {
      var tabsArr = [];
      movie.genres.forEach(function (item) {
        tabsArr.push(item);
      })
      return tabsArr.join('/');
    })
    $node.find('.detail .directors').text(function () {
      var directorsArr = [];
      movie.directors.forEach(function (item) {
        directorsArr.push(item.name);
      })
      return directorsArr.join('/')
    })
    $node.find('.detail .actors').text(function () {
      var actorsArr = [];
      movie.casts.forEach(function (item) {
        actorsArr.push(item.name);
      })
      return actorsArr.join('/');
    })
    $('.container-ranking-top250').append($node)
  })

  function rating(node, num) {
    // star评分
    var starsArr = []
    var numRound = Math.round(num);
    var numFloat = numRound / 2;
    var numSplit = numFloat.toString().split('.');
    var i, j, k;
    var starFull = Math.floor(numSplit[0]);
    var starHalf;
    if (numSplit[1] > 0) {
      starHalf = 1;
    } else {
      starHalf = 0
    }
    var starBlank = 5 - starFull - starHalf;
    for (i = 0; i < starFull; i++) {
      node.eq(i).attr("class", "starFull")
    }
    j = i;
    if (starHalf == 1) {
      node.eq(j).attr("class", "starHalf")
      k = j + 1;
    } else {
      k = j;
    }
    for (k; k < 5; k++) {
      node.eq(k).attr("class", "starBlank")
    }
    for (var n = 0; n < starsArr.length; n++) {
      node.append(starsArr[n]);
    }
    return node;
  }
}
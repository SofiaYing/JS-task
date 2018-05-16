var app = {
  //避免全局变量污染
  init: function () { //初始化
    this.$footerTabs = $('footer>div');
    this.$panels = $('section');

    this.$rankingHeader = $('.ranking-header');
    this.$rankingHeaderDiv = $('.ranking-header>div');
    this.$footerSearch = $('#footer-search');
    this.$footerRanking = $('#footer-ranking');
    this.$rankingSub = $('.ranking-sub');
    this.$main = $('main')

    this.bind();
    top250.init();
    na.init();
    search.init();
  },
  bind: function () { //为初始化绑定一些事件
    var _this = this;
    this.$footerTabs.on('click', function () {
      var index = $(this).index();
      $(this).addClass('active').siblings().removeClass('active');
      _this.$panels.hide().eq(index).fadeIn();
    })
    this.$rankingHeaderDiv.on('click', function () {
      var index = $(this).index();
      _this.$rankingSub.hide().eq(index).fadeIn();
      $(this).addClass('active').siblings().removeClass("active");
    })
    this.$footerSearch.on('click', function () {
      _this.$rankingHeader.hide()
    })
    this.$footerRanking.on('click', function () {
      _this.$rankingHeader.show()
    })
  }
}

var top250 = {
  init: function () {
    this.$rankingTop = $('.top250')

    this.isLoading = false
    this.isFinish = false
    this.reqStart = 0
    this._start()
    this.bind()
  },
  bind: function () {
    var _this = this
    var clock
    this.$rankingTop.scroll(function () {
      if (clock) {
        clearTimeout(clock)
      }
      clock = setTimeout(function () {
        if (_this.isToBottom()) {
          _this._start()
        }
      }, 300)

    })
  },
  _start: function () {
    var _this = this
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    if (_this.isLoading || _this.isFinish) {
      return
    }
    _this.isLoading = true
    _this.$rankingTop.find('.loading').show();
    $.ajax({
      url: "https://api.douban.com/v2/movie/top250",
      data: {
        start: _this.reqStart || 0
      },
      dataType: 'jsonp'
    }).done(function (req) {
      console.log(req)
      _this.reqStart += 20
      if (_this.reqStart >= req.total) {
        _this.isFinish = true
      }
      callback && callback(req)
      //https://segmentfault.com/q/1010000003839457/a-1020000003839462
    }).fail(function () {
      console.log('数据异常！')
    }).always(function () {
      _this.isLoading = false
      _this.$rankingTop.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
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
      _this.rating(node, starNum)
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
      _this.$rankingTop.find('.container-ranking-top250').append($node)
    })
  },
  isToBottom: function () {
    return this.$rankingTop.find('.container-ranking-top250').height() <= this.$rankingTop.height() + this.$rankingTop.scrollTop() + 10
  },
  rating: function (node, num) {
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

var na = {
  init: function () {
    this.$rankingNa = $('.na')
    this._start()
  },
  _start: function () {
    var _this = this
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    _this.$rankingNa.find('.loading').show();
    $.ajax({
      url: "https://api.douban.com/v2/movie/us_box",
      dataType: 'jsonp'
    }).done(function (req) {
      console.log(req)
      callback && callback(req)
    }).fail(function () {
      console.log('数据异常！')
    }).always(function () {
      _this.$rankingNa.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    // 用字符串拼接的方式，容易发生XSS攻击，如<script>alert(1)</script>，会读取操作
    // 直接创建节点，内容作为text设置。
    data.subjects.forEach(function (movie) {
      movie = movie.subject
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
      _this.rating(node, starNum)
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
      _this.$rankingNa.find('.container-ranking-na').append($node)
    })
  },
  rating: function (node, num) {
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

// var search = {
//   init: function () {
//     this.$search = $('.search-input')
//     this.keyword = ''
//     this.$searchSec = $('.search')
//     this.bind()
//   },
//   bind: function () {
//     var _this = this;
//     this.$search.find('input').keydown(function (event) {
//       if(event.keyCode == 13){
//       _this.keyword = _this.$search.find('input').val();
//       _this._start()
//     }
//     })
//   },
// }
var search = {
    init: function () {
      this.$search = $('.search-input')
      this.keyword = ''
      this.$searchSec = $('.search')
      this.$footerRanking = $('#footer-ranking')
      this.$panels = $('section');
      this.$footerSearch = $('#footer-search');
     // this.$footerTabs = $('footer>div');
     this.$rankingHeader = $('.ranking-header');
      this.bind()
    },
    bind: function () {
      var _this = this;
      this.$search.find('input').keydown(function (event) {
        if(event.keyCode == 13){
          if(_this.$footerRanking.hasClass('active')){
           // var index = _this.$footerTabs.index();
            _this.$footerSearch.addClass('active').siblings().removeClass('active');
            _this.$panels.hide().eq(1).fadeIn();
            _this.$rankingHeader.hide();
          }
        _this.keyword = _this.$search.find('input').val();
        _this.$searchSec.empty();
        _this._start()
      }
      })
    },
    _start: function () {
      var _this = this;
      this.getData(function (data) {
        _this.render(data)
      })
    },
    getData: function (callback) {
      var _this = this
      $.ajax({
        url: 'http://api.douban.com/v2/movie/search',
        data: {
          q: _this.keyword
        },
        dataType: 'jsonp'
      }).done(function (req) {
        callback && callback(req)
      }).fail(function () {
        console.log('数据异常!')
      }).always(function () {

      })
    },
    render: function(data){
      var _this = this
      data.subjects.forEach(function(movie){
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
        _this.rating(node, starNum)
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
        _this.$searchSec.append($node)
      })
    },
    rating: function (node, num) {
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

    app.init()
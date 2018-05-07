var app = {
  init : function(){
    var $footerTabs = $('footer>div');
    var $panels = $('section');
    this.bind();
    ranking.init();
    search.init();
  },
  bind : function(){
    var _this = this;
    this.$footerTabs.on('click',function(){
      $(this).addClass('active').siblings().removeClass('active');
      _this.$panels.eq($(this).index()).fadeIn().siblings.hide();
    })
  }
}

var ranking = {
  init : function(){
    var $
  },
  bind :function(){

  }
}

var top250 = {
  init : function(){

  }
}

var search = {
  init : function(){

  },
  bind :function(){

  }
}

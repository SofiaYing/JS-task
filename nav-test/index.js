$(function(){
  var $li = $('.nav-li');
  var $select = $('.selected');
  var $dropdownNewsR = $('.dropdown-newsletter-header-right')
  var $dropdownNewsUl = $('.dropdown-newsletter-ul')
  var $dropdownNewsLi = $('.dropdown-newsletter-ul li')
  var dropNewsflag = false;
  
  function ulHide(){
    $dropdownNewsUl.css({'height':0,'border-width':0});
    dropNewsflag=false;
  }
  function ulShow(){
    $dropdownNewsUl.css({'height':190,'border-width':1,'border-top':'none'});
    dropNewsflag=true;
  }
  //nav滑块效果
  $(function(){
    if($li.hasClass('selected')){
      $select.find('span').addClass('active');
      var currentleft = $('.active').position().left+'px';
      var currentwidth = $('.active').css('width');
      $('.lamp').css({'left':currentleft,'width':currentwidth});
    }
  })
  
  $li.on('click',function(){
    $li.removeClass('selected');
    $li.find('span').removeClass('active');
    $(this).addClass('selected');
    $(this).find('span').addClass('active');
    var currentleft = $('.active').position().left+'px';
    var currentwidth = $('.active').css('width');
    $('.lamp').css({'left':currentleft,'width':currentwidth});
  })
  
  $li.hover(function(){
    $li.find('span').removeClass('active');
    $(this).find('span').addClass('active');
    var currentleft = $('.active').position().left+'px';
    var currentwidth = $('.active').width()+'px';
    $('.lamp').css({'left':currentleft,'width':currentwidth});
  },function(){
    $li.find('span').removeClass('active');
    $('.nav-ul').find('.selected').find('span').addClass('active');
    var currentleft = $('.active').position().left+'px';
    var currentwidth = $('.active').width()+'px';
    $('.lamp').css({'left':currentleft,'width':currentwidth});
    }
  )
  //dropdown展示和隐藏
  $dropdownNewsR.on('click',function(e){
    console.log($dropdownNewsUl.css('height'));
    if(dropNewsflag==false){
      e.stopPropagation();
      ulShow();
    }
    else{
      e.stopPropagation();
      ulHide();
    }
  })
  $dropdownNewsLi.hover(function(){
    $(this).addClass('render');
  },function(){
    $(this).removeClass('render');
  })
  $dropdownNewsLi.on('click',function(){
    $('.dropdwon-newsletter-header-text').text($(this).find('span').text());
    ulHide();
  })
  $(document).on('click',function(e){
    e.stopPropagation();
    if(dropNewsflag){
      ulHide();
    }
  });
});

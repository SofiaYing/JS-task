// $('.tabs').each(function(index,element){
//   $(element).find('ul').children('li').eq(0).addClass('active');
//   $(element).children('.tabs-content').children('div').eq(0).addClass('active');
// })
// $('.tabs').on('click','ul>li',function(e){
//   var $li = $(e.currentTarget);
//   $li.addClass('active').siblings().removeClass('active');
//   var index = $li.index();
//   var $content = $li.closest('.tabs').find('.tabs-content>div').eq(index);
//   $content.addClass('active').siblings().removeClass('active');
// })

//面向对象封装
// function Tabs(selector){
//   this.elements = $(selector);
//   this.elements.each(function(index,element){
//     $(element).find('ul').children('li').eq(0).addClass('active');
//     $(element).children('.tabs-content').children('div').eq(0).addClass('active');
//   })
//   this.elements.on('click','ul>li',function(e){
//     var $li = $(e.currentTarget);
//     $li.addClass('active').siblings().removeClass('active');
//     var index = $li.index();
//     var $content = $li.closest('.tabs').find('.tabs-content>div').eq(index);
//     $content.addClass('active').siblings().removeClass('active');
//   })
// }

//面向对象封装优化
// function Tabs(selector){
//   this.elements = $(selector);
     //new的时候this.__proto__ == Tabs.prototype，可以访问init()
     //先声明elements,再调用init(),所以init()可以访问elements
//   this.init();
//   this.bindEvents();
// }
// Tabs.prototype.init=function(){
//   this.elements.each(function(index,element){
//     $(element).find('ul').children('li').eq(0).addClass('active');
//     $(element).children('.tabs-content').children('div').eq(0).addClass('active');
//   })
// }
// Tabs.prototype.bindEvents = function(){
//   this.elements.on('click','ul>li',function(e){
//     var $li = $(e.currentTarget);
//     $li.addClass('active').siblings().removeClass('active');
//     var index = $li.index();
//     var $content = $li.closest('.tabs').find('.tabs-content>div').eq(index);
//     $content.addClass('active').siblings().removeClass('active');
//   })
// }

// ES6 class封装
class Tabs{
  constructor(selector){
    this.elements = $(selector);
    this.init();
    this.bindEvents();
  }
  init(){
    this.elements.each(function(index,element){
      $(element).find('ul').children('li').eq(0).addClass('active');
      $(element).children('.tabs-content').children('div').eq(0).addClass('active');
    })
  }
  bindEvents(){
    this.elements.on('click','ul>li',function(e){
      var $li = $(e.currentTarget);
      $li.addClass('active').siblings().removeClass('active');
      var index = $li.index();
      //不能从外面向内找，因为可能存在多个tabs，如$('.tabs').find('.tabs-content>div').eq(index);
      var $content = $li.closest('.tabs').find('.tabs-content>div').eq(index);
      $content.addClass('active').siblings().removeClass('active');
    })
  }
}

// var tabs = new Tabs('.xxx')
// this.__proto__ == Tabs.prototype
import $ from 'jquery';

export default class Tabs{
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
      var $content = $li.closest('.tabs').find('.tabs-content>div').eq(index);
      $content.addClass('active').siblings().removeClass('active');
    })
  }
}
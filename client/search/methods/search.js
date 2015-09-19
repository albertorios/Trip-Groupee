Template.search.onRendered(function(){
  if(Session.get('search_query') == '' || Session.get('search_query') == undefined){
    Router.go('/');
  }
  $('.event_name').popup();
});
Template.search.helpers({
  search_query: function(){
    return Session.get('search_query');
  }
});
Template.search.events({
});

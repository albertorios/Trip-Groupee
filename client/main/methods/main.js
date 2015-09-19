Template.main.onRendered(function(){
  // Session.set("result", 'failure');
  // var username = 'albertorios@uchicago.edu';
  // var password = '12350065Ar';
  // var search_query = 'the weeknd'
  // var results = Meteor.call('stub_hub_login', username, password,function(error,result){
  //   //console.log(result);
  //   //console.log(result['data']['access_token']);
  //   Session.set('user_token',result['data']['access_token']);
  //   Meteor.call('stub_hub_search_logged_in', Session.get('user_token'), search_query,function(error,result){
  //     console.log(result);
  //   });
  // });
  // Meteor.call('stub_hub_search_not_logged_in', search_query,function(error,result){
  //   console.log(result);
  // });

});
Template.main.helpers({
  response: function () {
    return Session.get('results');
  }
});
Template.main.events({
  'click #search-button':function(){
    var search_query = document.getElementById('search_query').value;
    if (search_query == '' || search_query == null || search_query == undefined) {
      $('.ui.basic.modal')
      .modal('show')
      ;
    }
    else{
      Session.set('search_query',search_query);
      Meteor.call('stub_hub_search_not_logged_in', search_query,function(error,result){
        Session.set('results',result);
        console.log(result);
      });
      $('.jumbo-page')
        .transition({
          animation : 'fade',
          duration  : 800
        })
      ;
      Router.go('/search');
    }
  },
  'keyup #search_query':function(e){
    if (e.keyCode === 13) {
      $('#search-button').trigger('click');
     }
  }
});

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

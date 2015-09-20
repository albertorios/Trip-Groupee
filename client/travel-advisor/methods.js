Template.travel.onRendered(function(){
  var loc_name = "allstate arena";
  Meteor.call('venue_review',loc_name,function(e,res){
    console.log(res);
  });
  var lat = "42.0059";
  var lon = "-87.88489";
  Meteor.call('hotel_finder',lat,lon,function(e,res){
    console.log(res);
  });
});

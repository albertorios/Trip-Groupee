Template.search.onRendered(function(){
  if(Session.get('search_query') == '' || Session.get('search_query') == undefined){
    Router.go('/');
  }
  Session.set('index',0);
  $('.event_name').popup();
  $('.venue_name').popup();

});
Template.search.helpers({
  search_query: function(){
    return Session.get('search_query');
  },
  results:function(){
    if(Session.get('results') != undefined){
      var res = [];
      var results = Session.get('results');
      var start = Session.get('index');
      var end = results.length < start + 15 ? results.length : start + 15;
      for(i = start; i < end; i++){
        var e = results[i];
        var event_object  = {};
        var date_time = new Date(Date.parse(e['dateLocal']));
        var day = date_time.getDay();
        if(day == 0){
          event_object['day'] = 'SUN';
        }
        else if(day == 1){
          event_object['day'] = 'MON';
        }
        else if(day == 2){
          event_object['day'] = 'TUE';
        }
        else if(day == 3){
          event_object['day'] = 'WED';
        }
        else if(day == 4){
          event_object['day'] = 'THU';
        }
        else if(day == 5){
          event_object['day'] = 'FRI';
        }
        else {
          event_object['day'] = 'SAT';
        }
        event_object['id'] = e['id'];
        event_object['date'] = date_time.getDate();
        event_object['month'] = date_time.getMonth() +1;
        event_object['title'] = e['title'];
        event_object['max_price'] = e['ticketInfo']['maxPrice'];
        event_object['min_price'] = e['ticketInfo']['minPrice'];
        event_object['venue_name'] = e['venue']['name'];
        event_object['city'] = e['venue']['city'];
        event_object['state'] = e['venue']['state'];
        event_object['country'] = e['venue']['country'];
        event_object['lat'] = e['venue']['latitude'];
        event_object['lon'] = e['venue']['longitude'];
        event_object['loc'] = {'lat' :e['venue']['latitude'], 'lon': e['venue']['longitude'], 'num':i };
        event_object['num'] = i;
        var performers = '';
        if (e['performers'] != undefined){
          for(j=0;j< e['performers'].length;j++){
            performers += e['performers'][j]['name'];
            if(j+1 !=e['performers'].length ){
              performers += ', ';
            }
          }
        }
        event_object['performers'] = performers;
        res.push(event_object);
      }
      return res;
    }
    else{
      return false;
    }
  },
  hotel:function(loc){
    Meteor.call('hotel_finder',loc['lat'],loc['lon'],loc['num'],function(err,res){
      console.log(res);
			var divname = document.getElementById('hotelname'+loc['num']);
			divname.getElementsByTagName('p')[0].innerHTML = res['name']+"<br/> Rating: "+res['rating']+"/5";
			var divloc = document.getElementById('hotelloc'+loc['num']);
			divloc.getElementsByTagName('p')[0].innerHTML = res['location_string'];
			var divprice = document.getElementById('hotelprice'+loc['num']);
			var pricelevel = res['price_level'];
			var count = 0;
			for (var i = 0; i<pricelevel.length; i++){
				if (pricelevel[i] == '$'){
					count++;
				}
			}
			for(var j = 0; j<count; j++){
				divprice.appendChild(document.createElement('span'));
				divprice.getElementsByTagName('span')[j].className = 'glyphicon glyphicon-usd dollar';
			}		 
    });
  }
});
Template.search.events({
});

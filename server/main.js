Meteor.methods({
  stub_hub_login: function(username,password){
    var consumer_key = 'bT5nGSx7t1tMprzGjVs0c3YeDmwa';
    var consumer_secret = 'OUqcaf3D8Vb1_A7Js_MhWA9sNUka';
    var concat_keys =  consumer_key + ':' + consumer_secret;
    var auth_token = 'Basic ' + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(concat_keys));

    try {
      var results = HTTP.post("https://api.stubhubsandbox.com/login",
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': auth_token
          },
          params: {
            grant_type : 'password',
            username : username,
            password : password,
            scope : 'SANDBOX'
          }
        }
      );
      return results;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  stub_hub_search_logged_in: function(access_token,search_query){
    var auth_token = 'Bearer ' + access_token;

    try {
      var results = HTTP.get("https://api.stubhubsandbox.com/search/catalog/events/v2",
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': auth_token
          },
          params: {
            q : search_query
          }
        }
      );
      //console.log(results);
      return results;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  stub_hub_search_not_logged_in: function(search_query){
    var auth_token = 'Bearer LX6ohLa0a13jDTbnqkSnQeFPwNga';

    try {
      var start_date = new Date();
      var month = ('0'+ String(start_date.getMonth())).slice(-2);
      var date = ('0'+ String(start_date.getDate())).slice(-2);
      console.log(date);
      var start_date_string = String(start_date.getFullYear()) + '-'+  month +'-' +  date +'T'+  '00:00';
      var end_date_string = String(start_date.getFullYear()+1) + '-'+  month +'-' +  date +'T'+  '00:00';
      var date_range = start_date_string + ' TO '+ end_date_string;
      var results = HTTP.get("https://api.stubhubsandbox.com/search/catalog/events/v2",
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': auth_token
          },
          params: {
            q : search_query,
            categoryName: 'concert',
            limit : 50,
            sort: 'dateLocal asc',
            date: date_range
          }
        }
      );
      //console.log(results);
      var res = [];
      for (i = 0; i != results['data']['events'].length; i++){
        var r = results['data']['events'][i];
        if(r['title'].indexOf('PARKING') + r['title'].indexOf('parking') + r['title'].indexOf('Parking') ==-3){
          if(r['ticketInfo']['maxPrice'] !=0){
            if(Date.parse(r['dateLocal']) - Date.now() >0){
              res.push(r);
            }
          }
        }
      }
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  airport_code_finder:function(lat,lon){
    var api_key = '694c7a131eb5a458f194b18092d23dfd';
    try {
      var results = HTTP.get("https://airport.api.aero/airport/nearest/"+lat+"/"+lon,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            user_key : api_key
          }
        }
      );
      results=results['content'];
      results = JSON.parse(results.slice(9,results.length-1))['airports'][0]['code'];
      return results;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  venue_review:function(venue_name){
    var api_key = '8351D44691C44D74B1F52E972258860F';
    try {
      var results = HTTP.get('http://api.tripadvisor.com/api/partner/2.0/search/'+encodeURI(venue_name),
        {
          params:{
            key : api_key,
            category : 'attractions'
          }
        }
      );
      return results;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  hotel_finder:function(lat,lon,num){
    console.log(lat);
    console.log(lon);
    var api_key = '8351D44691C44D74B1F52E972258860F';
    try {
      var results = HTTP.get('http://api.tripadvisor.com/api/partner/2.0/map/'+String(lat)+','+String(lon)+'/hotels',
        {
          params:{
            key : api_key
          }
        }
      );
      var new_results = results['data']['data'];
      var res = new_results[0];
      for(i =0; i!=new_results.length; i++){
        var curr = new_results[i];
        if(curr['price_level'] != null &&curr['price_level'].length != undefined ){
          if(res['price_level'] == null || res['price_level'].length == undefined){
            res = curr;
          }
          else{
            if(curr['price_level'].length < res['price_level'].length){
              res = curr;
            }
          }
        }
      }
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
});

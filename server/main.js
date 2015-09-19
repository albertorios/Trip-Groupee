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
            res.push(r);
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

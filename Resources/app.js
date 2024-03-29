Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({
  title:'Tab 1',
  backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({
  icon:'KS_nav_views.png',
  title:'Tab 1',
  window:win1
});

var label1 = Titanium.UI.createLabel({
  color:'#999',
  text:'I am Window 1',
  font:{fontSize:20,fontFamily:'Helvetica Neue'},
  textAlign:'center',
  width:'auto'
});
label1.addEventListener('click',function(e){
	alert('clickされたよ！');
});

win1.add(label1);

var win2 = Titanium.UI.createWindow({
  title:'Tab 2',
  backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({
  icon:'KS_nav_ui.png',
  title:'Tab 2',
  window:win2
});

var container = [];
for(var i=0;i<9;i++){
  var row = Titanium.UI.createTableViewRow({
    height:80
  });
  
var iconImage = Titanium.UI.createImageView({
    left:5,
    top:5,
    width:50,
    height:50,
    image:'image/' + i + '.jpg'
  });
  row.add(iconImage);

  var rowText = Titanium.UI.createLabel({
    text:'これは' + i + '番目のRowとなるテキストです',
    top:10,
    left:60,
    width:240,
    height:'auto'
  });
  row.add(rowText);

  container.push(row);
}

var tableView = Titanium.UI.createTableView();
tableView.setData(container);
win2.add(tableView);

var win3 = Titanium.UI.createWindow({
    title:'Twitter TL',
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Twitter TL',
    window:win3
});


var tweetTableView = Titanium.UI.createTableView();
if(Titanium.Network.online===false){
  var dialog = Ti.UI.createAlertDialog({
    title: "ネットワーク接続できていません"
  });
  dialog.show();
}
var xhr = Titanium.Network.createHTTPClient();
//https://dev.twitter.com/docs/api/1/get/statuses/public_timeline
var twitterTL = 'https://api.twitter.com/1/statuses/public_timeline.json?count=3&include_entities=true';
xhr.open('GET',twitterTL,false);
xhr.onload = function(){
  var tweets = JSON.parse(this.responseText);
  var container = [];
  for(var i=0;i<tweets.length;i++){
    var row = Titanium.UI.createTableViewRow({
      height:80
    });
    var tweetText = Titanium.UI.createLabel({
      top:10,
      left:60,
      width:240,
      height:'auto',
      text:tweets[i].text
    });
    row.add(tweetText);
    var iconImage = Titanium.UI.createImageView({
      left:5,
      top:5,
      width:50,
      height:50,
      image:tweets[i].user.profile_image_url
    });
    row.add(iconImage);
    container.push(row);
  }
  tweetTableView.setData(container);
};
xhr.error =  function(){
  var dialog = Ti.UI.createAlertDialog({
    title: "HTTP Client error",
    message: "StatusCode: " + this.status
  });
  return dialog.show();
};
xhr.send();

win3.add(tweetTableView);

//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);


// open tab group
tabGroup.open();

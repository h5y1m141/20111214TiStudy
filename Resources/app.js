// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
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

//
// create controls tab and root window
//
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


//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);


// open tab group
tabGroup.open();

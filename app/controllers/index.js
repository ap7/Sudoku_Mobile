function clickPlay (e) {
  var winPlay = Alloy.createController('game');
  winPlay.getView().open();
  var winDiff = Alloy.createController('difficulte');
  winDiff.getView().open();
}

$.index.open();

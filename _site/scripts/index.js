var zonewrap = $("#zone-wrap");
var zone = $("#zone");

function setBrightnessAndContrast(){
  const brightness = $("#brightness").val();
  const contrast = $("#contrast").val();
  console.log(`Br: ${brightness}`);
  console.log(`C: ${contrast}`);
  
  zonewrap.css({
      "-webkit-filter": "brightness(" + brightness + ") contrast(" + contrast + ")",
      "filter": "brightness(" + brightness + ") contrast(" + contrast + ")"
  });
}

function setBlur(){
  const blur = $('#blur').val();
  console.log(`Bl: ${blur}`);
  
  zone.css({
    "-webkit-filter": "blur(" + blur + "px)",
    "filter": "blur(" + blur + "px)"
  });
}

$(document).ready(function(){
   $('#brightness, #contrast').change(function(){
     setBrightnessAndContrast()
   });

  $('#blur').change(function(){
     setBlur();
   });
  
  setBrightnessAndContrast()
  setBlur();
});

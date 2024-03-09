const qview = document.querySelector("#view")
const qmonth = document.querySelector("#pric")

const range = document.querySelector("#slidview")
const choose = document.querySelector("#chex")

var view = ["10K","50K","100K","500K","1M"]
var month = ["$8.00","$12.00","$16.00","$24.00","$36.00"]

var discount=true;

function func(){
    if (discount==true){
        discount = false
        month = ["$6.99","$9.99","$12.99","$18.99","$27.99"]

    }else{
        discount = true
        month = ["$8.00","$12.00","$16.00","$24.00","$36.00"]
    }
    qview.textContent = view[range.value]
    qmonth.textContent=month[range.value]
}

range.addEventListener("input",(event)=>{
    qmonth.textContent=month[range.value]
    qview.textContent=view[range.value]
})


// for changing button color on click
function increaseSize() {
    var button = document.querySelector(".strt");
    button.style.backgroundColor="#fff";
    setTimeout(function() {button.style.backgroundColor="hsl(227, 35%, 25%)";}, 20);
}

// for slider progress, to work in all browser
$('input[type=range]').on('input', function(e){
  let min = e.target.min, max = e.target.max, val = e.target.value;
  $(e.target).css({
    'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
  });
}).trigger('input');
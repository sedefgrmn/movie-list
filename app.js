/*variabels*/
let input = document.querySelector("#input");
let btn = document.querySelector("#btn");
let nolist = document.querySelector("#no");
let yeslist = document.querySelector("#yes");


/*sayfa yenilendiğinde verileri getir*/
window.addEventListener('load',SetLocalStorage);
window.addEventListener('load',LocalStorageYes);


/* enter tıklandığında listeye yeni eleman ekle ve LocalStorage'a kaydet */
input.addEventListener('keypress', (e)=>{
         if(e.key === 'Enter'){ 
            if(input.value === ""){
               alert("film adı giriniz")}
               else{
            addList()
            saveToLocalStorege(input.value);
             input.value="";}
         }
})

/*butona tıklandığında listeye yeni eleman ekle */
btn.addEventListener('click' , (t) =>{
if(input.value === ""){
   alert("film adı giriniz")} 
   else{
    t.preventDefault();
    addList()
    saveToLocalStorege(input.value);
    input.value="";
   }
})

const nolistArray = JSON.parse(localStorage.getItem('nolist')) || [];

function addList(todo = null){
   const list = document.createElement('li')
   list.classList.add("list-group-item");   
   list.innerHTML = todo ? todo : input.value; // Eğer todo varsa onu kullan, yoksa input değerini kullan
   nolist.appendChild(list);
   // Yeni eklenen öğeye tıklama olayını ekle
  list.addEventListener('click',()=>{

   
   const index = Array.from(nolist.children).indexOf(list); // Tıklanan öğenin index'ini al

   if(nolistArray && nolistArray[index]){
      yeslistİtem(nolistArray[index]);// Tıklanan öğenin değerini yeslist'e ekle
      saveLocalStorege(nolistArray[index]);
      removeFromNolist(index); // Tıklanan öğeyi nolist ve localStorage'dan sil
      list.remove(); // Tıklanan öğeyi DOM'dan kaldır

   }
  })

}
/* LocalStorage'a listeyi kaydeden fonksiyon */
function saveToLocalStorege(todo){
   let no = JSON.parse(localStorage.getItem('nolist')) || [];// Daha önce kaydedilen listeyi al
   no.push(todo); // Yeni todo'yu ekle

   localStorage.setItem('nolist',JSON.stringify(no));// Güncellenen listeyi kaydet
        
}
/* Sayfa yüklendiğinde LocalStorage'dan listeyi yükleyen fonksiyon */
function SetLocalStorage(){
   let no = JSON.parse(localStorage.getItem('nolist')) || [];
   if(no.length > 0){
      no.forEach(todo => addList(todo));// Her bir todo'yu listeye ekle
   }
}

/* Tıklanan öğeyi yeslist'e ekleyen fonksiyon */

function yeslistİtem(value) {
   const ylist = document.createElement('li')
   ylist.classList.add("list-group-item","bg-success-subtle","border-light");

   ylist.innerHTML = value//direkt valueyu alıyoruz
   yeslist.appendChild(ylist);
}

/* tıklanan ögeyi nolist ve localstoragedan silen fonksiyon*/

function removeFromNolist(index){
   let no = JSON.parse(localStorage.getItem('nolist')) || [];
   no.splice(index,1);// Belirtilen index'teki öğeyi array'den sil
   localStorage.setItem('nolist', JSON.stringify(no));// Güncellenen array'i tekrar LocalStorage'a kaydet
}


/* LocalStorage'a listeyi kaydeden fonksiyon */
function saveLocalStorege(todos){
   let yes = JSON.parse(localStorage.getItem('yeslist')) || [];// Daha önce kaydedilen listeyi al
   yes.push(todos); // Yeni todo'yu ekle

   localStorage.setItem('yeslist',JSON.stringify(yes));// Güncellenen listeyi kaydet
        
}


/* Sayfa yüklendiğinde LocalStorage'dan listeyi yükleyen fonksiyon */
function LocalStorageYes(){
   let yes = JSON.parse(localStorage.getItem('yeslist')) || [];
   if(yes.length > 0){
      yes.forEach(todos => yeslistİtem(todos));// Her bir todo'yu listeye ekle
   }

}
 


/*LocalStorage yalnızca string veriler saklayabildiği için, array veya obje gibi yapıları JSON formatında tutman gerekiyor.
 Bu yüzden JSON.stringify ile dönüştürüp, localStorage.setItem() ile kaydettin. Daha sonra JSON.parse ile tekrar array ya da obje formatına döndürerek kullanıyorsun.*/


/*id si change olan butona addevenlistener click fonksiyonu eklenecek fonksiyonun içerisinde 
math.random() ile id si dailymovie olan spannın içerisindeki yazıda nolistten rastgele bir index seçilmesi gerekiyor*/

let dailymovie=document.querySelector('#dailymovie');

window.addEventListener('load',(m)=>{
   let movie = nolistArray[Math.floor(Math.random() * nolistArray.length)];
   dailymovie.innerText = movie;
   
})

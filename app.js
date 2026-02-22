const FW=(function(){
const state={basePrice:5,quantity:1,discount:0,selectedPayment:null};

function router(page){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(page).classList.add("active");
window.scrollTo(0,0);
updateSummary();
}

function changeQty(amount){
state.quantity+=amount;
if(state.quantity<1)state.quantity=1;
document.getElementById("qtyDisplay").innerText=state.quantity;
updatePrice();
}

function updatePrice(){
const subtotal=state.basePrice*state.quantity;
document.getElementById("productPrice").innerText="€"+subtotal.toFixed(2);
}

function applyCoupon(){
const code=document.getElementById("couponInput").value.toLowerCase();
if(code==="fw10")state.discount=10;
else if(code==="fw50")state.discount=50;
else state.discount=0;
updateSummary();
}

function updateSummary(){
const subtotal=state.basePrice*state.quantity;
const discountAmount=subtotal*(state.discount/100);
const discounted=subtotal-discountAmount;
const fee=discounted*0.01;
const total=discounted+fee;
document.getElementById("summaryQty").innerText=state.quantity;
document.getElementById("subtotal").innerText="€"+subtotal.toFixed(2);
document.getElementById("discount").innerText="-€"+discountAmount.toFixed(2);
document.getElementById("fee").innerText="€"+fee.toFixed(2);
document.getElementById("total").innerText="€"+total.toFixed(2);
}

function selectPayment(method){
state.selectedPayment=method;
document.querySelectorAll(".payment").forEach(el=>el.classList.remove("border-green-500","border-blue-500"));
if(method==="Robux")document.getElementById("robux").classList.add("border-green-500");
if(method==="PayPal")document.getElementById("paypal").classList.add("border-blue-500");
}

function checkout(){
if(!state.selectedPayment){alert("Select a payment method.");return;}
if(state.selectedPayment==="PayPal")window.open("https://www.paypal.me/RobinMarasus","_blank");
if(state.selectedPayment==="Robux")window.open("https://www.roblox.com/catalog/74893982319376/Fatality-Wins","_blank");
setTimeout(()=>{router("license")},1000);
}

function generateKey(){
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let key="";
for(let i=0;i<5;i++){
let segment="";
for(let j=0;j<5;j++){
segment+=chars.charAt(Math.floor(Math.random()*chars.length));
}
key+=segment;
if(i<4)key+="-";
}
document.getElementById("licenseKey").innerText=key;
}

function copyKey(){
const key=document.getElementById("licenseKey").innerText;
if(key==="Click Generate")return;
navigator.clipboard.writeText(key);
}

updatePrice();
updateSummary();

return{router,changeQty,applyCoupon,selectPayment,checkout,generateKey,copyKey};
})();

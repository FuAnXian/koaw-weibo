const createdTime = (time)=>{
  let diffDate = parseInt((new Date() - new Date(time)) / 1000 / 60);
  let name;
  if(diffDate > 60){
    let hour = parseInt(diffDate / 60) || 1;
    if(hour >= 24){

      let day = parseInt(diffDate / 60 / 24) || 1;
      if(day > 7){
           name = time.spilt(" ")[0];
      }else{
        name = day+"天前"
      }

    }else{
      name = hour + '小时前'
    }
  }else{
    name = diffDate == 0 ? "刚刚" : diffDate +"分钟前"
  }
  return name
};

module.exports = {
  createdTime
}
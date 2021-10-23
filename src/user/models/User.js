class User {
  constructor(dataDB){
    this.id = dataDB.id;
    this.fname = dataDB.fname;
    this.lname = dataDB.lname;
    this.login = dataDB.login;
    this.email = dataDB.email;
    this.categoryId = dataDB.categoryid;
    this.password = dataDB.password;
    this.photo = dataDB.photo;
    this.name = dataDB.name;
    this.phone = dataDB.phone;
    this.country = dataDB.country;
    this.stack = dataDB.stack;
    this.rate = dataDB.rate;
  }
  getCreatedUser(){
    const responseData = {
      fname: this.fname,
      lname: this.lname,
      login: this.login,
      email: this.email,
      categoryId: this.categoryId ,
    }
  }
  getInfo(photoFlag = false) {
    const responseData = {
      
      fname: this.fname,
      lname: this.lname,
      login: this.login,
      email: this.email,
      categoryId: this.categoryId ,
      phone : this.phone,
      country : this.country,
      stack : this.stack,
      rate : this.rate,
      photo: this.photo,
    };

    if (photoFlag) {
      responseData.photo = this.photo;
    }

    return responseData;
  }
  getConsoleInfo() {
    const responseData = {
      id: this.id,
      fname: this.fname,
      lname: this.lname,
      login: this.login,
      email: this.email,
      name: this.name,
      country: this.country,
      stack: this.stack,
      rate: this.rate,
      photo: this.photo,
    }
    return responseData;
  }
  getProfileInfo(){
    const responseData = {
    fname: this.fname,
    lname: this.lname,
    login: this.login,
    categoryId: this.categoryId,
    email: this.email,
    phone : this.phone,
    country : this.country,
    stack : this.stack,
    rate : this.rate,
    }
    return responseData
  }
  
  

  getId() {
    return this.id;
  }
}
module.exports = { User }
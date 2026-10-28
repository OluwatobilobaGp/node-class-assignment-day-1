// const
// var
// let

let mrEmma = "Mr Emmanuel GlobalTech 12 #$98;hgfg kdj";

let myAge = 16;

let isAdmin = true;

let isGlobalTechStudent = true;

let nodeClassStudent = ["Mr Daniel", "Mr Emma", "Mr Toheeb", "Omolara", "Mr Tobi"];

let myProfile = {
    myName: "Mr Daniel",
    isStudent: [true, false],
    department: "Cybersecurity",
    favoriteColor: "Blue a Chelsea Fan",
    siblings: ["Yemi", "Tobiloba", "Anu", "Rachel", "Victoria"],
    birthDate: {
        birthMonth: 11,
        birthDay: "Monday",
        birthYear: "2010"
    }
};

let mydetail = {
    age: myAge,
    name: mrEmma,
};

console.log(mydetail);
console.log(mrEmma + 2);
console.log(myAge + 2);

console.log(nodeClassStudent);
console.log(nodeClassStudent[0]);
console.log(nodeClassStudent[4]);
console.log(nodeClassStudent[1]);
console.log(nodeClassStudent[2]);
console.log(myProfile);
console.log(myProfile.myName);
console.log(myProfile.birthDate);
console.log(myProfile.birthDate.birthYear);

if (myProfile.isStudent[1]) {
    console.log("Error you are not student of Global-tech, You can't access this material, go register Today");
}

// if (isAdmin) {
//     consol.log("You are welcome");
// }

if (false || false) {
    console.log("You are welcome");
} else {
    console.log("login again ");
};
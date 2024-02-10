let addToy = false;
const toyBox = document.querySelector("#toy-collection")
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    for (let toy of toys) {
      addNewToy(toy);
    }
  })
});

let form = document.querySelector(".add-toy-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendNewToy(e);
  console.log(e.target);
})
function addNewToy(toy) {
  let newToy = document.createElement("div");
  newToy.className = "card";
  newToy.id = toy.id;
  newToy.name = toy.name;
  newToy.image = toy.image;
  newToy.likes = toy.likes;
  let toyName = document.createElement("h2");
  toyName.innerText = toy.name;
  let toyPic = document.createElement("img");
  toyPic.src = toy.image;
  toyPic.className = "toy-avatar";
  let likes = document.createElement("p");
  likes.innerHTML = `
  <span id="${toy}-like-count">${toy.likes}</span> likes
  `;
  let btn = document.createElement("button");
  btn.className = "like-btn";
  btn.innerText = "Like ❤️"
  btn.id = toy.id;
  btn.addEventListener("click", changeLike);
  newToy.appendChild(toyName);
  newToy.appendChild(toyPic);
  newToy.appendChild(likes);
  newToy.appendChild(btn);
  toyBox.appendChild(newToy);
}
function sendNewToy(e) {
  let nameInput = e.target.children[1].value;
  let imageInput = e.target.children[3].value;
  let newToy = {};
  newToy.name = nameInput;
  newToy.image = imageInput
  newToy.likes = 0;
 fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
  addNewToy(newToy);
}
function updateToy(toy) {
 fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(obj => console.log(obj))
}
function changeLike(e) {
  let toy = e.target.parentNode;
  let toyLikes = e.target.parentNode.children[2];
  let likeCount = toyLikes.children[0];
  let likeCountNum = parseInt(likeCount.innerText, 10);
  likeCountNum++;
  toy.likes = likeCountNum;
  likeCount.innerText = `${likeCountNum}`;
  updateToy(toy);
}
'use strict';

const socket = io();
const channel = 'chat message';
const username = prompt('what\'s your nickname?') || makeid();

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  socket.emit(channel, username, inp.value);
  inp.value = '';
});

socket.on(channel, (data) => {
  console.log(data);
  const item = document.createElement('li');
  item.innerHTML = `${data.username} says: ${data.msg}`;
  const list = document.getElementById('messages');
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
});

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (const i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
  }
  return result;
}


let users = [];
let filteredUsers = [];

let usersSection = document.querySelector('#users');
let statisticsSection = document.querySelector('#statistics');

let searchBar = document.querySelector('#search-bar');
let searchButton = document.querySelector('#search-button');

async function start() {
  await loadData();
  setupSearchMechanism();
  render();
}

async function loadData() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  users = (await res.json()).results;
  
  users = users.map(user => {
    return {
      name: `${user.name.first} ${user.name.last}`,
      picture: user.picture.medium,
      age: user.dob.age,
      gender: user.gender
    }
  });
  
  const loadingPage = document.querySelector('#loading-page');
  loadingPage.classList.add('hide');
}

function setupSearchMechanism() {
  searchBar.addEventListener('keyup', event => {
    if (event.keyCode !== 13) { return; }
    handleSearch();
  });

  searchButton.addEventListener('select', handleSearch);
}

function handleSearch() {
  const searchTerm = searchBar.value?.toLowerCase();
  // const name = 'lucas'
  filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));
  render();
}

function render() {
  if (filteredUsers.length === 0) {
    usersSection.textContent = 'Nenhum usuário filtrado';
    statisticsSection.textContent = 'Nada a ser exibido';
    return;
  }

  renderUsersList();
  renderStatistics();
}

function renderUsersList() {
  const list = document.createElement('ul');
  filteredUsers.forEach(user => {
    const span = document.createElement('span');
    span.textContent = `${user.name}, ${user.age} anos`;
    
    const img = document.createElement('img');
    img.src = user.picture;
    img.alt = `Foto de ${user.name}`;
    
    const tile = document.createElement('li');
    tile.append(img, span);
    
    list.appendChild(tile);
  });
  
  usersSection.innerHTML = '';
  usersSection.appendChild(list);
}

function renderStatistics() {
  const numMaleUsers = filteredUsers.filter(user => user.gender === 'male').length;
  const numFemaleUsers = filteredUsers.length - numMaleUsers;
  const sumUserAges = filteredUsers.reduce((total, user) => total + user.age, 0);
  const averageUserAges = (sumUserAges / filteredUsers.length).toFixed(2);

  const numMaleUsersSpan = document.createElement('span');
  numMaleUsersSpan.textContent = `Sexo masculino: ${numMaleUsers}`;
  
  const numFemaleUsersSpan = document.createElement('span');
  numFemaleUsersSpan.textContent = `Sexo feminino: ${numFemaleUsers}`;

  const sumUserAgesSpan = document.createElement('span');
  sumUserAgesSpan.textContent = `Soma das idades: ${sumUserAges}`;

  const averageUserAgesSpan = document.createElement('span');
  averageUserAgesSpan.textContent = `Média das idades: ${averageUserAges}`;

  statisticsSection.innerHTML = '';
  statisticsSection.append(numMaleUsersSpan, numFemaleUsersSpan, sumUserAgesSpan, averageUserAgesSpan);
}

start();
window.addEventListener('load', start);

const globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

function start() {
  inputName = document.querySelector('#input-name');
  
  preventFormReloadOnSubmit();
  activateInput();
  render();
}

function preventFormReloadOnSubmit() {
  const form = document.querySelector('form');
  form.addEventListener('submit', event => event.preventDefault());
}

function activateInput() {
  const handleTyping = (event) => {
    if (event.key !== 'Enter') { return; }

    const typedName = event.target.value.trim();
    if (!typedName) { return; }
    
    if (isEditing) {
      globalNames[currentIndex] = typedName;
      currentIndex = null;
      isEditing = false;
      clearInput();
    } else {
      globalNames.push(typedName);
    }

    render();
  }

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function render() {
  const createDeleteButton = (index) => {
    const deleteName = () => {
      globalNames.splice(index, 1);
      render();      
    };

    const button = document.createElement('button');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    button.classList.add('delete-button');

    return button;
  };

  const createSpan = (name, index) => {
    const editItem = () => {
      isEditing = true;
      currentIndex = index;
      inputName.value = name;
      inputName.focus();
    };

    const span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  };

  const divNames = document.querySelector('#names');
  divNames.firstChild?.remove();

  const ul = document.createElement('ul');

  globalNames.forEach((name, index) => {
    const li = document.createElement('li');
    const button = createDeleteButton(index);
    const span = createSpan(name, index);
    
    // insert into the dom all the created elements
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);    
  });

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = null;
  inputName.focus();
}

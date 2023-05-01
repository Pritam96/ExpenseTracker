const form = document.querySelector('#my-form');
const ul = document.querySelector('#list');

const alertSection = document.querySelector('#alert-section');

const alertmsg = document.createElement('div');
alertmsg.setAttribute('role', 'alert');
alertmsg.className = 'alert';
alertSection.appendChild(alertmsg);

let key = 0;

form.addEventListener('submit', storeData);

function storeData(e) {
  e.preventDefault();

  const amount = document.querySelector('#expenseAmount').value;
  const description = document.querySelector('#description').value;
  const category = document.querySelector('#category').value;

  const expense = { amount, category, description };

  if (amount === '' || category === null) {
    // console.log('Enter an Amount & Choose a category');
    alertmsg.className = 'alert alert-danger';
    alertmsg.textContent = 'Enter specified field!';

    setTimeout(() => {
      alertmsg.className = 'alert';
      alertmsg.textContent = '';
    }, 3000);
  } else {
    localStorage.setItem(++key, JSON.stringify(expense));

    addToList(expense);
    form.reset();
    // console.log('Data Inserted to Local Storage');
    alertmsg.className = 'alert alert-success';
    alertmsg.textContent = 'Data stored Successfully!';

    setTimeout(() => {
      alertmsg.className = 'alert';
      alertmsg.textContent = '';
    }, 3000);
  }
}

function addToList(expense) {
  document.querySelector('#list-section').className = 'container col-8 my-5'; // visible the list

  const li = document.createElement('li');
  li.className = 'list-group-item';
  const text = document.createTextNode(
    `Rs: ${expense.amount} - ${expense.category} - ${expense.description}`
  );

  const div = document.createElement('div');
  div.className = 'd-grid gap-2 d-md-flex justify-content-md-end';

  const editBtn = document.createElement('button');
  editBtn.setAttribute('type', 'button');
  editBtn.className = 'btn btn-warning';
  editBtn.appendChild(document.createTextNode('Edit'));

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.className = 'btn btn-danger';
  deleteBtn.appendChild(document.createTextNode('Delete'));

  div.appendChild(editBtn);
  div.appendChild(deleteBtn);

  li.appendChild(text);
  li.appendChild(div);

//   console.log(li);

  ul.appendChild(li);

  editBtn.onclick = () => {
    document.querySelector('#expenseAmount').value = expense.amount;
    document.querySelector('#description').value = expense.description;
    document.querySelector('#category').value = expense.category;
    localStorage.removeItem(key);
    ul.removeChild(li);
    if (!ul.firstElementChild) {
      document.querySelector('#list-section').className = 'invisible';
    }
  };

  deleteBtn.onclick = () => {
    localStorage.removeItem(key);
    ul.removeChild(li);
    if (!ul.firstElementChild) {
      document.querySelector('#list-section').className = 'invisible';
    }
  };
}

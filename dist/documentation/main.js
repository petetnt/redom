var doc = document.getElementById('doc');
var menu = document.createElement('div');
var menucontainer = document.createElement('div');
var logoA = document.createElement('a');
var logo = document.createElement('img');
var hovermenu = document.createElement('div');
var mobile = false;

hovermenu.id = 'hovermenu';
hovermenu.textContent = 'Menu';
hovermenu.style.display = 'none';

hovermenu.onclick = function (e) {
  menu.style.display = '';
  hovermenu.style.display = 'none';
  doc.style.opacity = 0.1;
  document.body.style.overflow = 'hidden';
  menu.onclick = doc.onclick = function (e) {
    menu.style.display = 'none';
    menu.onclick = null;
    hovermenu.style.display = '';
    doc.style.opacity = '';
    document.body.style.overflow = '';
    window.onclick = null;
  };
};

menu.id = 'menu';
menucontainer.id = 'menucontainer';

logoA.href = 'https://redom.js.org';
logo.id = 'logo';
logo.src = '../img/logo.svg';

logoA.appendChild(logo);
menucontainer.appendChild(logoA);

document.body.appendChild(hovermenu);

for (var i = 0; i < doc.children.length; i++) {
  var child = doc.children[i];

  if (~'H2 H3 H4'.split(' ').indexOf(child.tagName)) {
    addItem(menu, child);
  } else if (child.tagName === 'PRE') {
    const code = child.querySelector('code');

    if (code.className === 'lang-html') {
      code.className = 'language-markup';
    } else if (code.className === 'lang-js') {
      code.className = 'language-javascript';
    }
  }
}

function addItem (menu, child) {
  var item = document.createElement('p');
  var link = document.createElement('a');
  var indentation = parseInt(child.tagName.slice(1), 10) - 2;

  if (indentation) {
    item.className = 'menu-item menu-sub-item';
  } else {
    item.className = 'menu-item';
  }
  item.style.paddingLeft = indentation + 'rem';

  link.textContent = child.textContent;

  link.href = '#' + child.id;
  item.appendChild(link);
  menucontainer.appendChild(item);
}
menu.appendChild(menucontainer);
document.body.appendChild(menu);

window.addEventListener('resize', resize);

resize();

function resize () {
  if (window.innerWidth <= 640) {
    if (mobile) {
      return;
    }
    mobile = true;
    menu.style.display = 'none';
    menu.style.width = '100%';
    menu.style.textAlign = 'center';
    menu.style.fontSize = '1.5rem';
    menucontainer.style.textAlign = 'left';
    menucontainer.style.display = 'inline-block';
    hovermenu.style.display = '';
    doc.style.left = 0;
  } else {
    if (!mobile) {
      return;
    }
    mobile = false;
    menu.style.display = '';
    menu.style.width = '';
    menu.style.textAlign = '';
    menu.style.fontSize = '';
    menucontainer.style.textAlign = '';
    menucontainer.style.display = '';
    hovermenu.style.display = 'none';
    doc.style.opacity = '';
    doc.style.left = '';
    menu.onclick = doc.onclick = null;
    document.body.style.overflow = '';
  }
}

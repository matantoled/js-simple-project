const form = document.getElementById("p-form");
form.addEventListener("submit", onSubmit);

function showLoading(on) {
  const load = document.getElementById("loader");
  const btn = document.getElementById("btn-sub");
  if (!load) {
    return;
  }

  load.classList.toggle("hidden", !on);
  if (btn) {
    btn.disabled = on;
  }
}

async function onSubmit (e) {
  e.preventDefault();
  showLoading(true);

  try {
  const pokName = form.pname.value.trim().toLowerCase().replace(/[&<>"']/g, '');
  if (!pokName) return;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokName}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  

  const height = data.height;
  const pokeName = data.forms[0].name;
  const image = data.sprites.front_default;
  const weight = data.weight;
  const abilities = data.abilities.map(a => a.ability.name).join(", ");
  document.getElementById("result").innerHTML = `

  <img src="${image}" alt="pokemon image">
  <p>Name: ${pokName}</p>
  <p>Height: ${height * 10} CM</p>
  <p>Weight: ${weight}</p>
  <p>Abilities: ${abilities}</p>`
  }
  catch(err) {
    document.getElementById("result").textContent = err;
  }
  finally {
    showLoading(false);
  }
}
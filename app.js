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

async function onSubmit(e) {
  e.preventDefault();
  showLoading(true);

  try {
  const queryName = form.pname.value.trim().toLowerCase().replace(/[&<>"']/g, '');
  if (!queryName) return;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryName}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  console.log((data));
  console.log(Object.keys(data));
  

  const height = data.height * 10;
  const pokeName = data.forms[0].name;
  const image = data.sprites.front_default;
  const weight = (data.weight / 10).toFixed(1);
  const abilities = data.abilities.map(a => a.ability.name).join(", ");
  document.getElementById("result").innerHTML = `
    <img src="${image}" alt="pokemon image">
    <p>Name: ${pokeName}</p>
    <p>Height: ${height} CM</p>
    <p>Weight: ${weight}</p>
    <p>Abilities: ${abilities}</p>`

  }
  catch(err) {
    document.getElementById("result").textContent = err;
  }
  finally {
    showLoading(false);
    form.pname.focus();
  }
}

function displayChampinInfo(champion) {
  const newTitle = `${champion.name} - ${champion.title}`;
  document.title = newTitle;

  div_title.innerHTML = newTitle;
  div_lore.innerHTML = champion.lore;

  img_champ.src = `${urls.imageChampAPI}/${champion.id}_0.jpg`;
  img_passive.src = `${urls.imgPassiveAPI}/${champion.passive.image.full}`;
  img_skillQ.src = `${urls.imgSkillAPI}/${champion.spells[0].image.full}`;
  img_skillW.src = `${urls.imgSkillAPI}/${champion.spells[1].image.full}`;
  img_skillE.src = `${urls.imgSkillAPI}/${champion.spells[2].image.full}`;
  img_skillR.src = `${urls.imgSkillAPI}/${champion.spells[3].image.full}`;

  div_passive_title.title = champion.passive.name;
  div_skillQ_title.title = champion.spells[0].name;
  div_skillW_title.title = champion.spells[1].name;
  div_skillE_title.title = champion.spells[2].name;
  div_skillR_title.title = champion.spells[3].name;
}

function redirectToHome(msg) {
  if (msg) alert(msg);

  window.location = 'index.html';
}

function retriveChampionData(championID) {
  return new Promise((resolve, reject) => {
    fetch(`${urls.riotAPI}/champion/${championID}.json`)
      .then(resp => {
        return resp.ok
          ? resp.json()
          : reject('Erro ao buscar campeão...');
      }).then(json => {
        const champion = json.data[championID];

        champion
          ? resolve(champion)
          : reject();
      }).catch(reject);
  });
}

window.addEventListener('load', function() {
  const searchString = window.location.search;

  if (!searchString.startsWith('?'))
    return redirectToHome();

  const searchParams = searchString
    .substring(1)
    .split('&')
    .map(param => param.split('='))
    .reduce((previous, current) => {
      const tempObj = {};
      tempObj[current[0]] = current[1];

      return Object.assign(tempObj, previous);
    }, {});

  if (!searchParams.champion)
    return redirectToHome();

  retriveChampionData(searchParams.champion)
    .then(displayChampinInfo)
    .catch(redirectToHome);
});

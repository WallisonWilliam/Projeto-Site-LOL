
const imagesTags = {
  Support: "assets/images/classChamp/ClassSupport.png",
  Tank: "assets/images/classChamp/ClassTank.png",
  Assassin: "assets/images/classChamp/ClassAssassin.png",
  Marksman: "assets/images/classChamp/ClassMarksman.png",
  Mage: "assets/images/classChamp/ClassMage.png",
  Fighter: "assets/images/classChamp/ClassFighter.png",
};

const tagsBR = {
  Fighter: "Lutador",
  Mage: "Mago",
  Tank: "Tank",
  Support: "Suporte",
  Assassin: "Assassino",
  Marksman: "Atirador",
};


function addChampionCard(champion) {
  const html = `
      <li>
        <div
          class="thumbnail__container noselect"
          style="background-image: url('${urls.imageChampAPI}/${champion.id}_0.jpg');"
        >
          <div class="card__header">
            <div class="champ__number"></div>
            <a href="champion.html?champion=${champion.id}">
              <div class="info__icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
                </svg>
              </div>
            </a>
          </div>

          <div class="image__container"></div>

          <div class="champ__name">
            <h3>${champion.name}</h3>

            <div class="champ__type">
              ${
                champion.tags.map((tag) => `
                    <div class="champ__type__bg " title="${tagsBR[tag]}">
                      <img src="${imagesTags[tag]}" />
                    </div>
                  `
                )
              }
            </div>
          </div>
        </div>
      </li>
  `;

  ul_champions.insertAdjacentHTML('beforeend', html);
}

function retriveChampionsData() {
  return new Promise((resolve, reject) => {
    fetch(`${urls.riotAPI}/champion.json`)
      .then(resp => {
        return resp.ok
          ? resp.json()
          : reject('Erro ao buscar campeões...');
      }).then(json => {
        resolve(json.data);
      }).catch(reject);
  });
}

window.addEventListener('load', function() {
  retriveChampionsData()
    .then(champions => {
      for ( let championID in champions ) {
        addChampionCard(champions[championID]);
      }
    });
});

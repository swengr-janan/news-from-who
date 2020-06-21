window.onload = () => {
    getNews();
}

const getNews = () => {
    fetch('https://www.who.int/rss-feeds/news-english.xml')
    .then((response)=>{
      return response.text();
    })
    .then((data)=>{
      let parser = new DOMParser(),
          xmlDoc = parser.parseFromString(data, 'text/xml');
          showNews(xmlDoc);
    })
}

const showNews = (xmlDoc) => {
    console.log(xmlDoc);
    var finalNews = '';

    let list = document.getElementById('item');  
    let link = xmlDoc.getElementsByTagName('link');
    let title = xmlDoc.getElementsByTagName('title');
    let description = xmlDoc.getElementsByTagName('a10:content');
    let pubDate = xmlDoc.getElementsByTagName('pubDate');

    for(let i = 0; i < title.length; i++){

        finalNews += 
          `
        <div class="card-grid-space">
          <a class="card" href="${link[i].firstChild.nodeValue}" style="--bg-img: url(https://www.deloittedigital.com/content/dam/deloittedigital/us/images/landscape-2x1/hero-images/offering-20190301-digitaldna-hero.jpg)">
            <div>
              <h1>${title[i].firstChild.nodeValue}</h1>
              <p></p>
              <div class="date">${pubDate[i]}</div>
              <div class="tags">
                <div class="tag"><i class="fas fa-info-circle"></i> Show more</div>
              </div>
            </div>
          </a>
        </div>
          `
      }
      document.querySelector('.cards-wrapper').innerHTML = finalNews;
}
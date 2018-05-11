import { fnNewsListTemplate } from './newsTemplate.js';

export default class newsSection {
  constructor() {

  }
  init() {
        this.fetchData('http://localhost:8000/src/data/newslist.json');
  }

  fetchData(url) {
        fetch(url)
            .then(res => res.json())
            .then(this.makeNewsContentMap.bind(this))//템플릿 작업
            .then(this.renderFirst.bind(this));//하나만 보여중
  }

  makeNewsContentMap(obj) {
    let myMap = new Map();
    obj.forEach((news) => {
        const templatedNews = fnNewsListTemplate(news);
        myMap.set(news.id, [templatedNews]);
    })
    return myMap;
  }

  renderFirst(myMap) {
    const firstHTML = myMap.get(1)
    const newsSectionElement = document.querySelector(".content");
    newsSectionElement.innerHTML = firstHTML;
  }
}
 
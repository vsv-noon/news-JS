import AppController, { NewsEvent } from '../controller/controller';
import { AppView, NewsResponse, SourcesResponse } from '../view/appView';

class App {
    public controller: AppController;
    public view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = document.querySelector<HTMLElement>('.sources');
        if (!sources) return;
        sources.addEventListener('click', (event: Event) => {
            const e = event as unknown as NewsEvent;
            this.controller.getNews(e, (data?: NewsResponse) => this.view.drawNews(data));
        });
        this.controller.getSources((data?: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;

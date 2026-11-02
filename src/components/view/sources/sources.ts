import './sources.css';

export interface SourceItem {
    name: string;
    id: number;
}

class Sources {
    draw(data: SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            if (!sourceItemTemp) return;
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceItemName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            if (sourceItemName) {
                sourceItemName.textContent = item.name;;
            }

            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', String(item.id));
            }

            fragment.append(sourceClone);
        });

        const sources = document.querySelector<HTMLElement>('.sources');
        if (sources) {
            sources.append(fragment);
        }
    }
}

export default Sources;

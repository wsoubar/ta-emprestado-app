export class Item {
    constructor(
        public $key: string,
        public descricao: string,
        public foto: string,
        public devolvido: boolean,
        public previsaoEntrega: Date,
        public dataEntrega: Date
    ) {
        //console.log('inside item constructor');
    }

    static fromJson({$key, descricao, foto, devolvido, previsaoEntrega, dataEntrega}): Item {
        return new Item($key, descricao, foto, devolvido, previsaoEntrega, dataEntrega);
    }

    static fromJsonList(array): Item[] {
        return array.map(Item.fromJson);
    }
    
}
const people = [
    {
        id: '11',
        name: 'David Joker',
        money: '20000',
        type: 'people',
        garage: [
            {
                id: '0',
                carName: 'BMW',
                model: 'e34',
                carPrice: '4000',
                engineVolume: '3.5',
                maxSpeed: '250',
                horsePower: '366',
            },
            {
                id: '2',
                carName: 'Audi',
                model: 'r8',
                carPrice: '4600',
                engineVolume: '3.7',
                maxSpeed: '260',
                horsePower: '380',
            },
        ],
    },
    {
        id: '12',
        name: 'Valeriy Meladze',
        money: '5000',
        type: 'people',
        garage: [
            {
                id: '0',
                carName: 'BMW',
                model: 'e34',
                carPrice: '4000',
                engineVolume: '3.5',
                maxSpeed: '250',
                horsePower: '366',
            },
            {
                id: '2',
                carName: 'Audi',
                model: 'r8',
                carPrice: '4600',
                engineVolume: '3.7',
                maxSpeed: '260',
                horsePower: '380',
            },
        ],
    },
    {
        id: '13',
        name: 'Donald Trump',
        money: '5000',
        type: 'people',
        garage: [
            {
                id: '0',
                carName: 'BMW',
                model: 'e34',
                carPrice: '4000',
                engineVolume: '3.5',
                maxSpeed: '250',
                horsePower: '366',
            },
            {
                id: '2',
                carName: 'Audi',
                model: 'r8',
                carPrice: '4600',
                engineVolume: '3.7',
                maxSpeed: '260',
                horsePower: '380',
            },
        ],
    },
]

function Item (name,money,type,peopleOrCompanyArr) {
    for(let i = 0; i < peopleOrCompanyArr.length; i++) {
        this.id = `${peopleOrCompanyArr.length + 1}`;

        if(this.id === peopleOrCompanyArr[i].id) {
            this.id++;
        }
    }

    this.name = name;
    this.money = money;
    this.type = type;
    this.garage = [];
}
const cars = [
    {
        id: '0',
        carName: 'BMW',
        model: 'e34',
        carPrice: '5000',
        engineVolume: '3.5',
        maxSpeed: '250',
        horsePower: '366',
    },
    {
        id: '1',
        carName: 'Audi',
        model: 'r8',
        carPrice: '5600',
        engineVolume: '3.7',
        maxSpeed: '260',
        horsePower: '380',
    },
    {
        id: '2',
        carName: 'Subaru',
        model: 'Impreza',
        carPrice: '5700',
        engineVolume: '3.6',
        maxSpeed: '280',
        horsePower: '366',
    },
    {
        id: '3',
        carName: 'Zaz 1102',
        model: 'Tavria Nova',
        carPrice: '1000',
        engineVolume: '1.3',
        maxSpeed: '180',
        horsePower: '66',
    },
]

function Car(carName,model,carPrice,engineVolume,maxSpeed,horsePower,parseCars) {

    for(let i = 0; i < parseCars.length; i++) {
        this.id = `${parseCars.length + 1}`;

        if(this.id === parseCars[i].id) {
            this.id++;
        }
    }

    this.carName = carName;
    this.model = model;
    this.carPrice = carPrice;
    this.engineVolume = engineVolume;
    this.maxSpeed = maxSpeed;
    this.horsePower = horsePower;
}
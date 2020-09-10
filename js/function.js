'use strict';
function showContent() {
    localStorageData();
    $('<button/>',{
      text: 'Car showroom',
      class: 'showBtn',
      id: 'showAutoRoom',
      click: handleShowCarsShop,  
    }).appendTo('#cars');

    $('<button/>',{
        text: 'Show people',
        class: 'showBtn',
        id: 'showPeople',
        click: handleShowPeople,  
      }).appendTo('#cars');

      $('<button/>',{
        text: 'Show company',
        class: 'showBtn',
        id: 'showCompany',
        click: handleShowCompany,  
      }).appendTo('#cars');
}

function handleShowCarsShop() {
    deleteContent();
    
    $('<div/>',{
        class: 'content',
        id: 'content',
    }).appendTo('#cars');

    createCarShop();
}

function createCarShop() {
    const parseCarsShop = JSON.parse(localStorage.getItem('cars'));

    $('<button/>',{
        text: 'Add new car',
        class: 'btnAddItem',
        id: 'btnAddItem',
        click: handleAddNewCar,
    }).appendTo('#content');
    

    for(let i = 0; i < parseCarsShop.length; i++) {
        $('<div/>',{
            class: 'item',
            id: 'item' + i,
        }).appendTo('#content').append(
            $('<h2/>',{
                text:  parseCarsShop[i].carName,
                class: 'name',
                id: 'name',
            }),
    
            $('<p/>',{
                text: 'Model: ' + parseCarsShop[i].model,
                class: 'info',
                id: 'name',
            }),
    
            $('<p/>',{
                text: 'Price: ' + parseCarsShop[i].carPrice + '$',
                class: 'info',
                id: 'name',
            }),
    
            $('<button/>',{
                text: 'View car',
                class: 'btnOwners',
                id: 'btnViewCar',
                click: handleViewCar,
                'data-carId': parseCarsShop[i].id,
            }),
    
            $('<button/>',{
                text: 'Delete car',
                class: 'btnOwners',
                id: 'btnDeleteCar',
                'data-carId': parseCarsShop[i].id,
                click: handleDeleteCar,
            }),
    
            $('<button/>',{
                text: 'Buy car',
                class: 'btnOwners',
                id: 'btnBuyCar',
                'data-carId': parseCarsShop[i].id,
                click: handleBuyCar,
            }),
        );
    }
}

function handleAddNewCar() {
    deleteContent();

    $('#cars').append(
        $('<div/>',{
            id: 'content',
            class: 'content',
        }).append(
            $('<div/>',{
                id: 'item',
                class: 'item',
            }).append(
                $('<h2/>', {
                    text: 'Add new car',
                }),
                $('<input/>', {
                    placeholder: 'Car brand',
                    class: 'addCarInfo',
                    id: 'carName',
                }),
                $('<input/>', {
                    placeholder: 'Car model',
                    class: 'addCarInfo',
                    id: 'carModel',
                }),
                $('<input/>', {
                    placeholder: 'Car price',
                    class: 'addCarInfo',
                    id: 'carPrice',
                }),
                $('<input/>', {
                    placeholder: 'Engine volume',
                    class: 'addCarInfo',
                    id: 'engineVolume',
                }),
                $('<input/>', {
                    placeholder: 'Max speed',
                    class: 'addCarInfo',
                    id: 'maxSpeed',
                }),
                $('<input/>', {
                    placeholder: 'Horse power',
                    class: 'addCarInfo',
                    id: 'horsePower',
                }),
                $('<button/>', {
                    id: 'btnAddCar',
                    text: 'OK',
                    click: handleBtnAddCar,
                }),
            ),
        ),
    )
}

function handleBtnAddCar() {
    const carsArr = JSON.parse(localStorage.getItem('cars'));
    addCar(carsArr);

    $('.addCarInfo').each(function () {
        $(this).blur( function () {
            $(this).removeClass('invalid')
        })
    })
}

function addCar(carsArr) {
    
    let addCar = new Car($('#carName').val(),$('#carModel').val(),$('#carPrice').val(),$('#engineVolume').val(),$('#maxSpeed').val(),$('#horsePower').val(),carsArr);
    let check = 0;
    let checkName = /[A-z]{1,}/;
    let checkModel = /\w/;
    let checkPrice = /^\d{1,}$/;
    let checkEngineVolume = /^\d{1,}$/;
    let checkMaxSpeed = /^\d{1,}$/;
    let checkHorsePower = /^\d{1,}$/;

    if($('#carName').val() === '' || $('#carName').val().match(checkName) === null) {
        $('#carName').addClass('invalid');
    } else {
        $('#carName').removeClass('invalid');
        check++
    }
    if($('#maxSpeed').val() === '' || $('#maxSpeed').val().match(checkMaxSpeed) === null || $('#maxSpeed').val() > 500) {
        $('#maxSpeed').addClass('invalid');

    } else {
        $('#maxSpeed').removeClass('invalid');
        check++;
    }
    if($('#carModel').val() === '' || $('#carModel').val().match(checkModel) === null) {
        $('#carModel').addClass('invalid');
    } else {
        $('#carModel').removeClass('invalid');
        check++;
    }
    if($('#carPrice').val() === '' || $('#carPrice').val().match(checkPrice) === null) {
        $('#carPrice').addClass('invalid');
    } else {
        $('#carPrice').removeClass('invalid');
        check++;
    }
    if($('#engineVolume').val() === '' || $('#engineVolume').val().match(checkEngineVolume) === null) {
        $('#engineVolume').addClass('invalid');
    } else {
        $('#engineVolume').removeClass('invalid');
        check++;
    }
    if($('#horsePower').val() === '' || $('#horsePower').val().match(checkHorsePower) === null) {
        $('#horsePower').addClass('invalid');
    } else {
        $('#horsePower').removeClass('invalid');
        check++;
    }

    if(check === 6) {
        carsArr.push(addCar);
        localStorage.setItem('cars',JSON.stringify(carsArr));
        deleteContent();
        handleShowCarsShop();
    } 
}

function handleBuyCar() {
    // const chooseCar = event.target.getAttribute('data-carId');
    const chooseCar = event.currentTarget.getAttribute('data-carid');

    deleteContent();

    $('#cars').append(
        $('<div>', {
            id: 'chooseBuy',
            class: 'confirmBlock',
        }).append(
            $('<h2>', {
                id: 'chooseTitle',
                text: 'Person or Company?',
            }),
            $('<button>', {
                id: 'choosePerson',
                class: 'confirmBlock__btn',
                text: 'Person',
                'data-carid': chooseCar,
                click: handlePersonBuyCar,
            }),
            $('<button>', {
                id: 'chooseCompany',
                class: 'confirmBlock__btn',
                text: 'Company',
                'data-carid': chooseCar,
                click: handleCompanyBuyCar,
            }),
        ),
    )
}

function handleCompanyBuyCar() {
    const carsSection = document.getElementById('cars');

    const carId = event.target.getAttribute('data-carId');
    const companyArr = JSON.parse(localStorage.getItem('company'));
    const parseCarsShop = JSON.parse(localStorage.getItem('cars'));

    const selectedCar = parseCarsShop.find(function (car) {
        return car.id === carId;
    })

    personOrCompany(selectedCar,companyArr);
}

function handlePersonBuyCar() {
    const carsSection = document.getElementById('cars');

    const carId = event.target.getAttribute('data-carId');
    const peopleArr = JSON.parse(localStorage.getItem('people'));
    const parseCarsShop = JSON.parse(localStorage.getItem('cars'));

    const selectedCar = parseCarsShop.find(function (car) {
        return car.id === carId;
    })

    personOrCompany(selectedCar,peopleArr);
}

function personOrCompany(selectedCar,peopleOrCompanyArr) {
    deleteContent();

    $('#cars').append(
        $('<form/>', {
            class: 'content',
        }).append(
            $('<div/>', {
                class: 'item',
            }).append(
                $('<h2/>', {
                    class: 'titleBuyForm',
                    text: `${selectedCar.carName} Price: ${selectedCar.carPrice}$,Choose person:`,
                })
            )
        )
    )

    const peopleArr = localStorage.getItem('people');
    const companyArr = localStorage.getItem('company');
    const checkArr = JSON.stringify(peopleOrCompanyArr);

    for(let i = 0; i < peopleOrCompanyArr.length; i++) {

        if(checkArr === peopleArr) {
            $('<p>', {
                id: 'chooseItem',
                class: 'name',
                click: handleItemBuyCar,
                'data-peopleid': peopleOrCompanyArr[i].id,
                text: `${peopleOrCompanyArr[i].name}, Money: ${peopleOrCompanyArr[i].money}$`,
                'data-carid': selectedCar.id,
                
            })
            .appendTo($('.item'))
        }
        if(checkArr === companyArr) {
            $('<p>', {
                id: 'chooseItem',
                class: 'name',
                click: handleItemBuyCar,
                'data-companyid': peopleOrCompanyArr[i].id,

                text: `${peopleOrCompanyArr[i].name}, Money: ${peopleOrCompanyArr[i].money}$`,
                'data-carid': selectedCar.id,
            }).appendTo($('.item'))
        }

        // $('#chooseItem').each(handleItemBuyCar());
    }   
}

function handleItemBuyCar() {
    const peopleId = event.target.getAttribute('data-peopleId');
    const companyId = event.target.getAttribute('data-companyId');
    const carId = event.target.getAttribute('data-carId');
    const parseCarsShop = JSON.parse(localStorage.getItem('cars'));
    const peopleArr = JSON.parse(localStorage.getItem('people'));
    const companyArr = JSON.parse(localStorage.getItem('company'));

    deleteContent();

    const selectedCar = parseCarsShop.find(function (car) {
        return car.id === carId;
    })

    $('#cars').append(
        $('<div/>', {
            class: 'confirmBlock',
        }).append(
            $('<h2>', {
                text: 'Confirm?',
            }),
            $('<button>', {
                class: 'confirmBlock__btn',
                id: 'btnYes',
                text: 'Yes',
                'data-carid': selectedCar.id,
            }),
            $('<button>', {
                class: 'confirmBlock__btn',
                id: 'btnNo',
                text: 'No',
            }),
        )
    )

    if(peopleId) {
        const selectedPeople = peopleArr.find(function (people) {
            return people.id === peopleId;
        })

        $('#btnYes').attr('data-peopleId', selectedPeople.id);
        $('#btnYes').click(function() {
            for(let i = 0; i < peopleArr.length; i++) { 
                if(peopleArr[i].id === selectedPeople.id) {
                    if(Number(peopleArr[i].money) < Number(selectedCar.carPrice)) {
                        notEnoughMoney();
                        
                    }
                    if(Number(peopleArr[i].money) >= Number(selectedCar.carPrice)) {
                        const indexElement = parseCarsShop.indexOf(selectedCar);
                        parseCarsShop.splice((indexElement),1);
                        localStorage.setItem('cars',JSON.stringify(parseCarsShop));

                        peopleArr[i].money = Number(peopleArr[i].money - selectedCar.carPrice).toString();
                        selectedCar.carPrice = (Number(selectedCar.carPrice) * 0.8).toString();
                        peopleArr[i].garage.push(selectedCar);
                        localStorage.setItem('people',JSON.stringify(peopleArr));
                        handleShowPeople();
                        confirmBlock.remove(); 
                    }
                }
            }
        })
    }
    if(companyId) {
        const selectedCompany = companyArr.find(function (company) {
            return company.id === companyId;
        })

        $('#btnYes').attr('data-companyId', selectedCompany.id);
        $('#btnYes').click(function() {
            for(let i = 0; i < companyArr.length; i++) {
                if(companyArr[i].id === selectedCompany.id) {
                    if(Number(companyArr[i].money) < Number(selectedCar.carPrice)) {
                        notEnoughMoney();
                    }
                    if(Number(companyArr[i].money) >= Number(selectedCar.carPrice)) {
                        const indexElement = parseCarsShop.indexOf(selectedCar);
                        parseCarsShop.splice((indexElement),1);
                        localStorage.setItem('cars',JSON.stringify(parseCarsShop));

                        companyArr[i].money = Number(companyArr[i].money - selectedCar.carPrice).toString();
                        selectedCar.carPrice = (Number(selectedCar.carPrice) * 0.8).toString();
                        companyArr[i].garage.push(selectedCar);
                        localStorage.setItem('company',JSON.stringify(companyArr));
                        handleShowCompany();
                        confirmBlock.remove();
                    } 
                }
            }
        })
    }
    
    $('#btnNo').click(function() {
        $('.confirmBlock').remove();
    })
}

function notEnoughMoney() {
    deleteContent();
    $('#cars').append(
        $('<div/>',{
            class: 'confirmBlock',
        }).append(
            $('<h2/>',{
                text: 'Not enough money',
            })
        )
    )
}

function handleDeleteCar() {
    deleteContent();
    const parseCarsShop = JSON.parse(localStorage.getItem('cars'));
    const carId = event.target.getAttribute('data-carId');

    const selectedCar = parseCarsShop.find(function (car) {
        return car.id === carId;
    })
    confirmDeleteCar(selectedCar,parseCarsShop);
}

function confirmDeleteCar(selectedCar,parseCarsShop) {
    $('#cars').append(
        $('<div/>', {
            class: 'confirmBlock',
        }).append(
            $('<h2/>',{
                text: 'Confirm?',
            }),
            $('<button/>',{
                text: 'Yes',
                class: 'confirmBlock__btn',
                click: function() {
                    const indexElement = parseCarsShop.indexOf(selectedCar);
                    parseCarsShop.splice((indexElement),1);
                    localStorage.setItem('cars',JSON.stringify(parseCarsShop));
                    handleShowCarsShop();
                    $('.confirmBlock').remove();
                }
            }),
            $('<button/>',{
                text: 'No',
                class: 'confirmBlock__btn',
                click: function() {
                    handleShowCarsShop();
                    $('.confirmBlock').remove();
                }
            }),
        )
    )
}

function handleViewCar() {
    const parseCarsShop = JSON.parse(localStorage.getItem('cars'));
    const carId = event.target.getAttribute('data-carId');

    const selectedCar = parseCarsShop.find(function (car) {
        return car.id === carId;
    })
    showCarInfo(selectedCar);
}

function showCarInfo(selectedCar) {
    deleteContent();

    $('#cars').append(
        $('<div/>',{
           class: 'content', 
        }).append(
            $('<div/>',{
                class: 'itemCar item',
            }).append(
                $('<h2/>',{
                    class: 'name',
                    text: selectedCar.carName,
                }),
                $('<p/>',{
                    class: 'info',
                    text: 'Model: ' + selectedCar.model,
                }),
                $('<p/>',{
                    class: 'info',
                    text: 'Price: ' + selectedCar.carPrice + '$',
                }),
                $('<p/>',{
                    class: 'info',
                    text: 'Engine volume: ' + selectedCar.engineVolume,
                }),
                $('<p/>',{
                    class: 'info',
                    text: 'Max speed: ' + selectedCar.maxSpeed,
                }),
                $('<p/>',{
                    class: 'info',
                    text: 'Horse power: ' + selectedCar.horsePower,
                }),
                $('<button/>',{
                    class: 'btnBack',
                    text: 'BACK',
                    click: handleShowCarsShop,
                }),
            )
        )
    )
}

function handleShowCompany() {
    deleteContent();
    const parseCompany = JSON.parse(localStorage.getItem('company'));

    createOwners(parseCompany);
}

function handleShowPeople() {
    deleteContent();
    const parsePeople = JSON.parse(localStorage.getItem('people'));

    createOwners(parsePeople);
}

function createOwners(parseObj) {
    const checkArr = JSON.stringify(parseObj);
    const peopleArr = localStorage.getItem('people');
    const companyArr = localStorage.getItem('company');

    $('#cars').append(
        $('<div/>',{
            class: 'content',
        }).append(
            $('<button/>',{
                class: 'btnAddItem',
                text: 'Add new item',
                id: 'btnAddItem',
                click: handleAddNewItem,
            })
        )
    )

    if(checkArr === peopleArr) {
        $('#btnAddItem').attr('data-newItemBtn','people');
    }
    if(checkArr === companyArr) {
        $('#btnAddItem').attr('data-newItemBtn','company');
    }

    
    for(let i = 0; i < parseObj.length; i++) {

        $('.content').append(
            $('<div/>',{
                class: 'item',
            }).append(
                $('<h2/>',{
                    class: 'name',
                    id: 'name',
                    text: parseObj[i].name,
                }),
                $('<p/>',{
                    id: 'money',
                    text: `Money: ${parseObj[i].money}$`,
                }),
                $('<ul/>',{
                    id: 'garageList' + i,
                }),
                $('<button/>',{
                    text: 'View garage',
                    class: 'btnOwners',
                    id: 'btnViewGarage' + i,
                    click: handleViewGarage,
                }),
                $('<button/>',{
                    text: 'Delete item',
                    class: 'btnOwners',
                    id: 'btnDeleteItem' + i,
                    click: handleDeleteItem,
                }),
            )
        )

        let garage = parseObj[i].garage;

        for(let j = 0; j < parseObj[i].garage.length; j++) {
            $('<li/>',{
                text: `${garage[j].carName} ${garage[j].carPrice}$`,
                'data-carid': garage[j].id,
            }).appendTo($('#garageList' + i));
        }

        if(checkArr === peopleArr) {
            $('#btnViewGarage' + i).attr('data-peopleId',parseObj[i].id);
            $('#btnDeleteItem' + i).attr('data-peopleId',parseObj[i].id);
        }
        if(checkArr === companyArr) {
            $('#btnViewGarage' + i).attr('data-companyId',parseObj[i].id);
            $('#btnDeleteItem' + i).attr('data-companyId',parseObj[i].id);
        }
    }
}

function handleDeleteItem() {
    deleteContent();
    const peopleId = event.target.getAttribute('data-peopleId');
    const companyId = event.target.getAttribute('data-companyId');

    $('#cars').append(
        $('<div/>',{
            class: 'confirmBlock',
        }).append(
            $('<h2/>', {
                text: 'Confirm?'
            }),
            $('<button/>', {
                text: 'Yes',
                class: 'confirmBlock__btn',
                id: 'btnYes',
                click: function() {
                    const peopleId = event.target.getAttribute('data-peopleId');
                    const companyId = event.target.getAttribute('data-companyId');
            
                    if(peopleId) {
                        const parsePeople = JSON.parse(localStorage.getItem('people'));
                        const selectedPeople = parsePeople.find(function (item) {
                            return item.id === peopleId;
                        })
                        const indexElement = parsePeople.indexOf(selectedPeople);
                        parsePeople.splice((indexElement),1);
                        localStorage.setItem('people',JSON.stringify(parsePeople));
                        handleShowPeople();
                    }
                    if(companyId) {
                        const parseCompany = JSON.parse(localStorage.getItem('company'));
                        const selectedCompany = parseCompany.find(function (item) {
                            return item.id === companyId;
                        })
                        const indexElement = parseCompany.indexOf(selectedCompany);
                        parseCompany.splice((indexElement),1);
                        localStorage.setItem('company',JSON.stringify(parseCompany));
                        handleShowCompany();
                    }
                    $('.confirmBlock').remove();
                },
            }),
            $('<button/>', {
                text: 'No',
                class: 'confirmBlock__btn',
                id: 'btnNo',
                click: function() {
                    handleShowCarsShop();
                    $('.confirmBlock').remove();
                }
            }),
        )
    )

    if(peopleId) {
        $('#btnYes').attr('data-peopleId',peopleId);
    }
    if(companyId) {
        $('#btnYes').attr('data-companyId',companyId);
    }  
}

function handleAddNewItem() {
    deleteContent();
    const checkItem = event.target.getAttribute('data-newItemBtn');


    $('#cars').append(
        $('<div/>',{
           class: 'content', 
        }).append(
            $('<div>',{
                class: 'item',
            }).append(
                $('<h2/>',{
                    text: 'Add new item',
                }),
                $('<input/>',{
                    class: 'itemInfo',
                    id: 'itemName',
                    placeholder: 'Name',
                }),
                $('<input/>',{
                    class: 'itemInfo',
                    id: 'itemMoney',
                    placeholder: 'Money',
                }),
                $('<button/>',{
                    text: 'OK',
                    class: 'btnOk',
                    click: function() {
                        let check = 0;
                        let checkName = /[A-Z][a-z]{1,}/;
                        let checkMoney = /\d/;
                
                        if($('#itemName').val() === '' || $('#itemName').val().match(checkName) === null) {
                            $('#itemName').addClass('invalid');
                        } else {
                            $('#itemName').removeClass('invalid');
                            check++
                        }
                        if($('#itemMoney').val() === '' || $('#itemMoney').val().match(checkMoney) === null) {
                            $('#itemMoney').addClass('invalid');
                        } else {
                            $('#itemMoney').removeClass('invalid');
                            check++;
                        }
                
                        if(checkItem === 'people' && check === 2) {
                            const parsePeopleArr = JSON.parse(localStorage.getItem('people'));
                            let addItem = new Item($('#itemName').val(),$('#itemMoney').val(),'people',parsePeopleArr);
                            parsePeopleArr.push(addItem);
                            localStorage.setItem('people',JSON.stringify(parsePeopleArr));
                            deleteContent()
                            handleShowPeople();
                        }
                        if(checkItem === 'company' && check === 2) {
                            const parseCompanyArr = JSON.parse(localStorage.getItem('company'));
                            let addItem = new Item($('#itemName').val(),$('#itemMoney').val(),'company',parseCompanyArr);
                            parseCompanyArr.push(addItem);
                            localStorage.setItem('company',JSON.stringify(parseCompanyArr));
                            deleteContent();
                            handleShowCompany();
                        }
                    },
                }),
            )
        )
    )

    $('.itemInfo').each(function () {
        $(this).blur( function () {
            $(this).removeClass('invalid')
        })
    })
}

function handleViewGarage() {
    const peopleId = event.target.getAttribute('data-peopleId');
    const companyId = event.target.getAttribute('data-companyId');
    const parsePeopleArr = JSON.parse(localStorage.getItem('people'));
    const parseCompanyArr = JSON.parse(localStorage.getItem('company'));

    deleteContent();

    if(peopleId) {
        const selectedItem = parsePeopleArr.find(function (people) {
            return people.id === peopleId;
        })
        showGarage(selectedItem);
    }
    if(companyId) {
        const selectedItem = parseCompanyArr.find(function (company) {
            return company.id === companyId;
        })
        showGarage(selectedItem);
    } 
}

function showGarage(selectedItem) {

    $('#cars').append(
        $('<div/>',{
            class: 'content',
        }).append(
            $('<h2/>',{
                text:`Garage ${selectedItem.name}`,
                class: 'contentTitle',
            })
        )
    )

    for(let i = 0; i < selectedItem.garage.length; i++) {
        $('<div/>',{
            class: 'item',

        }).append(
            $('<h2/>',{
                text: selectedItem.garage[i].carName,
            }),
            $('<p/>',{
                text: `Model: ${selectedItem.garage[i].model}`,
            }),
            $('<p/>',{
                text: `Price: ${selectedItem.garage[i].carPrice}$`,
            }),
            $('<p/>',{
                text: `Engine volume: ${selectedItem.garage[i].engineVolume}`,
            }),
            $('<p/>',{
                text: `Max speed: ${selectedItem.garage[i].maxSpeed}`,
            }),
            $('<p/>',{
                text: `Horse power: ${selectedItem.garage[i].horsePower}`,
            }),
            $('<button/>',{
                'data-carid': selectedItem.garage[i].id,
                text: 'Sell car',
                id: 'sellCar' + i,
                click: handleSellCar,
            }),
        ).appendTo($('.content'))

        if(selectedItem.type === 'people') {
            $('#sellCar' + i).attr('data-peopleId',selectedItem.id);
        }
        if(selectedItem.type === 'company') {
            $('#sellCar' + i).attr('data-companyId',selectedItem.id);
        }
    }
}

function handleSellCar() {
    const peopleId = event.target.getAttribute('data-peopleId');
    const companyId = event.target.getAttribute('data-companyId');
    const carId = event.target.getAttribute('data-carId');
    const parseCompanyArr = JSON.parse(localStorage.getItem('company'));
    deleteContent();

    $('#cars').append(
        $('<div/>',{
            class: 'confirmBlock',
        }).append(
            $('<h2/>', {
                text: 'Confirm?'
            }),
            $('<button/>', {
                text: 'Yes',
                class: 'confirmBlock__btn',
                id: 'btnYes',
                'data-carid': carId,
                click: handleBtnYesSellCar,
            }),
            $('<button/>', {
                text: 'No',
                class: 'confirmBlock__btn',
                id: 'btnNo',
                click: function() {
                    handleShowCarsShop();
                    $('.confirmBlock').remove();
                }
            }),
        )
    )

    if(peopleId) {
        $('#btnYes').attr('data-peopleId',peopleId);
    }
    if(companyId) {
        $('#btnYes').attr('data-companyId',companyId);
    }

}

function handleBtnYesSellCar() {
    const peopleId = event.target.getAttribute('data-peopleId');
    const companyId = event.target.getAttribute('data-companyId');
    const carId = event.target.getAttribute('data-carId');
    deleteContent();
    
    if(peopleId) {
        const parsePeopleArr = JSON.parse(localStorage.getItem('people'));
        const selectedPeople = parsePeopleArr.find(function (person) {
            return person.id === peopleId;
        })
    
        let garageArr = selectedPeople.garage;
    
        const selectedCar = garageArr.find(function(car) {
            return car.id === carId;
        })
    
        selectedPeople.money = (Number(selectedPeople.money) + Number(selectedCar.carPrice)).toString();
    
        const indexElement = garageArr.indexOf(selectedCar);
        garageArr.splice((indexElement),1);
    
        const indexPeople = parsePeopleArr.indexOf(selectedPeople);
    
        parsePeopleArr.splice(indexPeople,selectedPeople);
        localStorage.setItem('people',JSON.stringify(parsePeopleArr));
    
        const parseCarArr = JSON.parse(localStorage.getItem('cars'));
        selectedCar.carPrice = (Number(selectedCar.carPrice) + 1000).toString();
        parseCarArr.push(selectedCar);
        localStorage.setItem('cars',JSON.stringify(parseCarArr));
        handleShowPeople();
    }

    if(companyId) {
        const parseCompanyArr = JSON.parse(localStorage.getItem('company'));
        
        const selectedCompany = parseCompanyArr.find(function (company) {
            return company.id === companyId;
        })

    
        let garageCompanyArr = selectedCompany.garage;
    
        const selectedCar = garageCompanyArr.find(function(car) {
            return car.id === carId;
        })
    
        selectedCompany.money = (Number(selectedCompany.money) + Number(selectedCar.carPrice)).toString();
    
        const indexElement = garageCompanyArr.indexOf(selectedCar);
        garageCompanyArr.splice((indexElement),1);
    
        const indexPeople = parseCompanyArr.indexOf(selectedCompany);
    
        parseCompanyArr.splice(indexPeople,selectedCompany);
        localStorage.setItem('company',JSON.stringify(parseCompanyArr));
    
        const parseCarArr = JSON.parse(localStorage.getItem('cars'));
        selectedCar.carPrice = (Number(selectedCar.carPrice) + 1000).toString();
        parseCarArr.push(selectedCar);
        localStorage.setItem('cars',JSON.stringify(parseCarArr));
        handleShowCompany();
    }
    
}

function localStorageData() {
    const carsStorage = localStorage.getItem('cars');
    if(!carsStorage) {
        localStorage.setItem('cars', JSON.stringify(cars));
    }

    const peopleStorage = localStorage.getItem('people');
    if(!peopleStorage) {
        localStorage.setItem('people', JSON.stringify(people));
    }

    const companyStorage = localStorage.getItem('company');
    if(!companyStorage) {
        localStorage.setItem('company', JSON.stringify(company));
    }
}

function deleteContent() {
    const contentClass = document.querySelectorAll('.content');
    const confirmBlock = document.querySelector('.confirmBlock');

    if(confirmBlock) {
        confirmBlock.remove();
    }

    if(contentClass) {
        for(let i = 0; i < contentClass.length; i++) {
            contentClass[i].remove();
        }

    }
}
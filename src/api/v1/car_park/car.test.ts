import axios from 'axios'
import * as testvalidate from '../../../utils/validation'



test('Test validate size car small Uppercase', () => {
    const result = testvalidate.valiDateCarSize('SMALL')
    expect(result).toBe(true)
});

test('Test validate size car medium Uppercase', () => {
    const result = testvalidate.valiDateCarSize('MEDIUM')
    expect(result).toBe(true)
});

test('Test validate size car large Uppercase', () => {
    const result = testvalidate.valiDateCarSize('LARGE')
    expect(result).toBe(true)
});

test('Test validate size car small Lowercase', () => {
    const result = testvalidate.valiDateCarSize('small')
    expect(result).not.toBe(true)
});

test('Test validate size car medium Lowercase', () => {
    const result = testvalidate.valiDateCarSize('medium')
    expect(result).not.toBe(true)
});

test('Test validate size car large Lowercase', () => {
    const result = testvalidate.valiDateCarSize('large')
    expect(result).not.toBe(true)
});

test('Test validate size car invalid', () => {
    const result = testvalidate.valiDateCarSize('mediumsss')
    expect(result).not.toBe(true)
});

test('Test validate parking status AVAILABLE', () => {
    const result = testvalidate.valiDateStatusParkingLot('AVAILABLE')
    expect(result).toBe(true)
});

test('Test validate parking status UNAVAILABLE', () => {
    const result = testvalidate.valiDateStatusParkingLot('UNAVAILABLE')
    expect(result).toBe(true)
});

test('Test validate parking status invalid', () => {
    const result = testvalidate.valiDateStatusParkingLot('AVAILABLeE')
    expect(result).toBe(false)
});

test('Test Create parking lot status 200', async () => {
    const body = {
        parkingSlot: `AB${Math.floor(Math.random() * 9999999)}`,
        stat: 'AVAILABLE',
        lat: 123.11,
        long: 111.22
    }
    const result = (await axios.post('http://localhost:8090/api/v1/parking/create', body)).status

    expect(result).toBe(200)
});


test('Test Create parking lot failed (Should test failed)', async () => {
    const body = {
        parkingSlot: 'A999',
        stat: 'UNAVAILABLEAAA',
        lat: 123.11,
        long: 111.22
    }
    const result = (await axios.post('http://localhost:8090/api/v1/parking/create', body)).status

    expect(result).toBe(400);
});


test('Test to park car size small medium large (Most chances should be right.)', async () => {
    const size = ['SMALL', 'MEDIUM', 'LARGE']
    
    const body = {
        numbPlate: `AB${Math.floor(Math.random() * 9999999)}`, 
        carSize: size[Math.floor(Math.random() * 3)]
    }
    const result = (await axios.post('http://localhost:8090/api/v1/parking/parkcar', body)).status

    expect(result).toBe(200);
});


test('Test leave slot(Should success because parking slot name right.)', async () => {
    const body = {
        parkingSlot: 'A2'
    }
    const result = (await axios.post('http://localhost:8090/api/v1/parking/leave', body)).status

    expect(result).toBe(200);
});


test('Test leave slot(Should failed because parking slot name wrong.)', async () => {
    const body = {
        parkingSlot: 'A3245678654356786542'
    }
    const result = (await axios.post('http://localhost:8090/api/v1/parking/leave', body)).status

    expect(result).not.toBe(200);
});


test('Test get parking status 200', async () => {
   
    const result = (await axios.get('http://localhost:8090/api/v1/parking/status')).status

    expect(result).toBe(200);
});


test('Test registration plate number list by car size status 200', async () => {
   
    const result = (await axios.get('http://localhost:8090/api/v1/car/size')).status

    expect(result).toBe(200);
});


test('Test registration allocated slot number list by car size status 200', async () => {
   
    const result = (await axios.get('http://localhost:8090/api/v1/car/allocate/size')).status

    expect(result).toBe(200);
});
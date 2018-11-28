import phones from './mockPhones';

export const fetchPhones = async () => {
    return new Promise(resolved => {
        resolved(phones) 
    })
}
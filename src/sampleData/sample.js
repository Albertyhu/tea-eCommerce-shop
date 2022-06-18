import { GenUserID } from '../screens/nonMember/genUserID.js'; 

export var users = [{
    userID: 'Gsgzxxefefee', 
    authToken: GenUserID(), 
    first_name: "Ron",
    last_name: "Swanson",
    email: "ron@aol.com",
    password: "password",
    shipping: {
        address1: '742 Evergreen Terrace',
        address2: 'n/a',
        city: 'Springfield',
        state: 'Illinois',
        zipcode: '94575',
        country: "US"
    },
    billing: {
        address1: '742 Evergreen Terrace',
        address2: 'n/a',
        city: 'Springfield',
        state: 'Illinois',
        zipcode: '94575',
        country: "US"
    },

}]


export var reviews = [
        {
            ID: 0,
            rating: 4,
            review: "I have always had peppermint tea in the cupboard, having to take lots of medication, including indigestion tablets, I find this drink helps me a lot.",
        },
        {
            ID: 1,
            rating: 4,
            review: "Tried and bought it in a store in US. My sister loved it and I gave her more than half of my package. Perfect for the holiday..",
        },
        {
            ID: 2,
            rating: 4,
            review: "The leaves arrived fresh. I made a pot from them immediately and one sip gave me a sense of alertness and clarity. I would recommend this product to anyone.",
        },
    ]

export var orders = [] 
const { name } = require('ejs');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelper');

mongoose.connect('mongodb://localhost:27017/traveller', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("database connected");
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<1000; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*10000) + 200;
        const camp = new Campground({
            author: '6054826aa5d58d7c708dc35a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: price,
            geometry: { 
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ],
                 type: 'Point' 
            },
            description: "this is just a random description",
            images: {
                url: 'https://res.cloudinary.com/dy30iqvlf/image/upload/v1617558868/traveller/iofxa9ncyvbuyn8j0oos.jpg',
                filename: 'traveller/iofxa9ncyvbuyn8j0oos'
            }
        })
        await camp.save();
    }
}

seedDB();
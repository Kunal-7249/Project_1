
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');



mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected');
});


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1340);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //My Author Id
            author: '61b0ec63bc364e9b6f2bb323',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, sed laboriosam asperiores vitae, alias amet consequuntur natus incidunt et praesentium dignissimos a magni. Enim natus praesentium molestiae adipisci earum obcaecati, veritatis possimus iste consectetur nemo, voluptatem blanditiis voluptate repudiandae perspiciatis, debitis id voluptatibus sint rem error omnis!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dcjun6yis/image/upload/v1639214899/YelpCamp/kvhyvma1slaqjxjmf1ml.jpg',
                    filename: 'YelpCamp/kvhyvma1slaqjxjmf1ml',
                },
                {
                    url: 'https://res.cloudinary.com/dcjun6yis/image/upload/v1639214901/YelpCamp/qvdkuwahetvxnu1heoqp.jpg',
                    filename: 'YelpCamp/qvdkuwahetvxnu1heoqp',
                }
            ]
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})
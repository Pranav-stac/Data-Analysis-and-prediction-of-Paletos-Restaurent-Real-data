import React, { useState } from 'react';
import SalesCard from '../components/SalesCard';
import PerformanceCard from '../components/PerformanceCard';
import Earnings from '../components/Earnings';

function Home() {
    const [itemsToPlot, setItemsToPlot] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    // Define options for the dropdown
    const options = ['TEA', 'Naan', 'Roti', 'Clams', 'LASSI', 'Raita', 'COFFEE', 'OMELETTE', 'Sol Kadi', 'ALOO GOBI', 'Curd Rice', 'Dal Tadka', 'EGG GASSI', 'Ghee Rice', 'Jal Jeera', 'Kokum Rus', 'Kori Roti', 'Tawa Lamb', 'VEG KADAI', 'VEG PULAO', 'EGG MASALA', 'Jeera Rice', 'Kai Yooung', 'Lemon Rice', 'MILK SHAKE', 'Methi Lamb', 'Methi Roti', 'Missi Roti', 'PEAS PULAO', 'VEG CRISPY', 'ALOO KULCHA', 'ALOO MUTTER', 'Appam (2pc)', 'Avadhi Lamb', 'Baby Kulcha', 'Butter Milk', 'Butter Naan', 'Butter Roti', 'Crispy Corn', 'DAL KHICHDI', 'Dehati Lamb', 'Dehati Murg', 'EGG BHURJEE', 'EGG BIRYANI', 'GAJAR HALWA', 'GARLIC ROTI', 'GULAB JAMUN', 'Garlic Naan', 'Green Salad', 'Khasta Roti', 'MALAI KULFI', 'MANGO KULFI', 'Malai Kofta', 'PLAIN GASSI', 'Papad Fried', 'Pindi Chana', 'TOMATO SOUP', 'Tomato Rice', 'ALOO PARATHA', 'Ceasar Salad', 'Cheeese Naan', 'Chicken Stew', 'Coconut Rice', 'DOODHI HALWA', 'Diwani Handi', 'Garlic Bread', 'Hawain Salad', 'Indian Rawas', 'Khasta Chaat', 'MASALA CHAAS', 'MUTTON SUKHA', 'Maratha Lamb', 'Methi Paneer', 'Mutton Korma', 'ONION KULCHA', 'PALAK PANEER', 'PANEER KADAI', 'PANEER TIKKA', 'Papad Masala', 'Plain Kulcha', 'Roomali Roti', 'Tawa Chicken', 'Teriyaki Veg', 'Tossed Salad', 'VEG SANDWICH', 'ANGOORI RABDI', 'Amritsari Dal', 'Butter Kulcha', 'CHICKEN GASSI', 'CHICKEN KADAI', 'CHICKEN SUKHA', 'Chicken Hunan', 'Chicken Korma', 'Chinese Rawas', 'Chinese Squid', 'Devil Chicken', 'Dhabe Da Lamb', 'Dhabe Da Murg', 'GARLIC KULCHA', 'Ghost Sofiana', 'KUNG PAO TOFU', 'LASOONI PALAK', 'Malysian Soup', 'Methi Chicken', 'Multani Murgh', 'Nilgiri Korma', 'PALAK KHICHDI', 'Paratha Plain', 'Reshmi Paneer', 'Subzi Ka Mela', 'Subzi Noorani', 'TANDOORI ALOO', 'TANDOORI GOBI', 'VEG KOLHAPURI', 'Avadhi Chicken', 'Bhara Hua Aloo', 'Butter Paratha', 'Chicken Hoisin', 'Chilli Chicken', 'Chinese Surmai', 'Coastal Surmai', 'Dingri Lasooni', 'EGG GHEE ROAST', 'MOONGDAL HALWA', 'Multani Mutton', 'Navratan Pulao', 'Neer Dosa(4pc)', 'PUDINA PARATHA', 'Phalguni Sabzi', 'Stuffed Kulcha', 'Tandoori Rawas', 'VEG MAKHANWALA', 'Vegetable Stew', 'Chatpata Paneer', 'Dal Palak Ghost', 'KUNG PAO PANEER', 'Kung Pao Patato', 'Maratha Chicken', 'Mirchi Ka Salan', 'Murg Makhanwala', 'Murgh -ka-salan', 'Murgh Tikhalaal', 'Paneer Khurchan', 'Paneer Lawabdar', 'Paratha Stuffed', 'Peshawari Kofta', 'Shitake Chicken', 'Spicy Crab Soup', 'Tandoori Surmai', 'VEG SHEEK KABAB', 'Veg Cheesy Roll', 'Vegetable Gassi', 'Zafrani Chicken', 'Chicken Clay Pot', 'Chinese Pompfret', 'Coastal Pompfret', 'Ghost Hara Pyaaz', 'Kung Pao Chicken', 'LUCKNOWI CHICKEN', 'Ludhiyani Tangdi', 'MILLENNIUM KULFI', 'Mushroom Galauti', 'Mutton Tikhalaal', 'Prawns Green Fry', 'SAHI GULAB KULFI', 'Subzi Bhara Aloo', 'Chettinad Chicken', 'DAL PALAK KHICHDI', 'Edemunchi Chicken', 'Indian Prawns REG', 'KESAR PISTA KULFI', 'Kalonji Ka Baigan', 'Kumbh Makai Palak', 'MUSHROOM DO PYAZA', 'MUTTON GHEE ROAST', 'MUTTON ROGAN JOSH', 'Murg Tikka Nawabi', 'OMELETTE SANDWICH', 'PANEER CHILLY DRY', 'PANEER MAKHANWALA', 'Saladde Annabella', 'Subzi Papdi Sheek', 'TANDOORI BROCCOLI', 'TOMATO BASIL SOUP', 'VANILLA ICE CREAM', 'BUTTER GARLIC NAAN', 'BUTTER GARLIC ROTI', 'Butter Baby Kulcha', 'CHICKEN GHEE ROAST', 'Chicken Mallipuram', 'Chinese Prawns REG', 'Coastal Prawns REG', 'Dum Aloo Amritsari', 'Fresh Garden Salad', 'Karele Kaju Masala', 'MALWANI BOMBIL FRY', 'Malwani Bombil Fry', 'Methi Malai Mutter', 'PANEER HAKKA STYLE', 'PANEER MALAI TIKKA', 'Paneer Ke Shikanje', 'Seafood Combo Soup', 'Subzi Kofta Masala', 'Thod Man Khow Phad', 'VEG MANCHURIAN DRY', 'Veg Barbeque Sauce', 'Amaercian Cole Slaw', 'Bhindi Mirch Masala', 'Bukhara Kofta Curry', 'Butter Roomali Roti', 'CHOCOLATE ICE CREAM', 'Cheese Garlic Bread', 'Dum Paneer Kalamiri', 'KULFI RABDI FALOODA', 'Murg Pudhina Masala', 'Murgh Bharta Masala', 'PANEER PAHADI TIKKA', 'Paneer Tikka Masala', 'Pepper Blast Paneer', 'Prawns Tom Kha Soup', 'Prawns Tom Yum Soup', 'STRAWERRY ICE CREAM', 'Subzi Kurkure Kebab', 'Tandoori Prawns REG', 'Tishing Hai Chicken', 'Veg Sweet Corn Soup', 'BUTTER GARLIC KULCHA', 'Cheese & Garlic Naan', 'Chicken Jeera Masala', 'Chilly Crispy Patato', 'MUSHROOM HAKKA STYLE', 'Nalli Kashmiri Rogan', 'PANEER BUTTER MASALA', 'Paneer Saffron Tikka', 'Pepper Blast Chicken', 'ROASTED ALMOND KULFI', 'Rajasthani Laal Maas', 'Sea Food Dum Biryani', 'Subzi Maharaja Sheek', 'Subzi Methi Ki Sheek', 'BUTTER PUDINA PARATHA', 'Chilly Basil Mushroom', 'Crispy Spinach Paneer', 'Healthy Wealthy Salad', 'Chicken Barbeque Sauce', 'Chicken In Chilly Soya', 'Crispy Spinach Chicken', 'Green Pepper Crab Soup', 'Lacchedar Paratha/Naan', 'Lacchedar Paratha/naan', 'Malabari Paratha (1pc)', 'Paneer Peri Peri Tikka', 'BUTTER SCOTCH ICE CREAM', 'Chutney Stuffed Pomfret', 'Exotic Hot Pot Vegtable', 'CHICKEN GRILLED SANDWICH', 'Cheese Aur Subz Ki Sheek', 'Clams Chilly & Coriander', 'FRUIT OVERLOAD ICE CREAM', 'Paneer Kofta Hara Masala', 'Seafood Creamy Corn Soup', 'Bandas (squid) Masala Fry', 'Chicken In Szechwan Style', 'Crispy Chicken Chef Style', 'Indian Malwani Bombil Fry', 'Roast Lamb In Black Peper', 'Basil Garlic Cheesy Potato', 'Chicken In Malaysian Curry', 'Chicken Samble Oelek Sauce', 'Coastal Malwani Bombil Fry', 'Exotic Stir Fried Vegetable', 'Spicy Chilly Garlic Chicken', 'Chicken Pepper Chilly Garlic', 'Moong Dal Aur Methi Ki Subzi', 'Roast Lamb In Hongkong Style', 'Fresh Spinach & Lettuce Salad', 'Hari Subzi Aur Makai Ki Sheek', 'Roast Lamb In Honey And Ginger', 'Chicken In Chilly Mustard Sauce', 'Exotic Veg In Sambal Oelek Sauce', 'Shredded Chicken In Mixed Pepper', 'Clams In Sukha Mangalorian Masala', 'Cottage Cheese With Three Peppers', 'Stir Fried Chicken Chilly & Basil', 'Assorted Indian Breads ( 7 Types )', 'Chicken & Mushroom In Oyster Sauce', 'Spice Corn Ball In Choice Of Sauce', 'Tandoori Pomfrate Regular (400gms)', 'HONEY NOODLES WITH VANILLA ICE CREAM', 'Brocoli,babycorn Mushroom Sizzle Chilly', 'Steam Chicken With Stir Fried Vegetables', 'Assorted Stir Fried Vegetable Salt & Pepper', 'Three Treasure Vegetables In Choice Of Sauce', 'Cottage Cheese & Mushroom In Black Bean Sauce', 'Mushroom Paneer Babycorn In Red Chilli Flakes', 'Paneer Baby Corn Water Chesnut Brocoli In Sambal Sauce', 'Tofu,Babycorn,Mushroom,Broccoli In Lemon & Paper Sauce', 'Tofu,babycorn,mushroom,broccoli In Lemon & Paper Sauce', 'Coastal Crab', 'Coastal Clams', 'Chinese Crab', 'Indian Surmai', 'Tandoori Prawns (100 Gms)', 'Chaas', 'Lassi', 'Kulcha', 'Phulka', 'Thepla', 'Farmers', 'Risotto', 'Aloo Gobi', 'CURD RICE', 'GHEE RICE', 'Green Tea', 'Misal Pav', 'Palak Dal', 'AGLIO OLIO', 'Aloo Chaat', 'Aloo Jeera', 'Dal Dhokli', 'Dal Shorba', 'JEERA RICE', 'LEMON RICE', 'Milk Shake', 'Puran Poli', 'Veg Ceaser', 'Banana Vada', 'Batata Vada', 'Cheese Naan', 'DAL MAKHANI', 'Dal Khichdi', 'Gatta Subzi', 'Makkai Roti', 'Masala Chai', 'Pind Da Dal', 'TOMATO RICE', 'Veg Jaipuri', 'Achari Aaloo', 'Boondi Raita', 'FRENCH FRIES', 'Masala Bhaat', 'Masala Chaas', 'Masala Papad', 'Palak Shorba', 'Pizza Rustic', 'Sama Khichdi', 'Bajra Khichdi', 'Butter Phulka', 'Channa Masala', 'Dahi Ke Kabab', 'Dal Panchvati', 'Deewani Handi', 'Filter Coffee', 'Gujrati Kadhi', 'Khum E Lazeez', 'Matka Biryani', 'Mexican Tacos', 'Mezze Platter', 'Pizza Sicilia', 'Sabudana Vada', 'Shabnam Curry', 'AL FORNO PASTA', 'Cucumber Raita', 'Farali Pattice', 'Kadai Mushroom', 'Kashmiri Pulao', 'Kashmiri Raita', 'Laccha Paratha', 'Phalguni Subzi', 'Pudina Paratha', 'Red Bean Salad', 'Sabudana Kheer', 'Stuffed Pratha', 'Tamatar Shorba', 'Veg Quesadilla', 'Fada Nu Khichdi', 'Harabhara Kabab', 'Kathiyawadi Dal', 'Lasaniya Batata', 'Mili Juli Handi', 'Paneer Lababdar', 'Paneer Makhmali', 'Papdi Nu Khichu', 'Pineapple Raita', 'Corn Methi Tikki', 'Dal Bhati Churma', 'Kundani Mushroom', 'Pizza Nepolitana', 'Rajasthani Kadhi', 'Sabudana Khichdi', 'Veg Keema Masala', 'Butter Missi Roti', 'Dahi Pakoda Kadhi', 'Pomegranate Raita', 'Ringna Fry Masala', 'Sev Tamatar Subzi', 'Subzi Kadai Pulao', 'Zafrani Rath Aloo', 'Bruscheta Pomodoro', 'Butter Cheese Naan', 'Butter Garlic Naan', 'Butter Khasta Roti', 'Butter Makkai Roti', 'Jeera Mutter Pulao', 'Masala Dal Khichdi', 'Methi Mutter Malai', 'Palak Kofta Masala', 'Palak Methi Paneer', 'Paneer Tawa Masala', 'Ravioli Pink Sauce', 'Shaam Savera Kofta', 'Texan Burrito Bowl', 'Mix Vegetable Raita', 'Tandoori Bhare Aloo', 'Tikhe Tandoori Aloo', 'Gujrati Khichdi Kadi', 'Khichiya Papad Fried', 'Mini Burgers (3 Pcs)', 'Brocolli Almond Soups', 'Butter Laccha Paratha', 'Butter Pudina Paratha', 'Canadian Cheese Soups', 'Gujrati Baigan Bharta', 'Khichiya Masala Papad', 'Paneer Makhmali Seekh', 'Tamatar Paneer Bharta', 'Khichiya Papad Roasted', 'Paneer Peshawari Tikka', 'Paneer Tikka Lal Mirch', 'Rajasthani Dal Khichdi', 'Baby Betroot And Orange', 'CHATAPATI BHINDI MASALA', 'GOBI SOYA KHEEMA ADRAKI', 'Crespelle Sicillian Style', 'Mirch Pudina Paneer Tikka', 'Watermellon & Feta Cheese', 'Chilly And Cheese Brocolli', 'South Indian Filter Coffee', 'Tawa Burgers In Desi Style', 'Hydrabadi Dum Pukht Biryani', 'Mumbai Masala Grill Sandwich', 'Baby Spinach & Lenttil Risotto', 'Kale Dry Cranberry With Quinoa', 'Pan Grilled Paneer & Asian Veg', 'Paneer Tikka Submarine Sandwich', 'Subzi Chilli Milli Cheese Seekh', 'Mint, Carrot & Tomato Ginger Soups', 'Malaysian Coconut Noodle & Asian Veg Soup', 'Seafood Suimono Soup', 'BAVARIAN CHOCOLATE ICE CREAM', 'Chinese Prawns', 'Chinese Clams', 'Indian Pompfret', 'Murgh -Ka-Salan', 'Brocoli,Babycorn Mushroom Sizzle Chilly'];

    const handleInputChange = (event) => {
        setItemsToPlot(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting items to plot:', itemsToPlot);

        try {
            const response = await fetch('https://stable-simply-porpoise.ngrok-free.app/forecast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items_to_plot: itemsToPlot.split(',') }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageObjectUrl = URL.createObjectURL(blob);
                setImageUrl(imageObjectUrl);
                console.log('Image URL:', imageObjectUrl);
            } else {
                console.error('Failed to fetch the image');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='w-full h-full bg-[#1D1C22] py-12 px-9 rounded-l-[30px] flex flex-col gap-7'>
            <p className='text-white font-signPainter text-6xl'>Dashboard</p>
            <div className="grid grid-cols-6 grid-rows-4 gap-3">
                <div className="col-span-4 row-span-2 bg-[#111111] rounded-3xl">
                    <SalesCard />
                </div>
                <div className="col-span-2 row-span-2 bg-[#111111] rounded-3xl">
                    <PerformanceCard />
                </div>
                <div className="col-span-2 row-span-2 bg-[#111111] rounded-3xl p-4">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="itemsToPlot" className="text-white">Select Item to Plot:</label>
                        <select
                            id="itemsToPlot"
                            value={itemsToPlot}
                            onChange={handleInputChange}
                            className="bg-[#111111] text-white rounded-md p-2 w-full"
                        >
                            <option value="" disabled>Select an option</option>
                            {options.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                        <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-2">Submit</button>
                    </form>
                    {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Fetched plot" className="rounded-md" />
                </div>
            )}
                    {/* Additional content can go here */}
                </div>
                <div className="col-span-4 row-span-2 bg-[#111111] rounded-3xl">
                    <Earnings />
                </div>
            </div>
        </div>
    );
}

export default Home;
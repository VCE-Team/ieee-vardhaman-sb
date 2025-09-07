// Script to add missing IEEE societies to the database
const axios = require('axios');

const API_BASE_URL = 'http://localhost:8081/api';

const newSocieties = [
    {
        name: 'IEEE Systems, Man, and Cybernetics Society',
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        description: 'Dedicated to the advancement of systems engineering, human-machine systems, and cybernetics.',
        vision: 'To advance systems science and cybernetics for societal benefit.',
        mission: 'To promote research in systems engineering and human-machine interaction.',
        objectives: 'To foster innovation in systems science and cybernetic applications.',
        isActive: true,
        memberCount: 55,
        establishedYear: 2018
    },
    {
        name: 'IEEE Information Theory Society',
        image: 'https://cdn-icons-png.flaticon.com/512/2966/2966226.png',
        description: 'Focused on information theory, coding, and data compression technologies.',
        vision: 'To advance information theory for communication and data processing systems.',
        mission: 'To promote research in information theory and coding techniques.',
        objectives: 'To foster innovation in information processing and communication theory.',
        isActive: true,
        memberCount: 40,
        establishedYear: 2019
    },
    {
        name: 'IEEE Computational Intelligence Society',
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135689.png',
        description: 'Dedicated to computational intelligence including neural networks, fuzzy systems, and evolutionary computation.',
        vision: 'To advance computational intelligence for solving complex problems.',
        mission: 'To promote research in artificial intelligence and machine learning.',
        objectives: 'To foster innovation in AI, neural networks, and intelligent systems.',
        isActive: true,
        memberCount: 65,
        establishedYear: 2020
    },
    {
        name: 'IEEE Society on Social Implications of Technology',
        image: 'https://cdn-icons-png.flaticon.com/512/3003/3003035.png',
        description: 'Focused on the social, ethical, and environmental implications of technology.',
        vision: 'To advance understanding of technology\'s impact on society.',
        mission: 'To promote responsible technology development and deployment.',
        objectives: 'To foster discussion on ethical technology use and social responsibility.',
        isActive: true,
        memberCount: 35,
        establishedYear: 2021
    },
    {
        name: 'IEEE Power Electronics Society',
        image: 'https://cdn-icons-png.flaticon.com/512/2942/2942813.png',
        description: 'Focused on power electronics, including converters, inverters, and power management systems.',
        vision: 'To advance power electronics technology for efficient energy conversion.',
        mission: 'To promote research and development in power electronics.',
        objectives: 'To foster innovation in power conversion and energy efficiency.',
        isActive: true,
        memberCount: 70,
        establishedYear: 2019
    },
    {
        name: 'IEEE Geoscience and Remote Sensing Society',
        image: 'https://cdn-icons-png.flaticon.com/512/2917/2917995.png',
        description: 'Dedicated to geoscience and remote sensing technologies for Earth observation and monitoring.',
        vision: 'To advance geoscience and remote sensing for Earth system understanding.',
        mission: 'To promote research in Earth observation and environmental monitoring.',
        objectives: 'To foster innovation in satellite technology and environmental sensing.',
        isActive: true,
        memberCount: 50,
        establishedYear: 2020
    }
];

async function addSocieties() {
    try {
        // Get existing societies
        const response = await axios.get(`${API_BASE_URL}/societies`);
        const existingSocieties = response.data;
        const existingNames = existingSocieties.map(s => s.name.toLowerCase());

        console.log(`Found ${existingSocieties.length} existing societies`);

        for (const society of newSocieties) {
            if (!existingNames.includes(society.name.toLowerCase())) {
                try {
                    const result = await axios.post(`${API_BASE_URL}/societies`, society);
                    console.log(`✅ Added: ${society.name} (ID: ${result.data.id})`);
                } catch (error) {
                    console.error(`❌ Failed to add ${society.name}:`, error.response?.data || error.message);
                }
            } else {
                console.log(`⏭️  Skipped: ${society.name} (already exists)`);
            }
        }

        console.log('\n✅ Society addition completed!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// Run the function
addSocieties();

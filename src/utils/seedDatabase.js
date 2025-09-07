// Database Seeder Script for IEEE Vardhaman Backend
// This script will populate your database with sample societies and councils data

const API_BASE_URL = 'http://localhost:8081/api';

// Sample Society Data
const sampleSocieties = [
  {
    id: 'ieee-hkn-society',
    name: 'IEEE HKN Society',
    image: 'https://hkn.ieee.org/wp-content/uploads/2017/07/HKN_Logo.jpg',
    description: 'The HKN Society is dedicated to recognizing excellence in the IEEE fields of interest.',
    vision: 'To be a pioneering IEEE-HKN chapter that exemplifies leadership in engineering education by promoting academic excellence, ethical conduct, and purposeful innovation.',
    mission: 'To recognize and celebrate academic merit, professional promise, and leadership potential among engineering students.',
    objectives: 'To recognize and honor academic excellence, leadership potential, and exemplary character among students.',
    type: 'society',
    entityId: 'ieee-hkn-society',
    stats: { members: 120, events: 8, awards: 2 }
  },
  {
    id: 'ieee-circuits-and-systems-society',
    name: 'IEEE Circuits and Systems Society',
    image: 'https://www.ieee.org/sites/default/files/styles/16_9_637x359/public/dam/zpwysb2oyk/ieee-circuits-and-systems-society-cas.jpg.jpeg?itok=InYIId57',
    description: 'Advances the theory, analysis, design, practical implementation, and application of circuits.',
    vision: 'To be the leading global community for circuits and systems professionals.',
    mission: 'To promote the advancement of circuits and systems theory, design, and implementation.',
    objectives: 'To advance circuit theory and systems design through research and education.',
    type: 'society',
    entityId: 'ieee-circuits-and-systems-society',
    stats: { members: 85, events: 12, awards: 3 }
  }
];

// Sample Council Data
const sampleCouncils = [
  {
    id: 'ieee-student-council',
    name: 'IEEE Student Council',
    image: 'https://www.ieee.org/content/dam/ieee-org/ieee/web/org/about/ieee_logo_1200x630.png',
    description: 'The IEEE Student Council coordinates activities across all IEEE student branches.',
    vision: 'To foster excellence in IEEE student activities and professional development.',
    mission: 'To coordinate and support IEEE student branches in their technical and professional activities.',
    objectives: 'To provide leadership and coordination for IEEE student activities.',
    type: 'council',
    entityId: 'ieee-student-council',
    stats: { members: 50, events: 6, awards: 1 }
  }
];

// Sample Members for IEEE HKN Society
const sampleMembers = [
  {
    name: 'Ms. Thanmai Gadagamma',
    role: 'Chair',
    email: 'thanmai.g@ieee.vardhaman.edu',
    photo: 'https://res.cloudinary.com/dmdiia2yv/image/upload/v1753345965/thanmai2_g5za1q.jpg',
    bio: 'Passionate about promoting academic excellence in engineering education.'
  },
  {
    name: 'Dr. Emily Brown',
    role: 'Advisor',
    email: 'emily.brown@ieee.vardhaman.edu',
    photo: 'https://randomuser.me/api/portraits/women/42.jpg',
    bio: 'Faculty advisor with expertise in electrical engineering and student mentorship.'
  },
  {
    name: 'V. Hrushikesh Patel',
    role: 'Secretary',
    email: 'hrushikesh.p@ieee.vardhaman.edu',
    photo: 'https://res.cloudinary.com/dmdiia2yv/image/upload/v1753351223/shivani_mtts_s7qav3.jpg',
    bio: 'Dedicated to maintaining excellent documentation and communication.'
  }
];

// Sample Events
const samplePastEvents = [
  {
    title: 'HKN Induction Ceremony 2023',
    date: '2023-11-15',
    time: '10:00 AM',
    location: 'Main Auditorium, VCE',
    description: 'Annual induction ceremony for new HKN members, recognizing academic excellence.',
    organizer: 'IEEE HKN Society',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
  },
  {
    title: 'Circuit Design Workshop',
    date: '2023-09-20',
    time: '2:00 PM',
    location: 'Electronics Lab, Block C',
    description: 'Hands-on workshop on advanced circuit design techniques.',
    organizer: 'IEEE HKN Society',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
  }
];

const sampleUpcomingEvents = [
  {
    title: 'Professional Development Workshop',
    date: '2025-10-15',
    time: '9:00 AM',
    location: 'Conference Hall, VCE',
    description: 'Workshop focusing on professional skills development for engineering students.',
    organizer: 'IEEE HKN Society',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
  },
  {
    title: 'IEEE Student Paper Competition',
    date: '2025-11-20',
    time: '10:00 AM',
    location: 'Seminar Hall, Block B',
    description: 'Annual student paper presentation competition.',
    organizer: 'IEEE HKN Society',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
  }
];

// Sample Achievements
const sampleAchievements = [
  {
    title: 'Outstanding Chapter Award 2024',
    year: 2024,
    category: 'Chapter Excellence',
    awardedBy: 'IEEE Headquarters',
    recipient: 'IEEE HKN Society - VCE',
    description: 'Recognized for outstanding chapter activities and member engagement throughout 2024.',
    date: '2024-12-01',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
  },
  {
    title: 'Best Student Chapter - Regional Level',
    year: 2023,
    category: 'Regional Recognition',
    awardedBy: 'IEEE Region 10',
    recipient: 'IEEE HKN Society - VCE',
    description: 'Best performing student chapter in the South Asia region.',
    date: '2023-08-15',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
  }
];

// Sample Gallery Items
const sampleGalleryItems = [
  {
    img: 'https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg',
    caption: 'HKN Induction Ceremony 2023',
    event: 'Annual Induction',
    date: '2023-11-15',
    description: 'New members being inducted into the IEEE HKN Society.'
  },
  {
    img: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg',
    caption: 'Community Service Project',
    event: 'Community Outreach',
    date: '2023-08-10',
    description: 'HKN members participating in local community service initiatives.'
  }
];

// Sample User Accounts
const sampleUsers = [
  {
    email: 'hkn@ieee.vardhaman.edu',
    password: 'hkn123',
    type: 'society',
    entityId: 'ieee-hkn-society',
    name: 'IEEE HKN Society Admin',
    role: 'society_admin'
  },
  {
    email: 'circuits@ieee.vardhaman.edu',
    password: 'circuits123',
    type: 'society',
    entityId: 'ieee-circuits-and-systems-society',
    name: 'IEEE Circuits Society Admin',
    role: 'society_admin'
  },
  {
    email: 'council@ieee.vardhaman.edu',
    password: 'council123',
    type: 'council',
    entityId: 'ieee-student-council',
    name: 'IEEE Student Council Admin',
    role: 'council_admin'
  }
];

// Utility function to make API calls
async function apiCall(endpoint, method = 'GET', data = null, token = null) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }
    
    return result;
  } catch (error) {
    throw error;
  }
}

// Main seeding function
async function seedDatabase() {

  try {
    // Step 1: Create user accounts first
    const createdUsers = [];
    
    for (const user of sampleUsers) {
      try {
        const result = await apiCall('/auth/register', 'POST', user);
        createdUsers.push(result);
      } catch (error) {
      }
    }

    // Step 2: Login as HKN society admin to get token
    const hknLogin = await apiCall('/auth/login', 'POST', {
      email: 'hkn@ieee.vardhaman.edu',
      password: 'hkn123'
    });
    
    const hknToken = hknLogin.token;

    // Step 3: Create society data
    const hknSociety = sampleSocieties[0];
    
    try {
      const societyResult = await apiCall('/society-dashboard/society', 'POST', hknSociety, hknToken);
    } catch (error) {
    }

    // Step 4: Add members to HKN Society
    for (const member of sampleMembers) {
      try {
        await apiCall(`/society-dashboard/society/${hknSociety.entityId}/members`, 'POST', member, hknToken);
      } catch (error) {
      }
    }

    // Step 5: Add past events
    for (const event of samplePastEvents) {
      try {
        await apiCall(`/society-dashboard/society/${hknSociety.entityId}/events/past`, 'POST', event, hknToken);
      } catch (error) {
      }
    }

    // Step 6: Add upcoming events
    for (const event of sampleUpcomingEvents) {
      try {
        await apiCall(`/society-dashboard/society/${hknSociety.entityId}/events/upcoming`, 'POST', event, hknToken);
      } catch (error) {
      }
    }

    // Step 7: Add achievements
    for (const achievement of sampleAchievements) {
      try {
        await apiCall(`/society-dashboard/society/${hknSociety.entityId}/achievements`, 'POST', achievement, hknToken);
      } catch (error) {
      }
    }

    // Step 8: Add gallery items
    for (const item of sampleGalleryItems) {
      try {
        await apiCall(`/society-dashboard/society/${hknSociety.entityId}/gallery`, 'POST', item, hknToken);
      } catch (error) {
      }
    }


  } catch (error) {
  }
}

// Export for use in Node.js or run directly in browser
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  global.fetch = fetch;
  seedDatabase();
} else {
  // Browser environment
  window.seedDatabase = seedDatabase;
}

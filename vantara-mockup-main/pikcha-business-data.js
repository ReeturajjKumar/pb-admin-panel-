// Realistic Photo Booth Business Data Generator

// Customer names for Indian market
const customerNames = [
    'Priya Sharma', 'Rahul Patel', 'Anita Desai', 'Vikram Singh', 'Neha Gupta',
    'Arjun Mehta', 'Kavita Reddy', 'Rohit Kumar', 'Pooja Nair', 'Amit Verma',
    'Sneha Joshi', 'Karan Malhotra', 'Divya Kapoor', 'Raj Thakur', 'Meera Iyer'
];

// Popular photo booth templates
const templates = {
    faceSwap: {
        bollywood: ['Shah Rukh Khan', 'Deepika Padukone', 'Amitabh Bachchan', 'Alia Bhatt', 'Ranveer Singh', 'Priyanka Chopra'],
        cricket: ['Virat Kohli', 'MS Dhoni', 'Sachin Tendulkar', 'Rohit Sharma'],
        historical: ['Mahatma Gandhi', 'Shivaji Maharaj', 'APJ Abdul Kalam', 'Rani Lakshmibai'],
        hollywood: ['Tom Cruise', 'Angelina Jolie', 'Brad Pitt', 'Scarlett Johansson']
    },
    effects: [
        'Underwater World', 'Space Adventure', 'Vintage Bollywood', 'Royal Palace',
        'Holi Festival', 'Mumbai Monsoon', 'Desert Safari', 'Snow Princess',
        'Neon Lights', 'Comic Book Style', 'Oil Painting', 'Fairy Tale'
    ],
    frames: [
        'Wedding Elegance', 'Birthday Bash', 'Anniversary Gold', 'Festival Special',
        'Corporate Event', 'Kids Party', 'Romantic Hearts', 'Floral Paradise'
    ]
};

// Generate realistic session data
function generateSessionData() {
    const sessionTypes = [
        { type: 'Face Swap', category: 'bollywood', weight: 40 },
        { type: 'Face Swap', category: 'cricket', weight: 20 },
        { type: 'Face Swap', category: 'historical', weight: 10 },
        { type: 'Face Swap', category: 'hollywood', weight: 15 },
        { type: 'AI Effect', category: 'effects', weight: 15 }
    ];
    
    const selectedType = weightedRandom(sessionTypes);
    let template = '';
    
    if (selectedType.type === 'Face Swap') {
        template = randomChoice(templates.faceSwap[selectedType.category]);
    } else {
        template = randomChoice(templates.effects);
    }
    
    return {
        customer: randomChoice(customerNames),
        type: selectedType.type,
        template: template,
        sessionTime: Math.floor(Math.random() * 180) + 120, // 2-5 minutes
        photos: Math.floor(Math.random() * 3) + 1, // 1-3 photos
        revenue: 125 // ₹125 per credit
    };
}

// Weighted random selection
function weightedRandom(items) {
    const weights = items.map(item => item.weight);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return items[i];
        }
    }
    return items[items.length - 1];
}

// Random choice from array
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Generate hourly traffic pattern (realistic for mall location)
function generateHourlyTraffic() {
    const hourlyPattern = {
        '9AM': Math.floor(Math.random() * 3) + 1,
        '10AM': Math.floor(Math.random() * 5) + 3,
        '11AM': Math.floor(Math.random() * 8) + 8,
        '12PM': Math.floor(Math.random() * 10) + 12,
        '1PM': Math.floor(Math.random() * 12) + 18,  // Lunch rush
        '2PM': Math.floor(Math.random() * 15) + 22,  // Peak
        '3PM': Math.floor(Math.random() * 15) + 25,  // Peak
        '4PM': Math.floor(Math.random() * 10) + 15,
        '5PM': Math.floor(Math.random() * 8) + 12,
        '6PM': Math.floor(Math.random() * 6) + 8,
        '7PM': Math.floor(Math.random() * 5) + 10,  // Evening crowd
        '8PM': Math.floor(Math.random() * 4) + 5,
        '9PM': Math.floor(Math.random() * 3) + 2
    };
    return hourlyPattern;
}

// Generate daily revenue data
function generateDailyRevenue(days = 30) {
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Weekend boost
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const basePhotos = isWeekend ? 120 : 80;
        const variance = Math.floor(Math.random() * 40) - 20;
        const photos = basePhotos + variance;
        
        data.push({
            date: date.toLocaleDateString('en-IN'),
            photos: photos,
            revenue: photos * 125,
            dayName: date.toLocaleDateString('en-IN', { weekday: 'short' })
        });
    }
    
    return data;
}

// Generate invoice data
function generateInvoices() {
    const invoices = [
        {
            id: 'INV-2024-1215',
            date: '15 Dec 2024',
            description: 'Professional Package - 1,500 Credits',
            amount: 187500,
            status: 'paid',
            gst: 33750,
            total: 221250
        },
        {
            id: 'INV-2024-1128',
            date: '28 Nov 2024',
            description: 'Starter Package - 750 Credits',
            amount: 112500,
            status: 'paid',
            gst: 20250,
            total: 132750
        },
        {
            id: 'INV-2024-1015',
            date: '15 Oct 2024',
            description: 'Professional Package - 1,500 Credits',
            amount: 187500,
            status: 'paid',
            gst: 33750,
            total: 221250
        },
        {
            id: 'INV-2024-0912',
            date: '12 Sep 2024',
            description: 'Enterprise Package - 3,000 Credits',
            amount: 297000,
            status: 'paid',
            gst: 53460,
            total: 350460
        }
    ];
    return invoices;
}

// Generate customer feedback
function generateFeedback() {
    const feedback = [
        { rating: 5, comment: "Amazing experience! Kids loved the superhero face swaps!", name: "Priya S." },
        { rating: 5, comment: "Perfect for our wedding reception. Guests had so much fun!", name: "Rahul & Neha" },
        { rating: 4, comment: "Great quality photos. Would love more Bollywood options.", name: "Amit V." },
        { rating: 5, comment: "The underwater effect was stunning! Will definitely come back.", name: "Kavita R." },
        { rating: 5, comment: "Best photo booth in the mall. Very user-friendly.", name: "Arjun M." }
    ];
    return feedback;
}

// Generate real-time activity feed
function generateActivityFeed(count = 10) {
    const activities = [];
    let timeOffset = 0;
    
    for (let i = 0; i < count; i++) {
        const session = generateSessionData();
        timeOffset += Math.floor(Math.random() * 5) + 2; // 2-7 minutes between sessions
        
        activities.push({
            id: 4590 - i,
            time: timeOffset === 0 ? 'Now' : `${timeOffset} min ago`,
            customer: session.customer,
            type: session.type,
            template: session.template,
            duration: `${Math.floor(session.sessionTime / 60)}m ${session.sessionTime % 60}s`,
            status: timeOffset === 0 ? 'in-progress' : 'completed',
            photos: session.photos
        });
    }
    
    return activities;
}

// Calculate business metrics
function calculateMetrics() {
    const dailyData = generateDailyRevenue(30);
    const todayRevenue = dailyData[dailyData.length - 1].revenue;
    const yesterdayRevenue = dailyData[dailyData.length - 2].revenue;
    const monthTotal = dailyData.reduce((sum, day) => sum + day.revenue, 0);
    const monthPhotos = dailyData.reduce((sum, day) => sum + day.photos, 0);
    
    return {
        today: {
            revenue: todayRevenue,
            photos: dailyData[dailyData.length - 1].photos,
            change: Math.round(((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100)
        },
        month: {
            revenue: monthTotal,
            photos: monthPhotos,
            avgPerPhoto: Math.round(monthTotal / monthPhotos),
            avgDaily: Math.round(monthTotal / 30)
        },
        credits: {
            balance: 2450,
            used: monthPhotos,
            remaining: 2450 - monthPhotos,
            daysLeft: Math.floor((2450 - monthPhotos) / (monthPhotos / 30))
        }
    };
}

// Export functions for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateSessionData,
        generateHourlyTraffic,
        generateDailyRevenue,
        generateInvoices,
        generateFeedback,
        generateActivityFeed,
        calculateMetrics
    };
}
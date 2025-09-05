// Events data
const eventsData = [
	{
		id: "1",
		title: "Hackathon",
		description:
			"Dive into a fast-paced hackathon: team up, innovate, and showcase your solutions in a thrilling, time-limited challenge.",
		image: "img1",
		formLink: "https://forms.gle/75fwPcQDXLBmqUFp6",
		category: "past",
		price: {
			pool: "15k cash",
			first: "10,000",
			second: "5,000",
		},
		entryFees: "Rs 100/- per member",
		memberCount: "Min 3 and Max 5 members",
		date: "23/08/2024",
		time: "2:00 PM - 5:00 PM IST",
		location: "IT Echo Labs, Conference Room B",
		requirements: [
			"Laptop with VS Code installed",
			"Basic knowledge of Python",
		],
		about:
			"Join us for a three-night descent into madness.",
		organizers: [
			{
				name: "Rehan Khan",
				email: "info.rehan@gmail.com",
				phone: "+91 8208948815",
			},
			{
				name: "Hitanshu Dadhich",
				email: "info.hitanshu@gmail.com",
				phone: "+91 8949122605",
			},
		],
		coOrganizers: [
			{
				name: "Rohan Bendale",
				email: "info.rohan@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
			{
				name: "Yash Shelke",
				email: "info.yash@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
		],
	},
	{
		id: "2",
		title: "Fix-a-thon",
		description:
			"Join the Fixathon and solve intricate problems individually. Challenge yourself and refine your skills.",
		image: "img2",
		formLink: "https://forms.gle/cd237k3iLPuK2r9g6",
		category: "past",
		price: {
			pool: "1.5k",
			first: "1,000",
			second: "500",
		},
		entryFees: "70/-",
		memberCount: "individual",
		date: "24/08/2024",
		time: "2:00 PM - 5:00 PM IST",
		location: "IT Echo Labs, Conference Room B",
		requirements: [
			"Laptop with VS Code installed",
			"Basic knowledge of Python",
		],
		about:
			"Enter the chamber of debugging horrors. This individual challenge will test your ability to exorcise bugs from cursed code. Face the demons of syntax errors, logic failures, and runtime exceptions as you battle through increasingly complex problems.\n\nChallenges include:\n• Debugging haunted algorithms\n• Fixing broken web applications\n• Resolving database corruption\n• Optimizing possessed code\n• Eliminating memory leaks from the underworld\n\nOnly the bravest souls dare to venture into this realm alone. Will you emerge victorious, or will the bugs consume your sanity?",
		organizers: [
			{
				name: "Abhishek Bhoyar",
				email: "info.abhishek@gmail.com",
				phone: "+91 7709869270",
			},
			{
				name: "Sahil Ninawe",
				email: "info.sahil@gmail.com",
				phone: "+91 8767993086",
			},
		],
		coOrganizers: [
			{
				name: "Somesh Sharma",
				email: "info.somesh@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
			{
				name: "Sanchit Yelne",
				email: "info.sanchit@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
		],
	},
	{
		id: "3",
		title: "Web Design Jam",
		description:
			"Show off your web design skills in the Web Design Jam. Create a stunning website in limited time!",
		image: "img15",
		formLink:
			"https://docs.google.com/forms/d/e/1FAIpQLScdhwlfNe5nkO3SCk5I9OsiwBQd_M4ICZiRunDpv0SYx4D2Ww/viewform",
		category: "past",
		price: {
			pool: "1k",
			first: "1,000",
			second: "NA",
		},
		entryFees: "70/- ",
		memberCount: "individual",
		date: "24/08/2024",
		time: "2:00 PM - 5:00 PM IST",
		location: "IT Echo Labs, Conference Room B",
		requirements: [
			"Laptop with VS Code installed",
			"Basic knowledge of Python",
		],
		about:
			"Craft digital nightmares that haunt users' dreams. This design challenge pushes you to create visually striking websites that blur the line between beauty and terror. Your canvas awaits the darkest corners of your imagination.\n\nDesign elements:\n• Gothic typography and cursed fonts\n• Eerie color schemes and shadow play\n• Interactive elements that respond to fear\n• Responsive layouts that adapt like shapeshifters\n• Animations that breathe life into the undead\n\nChannel your inner digital necromancer and create websites that leave visitors both mesmerized and terrified.",
		organizers: [
			{
				name: "Pralendra Behera",
				email: "info.pralendra@gmail.com",
				phone: "+91 9322560971",
			},
			{
				name: "Abdul Aziz Aman",
				email: "info.abdul@gmail.com",
				phone: "+91 8600073906",
			},
		],
		coOrganizers: [
			{
				name: "Shruti Kathale",
				email: "info.shruti@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
			{
				name: "Kusum Hari",
				email: "info.kusum@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
		],
	},
	{
		id: "4",
		title: "Code Carnival",
		description:
			"A fun and friendly coding competition for all skill levels. Solve puzzles and win prizes!",
		image: "img4",
		formLink: "https://forms.gle/xyz123abc456def789",
		category: "upcoming",
		price: {
			pool: "12k",
			first: "8,000",
			second: "4,000",
		},
		entryFees: "Rs 80/- per person",
		memberCount: "individual",
		date: "10/09/2025",
		time: "10:00 AM - 1:00 PM IST",
		location: "IT Echo Labs, Classroom C",
		requirements: ["Laptop with any IDE", "Basic knowledge of C++ or Java"],
		about:
			"Welcome to the most twisted carnival of code! Behind the cheerful facade lurks algorithmic horrors waiting to test your programming prowess. Each challenge is a ride through computational nightmares.\n\nCarnival attractions:\n• The Maze of Recursive Madness\n• Sorting Algorithms from Hell\n• The Haunted Data Structure House\n• Binary Search in the Dark\n• Graph Theory's Chamber of Horrors\n\nStep right up and face your coding fears. Will you emerge as the master of this cursed carnival, or become another lost soul in the algorithmic abyss?",
		organizers: [
			{
				name: "Priya Sharma",
				email: "priya.sharma@gmail.com",
				phone: "+91 9876543210",
			},
			{
				name: "Arjun Kumar",
				email: "arjun.kumar@gmail.com",
				phone: "+91 9876543211",
			},
		],
		coOrganizers: [
			{
				name: "Neha Singh",
				email: "neha.singh@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
			{
				name: "Vikram Patel",
				email: "vikram.patel@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
		],
	},
	{
		id: "5",
		title: "AI & ML Workshop",
		description:
			"Learn the fundamentals of Artificial Intelligence and Machine Learning in this hands-on workshop.",
		image: "img5",
		formLink: "https://forms.gle/ghi789jkl012mno345",
		category: "upcoming",
		price: {
			pool: "NA",
			first: "NA",
			second: "NA",
		},
		entryFees: "Rs 150/- per person",
		memberCount: "individual",
		date: "15/09/2025",
		time: "1:00 PM - 4:00 PM IST",
		location: "IT Echo Labs, Conference Room B",
		requirements: ["Laptop with Python and Jupyter Notebook installed"],
		about:
			"Venture into the forbidden realm of artificial consciousness. This workshop teaches you to breathe digital life into machines, creating entities that think, learn, and perhaps... dream of electric nightmares.\n\nDark arts you'll master:\n• Neural networks that mimic brain patterns\n• Machine learning algorithms that evolve\n• Deep learning architectures from the abyss\n• Training models with supernatural datasets\n• Unleashing AI predictions upon the world\n\nBeware: once you create artificial minds, you can never truly control what they might become. Are you prepared for the responsibility of digital creation?",
		organizers: [
			{
				name: "Dr. Anjali Gupta",
				email: "anjali.gupta@gmail.com",
				phone: "+91 9998887776",
			},
			{
				name: "Siddharth Rao",
				email: "siddharth.rao@gmail.com",
				phone: "+91 9998887775",
			},
		],
		coOrganizers: [
			{
				name: "Meera Joshi",
				email: "meera.joshi@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
			{
				name: "Rahul Verma",
				email: "rahul.verma@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
		],
	},
	{
		id: "6",
		title: "UI/UX Design Sprint",
		description:
			"Design a user-friendly interface from scratch in a limited time and present your final prototype.",
		image: "img6",
		formLink: "https://forms.gle/pqrstuvwxyza123456",
		category: "upcoming",
		price: {
			pool: "10k",
			first: "7,000",
			second: "3,000",
		},
		entryFees: "Rs 120/- per team",
		memberCount: "Min 2 and Max 4 members",
		date: "20/09/2025",
		time: "11:00 AM - 3:00 PM IST",
		location: "IT Echo Labs, Collaborative Space",
		requirements: [
			"Laptop with Figma or Adobe XD installed",
			"Basic knowledge of UI/UX principles",
		],
		about:
			"Craft user experiences that possess and haunt their users. This design sprint challenges teams to create interfaces so intuitive and engaging that users become eternally bound to your creation.\n\nDesign incantations:\n• User research through séances and surveys\n• Wireframing with spectral precision\n• Prototyping that breathes with life\n• Usability testing in haunted environments\n• Creating addictive interaction patterns\n\nWork in covens of 2-4 designers to summon the perfect user experience. Your prototype must not only function flawlessly but also capture souls through exceptional design.",
		organizers: [
			{
				name: "Divya Choudhary",
				email: "divya.choudhary@gmail.com",
				phone: "+91 9876543321",
			},
			{
				name: "Karan Malhotra",
				email: "karan.malhotra@gmail.com",
				phone: "+91 9876543322",
			},
		],
		coOrganizers: [
			{
				name: "Simran Kaur",
				email: "simran.kaur@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
			{
				name: "Gaurav Singh",
				email: "gaurav.singh@gmail.com",
				phone: "+91 XXXXX XXXXX",
			},
		],
	},
];

export default eventsData;
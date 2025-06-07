  // Mock data - replace with real API calls
export const mockExperts = [
    {
      id: 1,
      name: "Dr. Adaora Okafor",
      specialty: "Dermatology & Cosmetic Surgery",
      rating: 4.9,
      reviews: 234,
      experience: "15 years",
      location: "Lagos, Nigeria",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      bio: "Specialized in treating African skin conditions with focus on hyperpigmentation and acne management.",
      languages: ["English", "Igbo", "Yoruba"],
      availability: {
        video: true,
        chat: true,
        price: {
          video: 15000,
          chat: 8000
        }
      },
      nextAvailable: "Today 2:00 PM"
    },
    {
      id: 2,
      name: "Dr. Kemi Adebayo",
      specialty: "Pediatric Dermatology",
      rating: 4.8,
      reviews: 189,
      experience: "12 years",
      location: "Abuja, Nigeria",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      bio: "Expert in treating skin conditions in children and adolescents, including eczema and sensitive skin.",
      languages: ["English", "Hausa"],
      availability: {
        video: true,
        chat: true,
        price: {
          video: 12000,
          chat: 6000
        }
      },
      nextAvailable: "Tomorrow 10:00 AM"
    },
    {
      id: 3,
      name: "Dr. Ibrahim Yusuf",
      specialty: "Medical Dermatology",
      rating: 4.7,
      reviews: 156,
      experience: "10 years",
      location: "Kano, Nigeria",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      bio: "Focuses on medical dermatology with expertise in skin cancer prevention and treatment.",
      languages: ["English", "Hausa", "Arabic"],
      availability: {
        video: true,
        chat: true,
        price: {
          video: 10000,
          chat: 5000
        }
      },
      nextAvailable: "Today 4:30 PM"
    }
  ];

  export const consultationExtras = [
    {
      id: 'followup',
      name: 'Follow-up Session (30 min)',
      description: 'Schedule a follow-up consultation within 2 weeks',
      price: 5000,
      popular: true
    },
    {
      id: 'skincare-plan',
      name: 'Personalized Skincare Plan',
      description: 'Detailed written skincare routine with product recommendations',
      price: 3000,
      popular: false
    },
    {
      id: 'progress-tracking',
      name: '30-Day Progress Tracking',
      description: 'Weekly check-ins and progress monitoring for a month',
      price: 8000,
      popular: true
    },
    {
      id: 'emergency-support',
      name: '24/7 Emergency Support',
      description: 'Priority access for urgent skin concerns for 30 days',
      price: 12000,
      popular: false
    }
  ];
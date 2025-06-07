  export const quizQuestions = [
    {
      id: 'skinType',
      question: 'What is your skin type?',
      options: [
        { value: 'oily', label: 'Oily - Shiny, large pores, prone to breakouts' },
        { value: 'dry', label: 'Dry - Tight, flaky, sometimes rough' },
        { value: 'combination', label: 'Combination - Oily T-zone, dry cheeks' },
        { value: 'sensitive', label: 'Sensitive - Easily irritated, reactive' },
        { value: 'normal', label: 'Normal - Balanced, few imperfections' }
      ]
    },
    {
      id: 'skinConcerns',
      question: 'What are your main skin concerns? (Select all that apply)',
      multiple: true,
      options: [
        { value: 'acne', label: 'Acne/Breakouts' },
        { value: 'dryness', label: 'Dryness/Dehydration' },
        { value: 'hyperpigmentation', label: 'Dark spots/Hyperpigmentation' },
        { value: 'aging', label: 'Fine lines/Aging' },
        { value: 'sensitivity', label: 'Sensitivity/Irritation' },
        { value: 'dullness', label: 'Dullness/Uneven texture' }
      ]
    },
    {
      id: 'currentRoutine',
      question: 'How would you describe your current skincare routine?',
      options: [
        { value: 'minimal', label: 'Minimal - Just cleanser or soap' },
        { value: 'basic', label: 'Basic - Cleanser and moisturizer' },
        { value: 'moderate', label: 'Moderate - 3-5 products' },
        { value: 'extensive', label: 'Extensive - 6+ products' },
        { value: 'none', label: 'No routine currently' }
      ]
    },
    {
      id: 'budget',
      question: 'What is your monthly skincare budget?',
      options: [
        { value: 'low', label: '₦5,000 - ₦15,000' },
        { value: 'medium', label: '₦15,000 - ₦35,000' },
        { value: 'high', label: '₦35,000 - ₦60,000' },
        { value: 'premium', label: '₦60,000+' }
      ]
    },
    {
      id: 'climate',
      question: 'Which best describes your local climate?',
      options: [
        { value: 'tropical-humid', label: 'Tropical Humid - High humidity, frequent rain' },
        { value: 'tropical-dry', label: 'Tropical Dry - Hot, low humidity' },
        { value: 'coastal', label: 'Coastal - Moderate, sea breeze' },
        { value: 'urban-polluted', label: 'Urban - High pollution, AC environments' }
      ]
    }
  ];

  export const mockResults = {
      hydration: {
        score: Math.floor(Math.random() * 40) + 30, // 30-70
        level: ['Low', 'Moderate', 'Good'][Math.floor(Math.random() * 3)],
        description: 'Your skin shows signs of dehydration, particularly in the T-zone area.'
      },
      texture: {
        score: Math.floor(Math.random() * 30) + 60, // 60-90
        level: ['Rough', 'Moderate', 'Smooth'][Math.floor(Math.random() * 3)],
        description: 'Generally smooth texture with some minor irregularities.'
      },
      pigmentation: {
        score: Math.floor(Math.random() * 50) + 40, // 40-90
        level: ['High', 'Moderate', 'Low'][Math.floor(Math.random() * 3)],
        description: 'Some areas of hyperpigmentation detected, likely from sun exposure.'
      },
      sunDamage: {
        score: Math.floor(Math.random() * 60) + 20, // 20-80
        level: ['Minimal', 'Moderate', 'Significant'][Math.floor(Math.random() * 3)],
        description: 'Moderate sun damage with some photodamage visible.'
      }
    };
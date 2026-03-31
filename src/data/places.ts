
export interface Place {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  coordinatesLabel: string;
  image: any;
  description: string;
}

export const places: Place[] = [
  {
    id: 'place-1',
    name: 'Silicon Valley',
    location: 'USA',
    coordinates: { lat: 37.3875, lng: -122.0575 },
    coordinatesLabel: 'Coordinates: 37.3875, -122.0575',
    image: require('../assets/images/place_silicon_valley.png'),
    description: `Silicon Valley is one of the most influential technology regions in the world. It is not just a physical place but a center of innovation, learning, and digital culture. People from all over the world come here to exchange ideas, attend conferences, and participate in educational gatherings focused on technology and information awareness.

What makes this place important is not only the development of products but also the mindset. Discussions often focus on how people interact with information, how systems can be made safer, and how users can be protected from manipulation and misuse. Many workshops and events are dedicated to digital literacy, teaching individuals how to recognize risks and make informed decisions online.

The environment encourages questioning information instead of accepting it blindly. This culture helps people understand that not everything online is trustworthy. It builds habits of verification, analysis, and careful decision-making. Silicon Valley represents a space where awareness is considered as important as innovation, making it a key location for learning how to navigate the digital world safely.`,
  },
  {
    id: 'place-2',
    name: 'Berlin Tech Community',
    location: 'Germany',
    coordinates: { lat: 52.52, lng: 13.405 },
    coordinatesLabel: 'Coordinates: 52.5200, 13.4050',
    image: require('../assets/images/place_berlin.png'),
    description: `Berlin has become a major hub for technology communities and knowledge exchange in Europe. It is known for its open culture, where people share ideas, collaborate, and learn from each other. Many events, meetups, and conferences take place here, focusing on digital responsibility, privacy, and security.

The community emphasizes transparency and education. People gather not only to build products but also to discuss how those products affect users. Topics such as data protection, ethical technology use, and online safety are often central to these discussions.

Berlin encourages critical thinking. It promotes the idea that users should understand how systems work instead of just using them. This approach helps individuals recognize potential risks and avoid common mistakes in online environments.`,
  },
  {
    id: 'place-3',
    name: 'Tallinn e-Governance Hub',
    location: 'Estonia',
    coordinates: { lat: 59.437, lng: 24.7536 },
    coordinatesLabel: 'Coordinates: 59.4370, 24.7536',
    image: require('../assets/images/place_tallinn.png'),
    description: `Tallinn is known for its advanced digital infrastructure and strong focus on secure online systems. Estonia has built one of the most developed digital societies, where many services are available online. This makes awareness and security essential parts of everyday life.

The e-Governance Hub is a place where experts, students, and professionals gather to learn about digital systems and how to use them safely. Educational programs focus on understanding how data is managed, how identity is protected, and how users can avoid risks.

This environment teaches responsibility. People learn that convenience must be balanced with caution. The system works effectively because users are informed and aware.`,
  },
  {
    id: 'place-4',
    name: 'Toronto Innovation District',
    location: 'Canada',
    coordinates: { lat: 43.6532, lng: -79.3832 },
    coordinatesLabel: 'Coordinates: 43.6532, -79.3832',
    image: require('../assets/images/place_toronto.png'),
    description: `Toronto's innovation district brings together education, research, and technology. It is a place where people attend workshops, seminars, and discussions about digital behavior and responsible use of information.

The focus here is on understanding how people interact with digital environments. Many programs are designed to improve awareness, helping individuals recognize patterns of manipulation and misinformation.

This place highlights the importance of education. It shows that awareness is not something automatic but something that needs to be developed and maintained over time.`,
  },
  {
    id: 'place-5',
    name: 'Tokyo Digital Learning Center',
    location: 'Japan',
    coordinates: { lat: 35.6895, lng: 139.6917 },
    coordinatesLabel: 'Coordinates: 35.6895, 139.6917',
    image: require('../assets/images/place_tokyo.png'),
    description: `Tokyo's learning centers focus on discipline, structure, and digital literacy. People gather here to improve their understanding of technology and safe online behavior.

The approach is systematic. Education programs emphasize step-by-step learning, helping individuals build strong habits when interacting with digital systems. Attention to detail and careful verification are key elements.

This environment teaches that safety comes from consistency. Small habits, repeated over time, create strong protection against risks.`,
  },
];
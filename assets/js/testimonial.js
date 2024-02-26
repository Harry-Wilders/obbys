// Testimonial

const testimonialsContainer = document.querySelector(".testimonial-container");
const testimonial = document.querySelector(".testimonial");
const username = document.querySelector(".username");
const role = document.querySelector(".role");

const testimonials = [
  {
    name: "Miyah Myles",
    position: "Environmental Champion",

    text: "Choosing Obby's Ventures was a no-brainer for my environmentally conscious event needs. From paperless green communications to zero waste initiatives, they prioritize sustainability. With recyclable carry-away boxes, biodegradable utensils, and a commitment to a plastic-free environment, Obby's Ventures leads the way in green event practices.",
  },
  {
    name: "June Cha",
    position: "Event Organizer",
    text: "I rely on Obby's Ventures for their state-of-the-art event technology. From audiovisual services to filming, live streaming, and editing, their world-class technical production services ensure my events are visually and aurally captivating. Trust Obby's Ventures for flawless execution – they never disappoint.",
  },
  {
    name: "Iida Niskanen",
    position: "Content Creator",

    text: "I was blown away by Obby's Ventures' ability to design and build custom stages and backdrops that perfectly complemented my event theme. Their creativity transformed the space into a captivating environment, enhancing the overall experience for me and my attendees. Obby's Ventures is my top choice for visually stunning setups.",
  },

  {
    name: "Jonathan Nunfiez",
    position: "Event Planner",

    text: "Obby's Ventures stands out in their commitment to sustainability. Their 'Go Green' initiative, minimizing the use of paper and prioritizing digital communication, reflects a forward-thinking approach. With a focus on zero waste and environmentally friendly practices, Obby's Ventures not only delivers exceptional events but does so with a conscience.",
  },
  {
    name: "Sasha Ho",
    position: "Tourist",

    text: "Obby's Ventures exceeded my expectations with their ground transportation services. The luxurious brands they offer ensured my comfort throughout the event. The onboard tracking, option of liaisons, guides, or security officers, and thoughtful touches like bottled water and snacks made the transportation experience seamless and enjoyable.",
  },
  {
    name: "Veeti Seppanen",
    position: "Journalist",

    text: "The media center and control section at Obby's Ventures is truly impressive. Equipped with cutting-edge technology, it ensures flawless execution during events. From audiovisual production to recording and editing services, their state-of-the-art studio is a hub for delivering high-quality content. Obby's Ventures sets the standard for virtual event production.",
  },
];

let idx = 1;

function updateTestimonials() {
  const { name, position, text } = testimonials[idx];

  testimonial.innerHTML = text;

  username.innerHTML = name;
  role.innerHTML = position;

  idx++;

  if (idx > testimonials.length - 1) {
    idx = 0;
  }
}

setInterval(updateTestimonials, 10000);

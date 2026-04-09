const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");
const CONTACT_URL = "https://keromi.co.za/pages/contact";
const INSTAGRAM = "https://www.instagram.com/keromispacesolutions";
const FACEBOOK = "https://www.facebook.com/people/Keromi-Space-Solutions/61583328787115/";
const TIKTOK = "https://www.tiktok.com/@keromispacesolutions";
const knowledgeBase = [

  // 🧠 ABOUT KEROMI
  {
    patterns: ["who are you", "about", "keromi", "company"],
    answer: "Keromi Space Solutions provides high-spec modular infrastructure across South Africa and the SADC region. We don’t just sell containers — we design fully functional, turnkey environments built for modern business."
  },

 {
    patterns: ["thank you", "thanks", "thnx", "bye"],
    answer: `Thank you for enquiring with Keromi Space Solutions! You can follow us on social media: <br><br><a href="${INSTAGRAM}" target="_blank" class="contact-link">Instagram</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href="${FACEBOOK}" target="_blank" class="contact-link">Facebook</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href="${TIKTOK}" target="_blank" class="contact-link">Tiktok</a>`
  },



  {
    patterns: ["experience", "years", "history", "legacy"],
    answer: "Keromi is backed by a strategic partnership with over 28 years of industry expertise, combining startup agility with proven reliability."
  },

  {
    patterns: ["why keromi", "why choose", "benefits"],
    answer: "We eliminate the delays and disruptions of traditional building. Our solutions are built off-site, deployed rapidly, and engineered for tough African conditions."
  },

  {
    patterns: ["where are you based", "location", "area", "where are you located", "address", "what's your address"],
    answer: "We are based in Johannesburg, our address is 623 Main Reef Road, Germiston. We serve clients across South Africa and the broader SADC region."
  },

  // 🏠 PARKHOMES
  {
    patterns: ["parkhome", "park home"],
    answer: "Our parkhomes are high-spec modular living spaces available in 6m, 12m, or custom sizes. They can be joined for larger layouts and include electrical, flooring, and full interior/exterior finishes."
  },

  {
    patterns: ["parkhome features", "parkhome include"],
    answer: "Standard parkhome features include windows with burglar bars, steel door, electrical package, vinyl flooring, full paint finish, and installation on concrete pads with screw jacks."
  },

  // 🏢 CONTAINER OFFICES
  {
    patterns: ["office", "container office"],
    answer: "Our container offices are professional, weather-resistant workspaces available in 6m, 12m, or custom layouts. They are ideal for construction sites, businesses, and remote operations."
  },

  // 🍔 TUCKSHOPS
  {
    patterns: ["tuckshop", "spaza", "food container", "shop"],
    answer: "Our container tuckshops are designed for fast food and retail businesses. They include a hydraulic serving hatch, counter, electrical setup, and durable finishes."
  },

  {
    patterns: ["tuckshop upgrades", "extras tuckshop"],
    answer: "Optional upgrades include shelving, plumbing, additional electrical points, air conditioning, extractor fans, insulation, and branding."
  },

  // 🛡️ GUARDHOUSES
  {
    patterns: ["guardhouse", "security"],
    answer: "Our guardhouses are secure, weather-resistant units ideal for estates, schools, and industrial sites. They provide excellent visibility and professional security presence."
  },

  // 📦 STORAGE
  {
    patterns: ["storage", "container storage"],
    answer: "Our storage containers are heavy-duty, weatherproof steel units suitable for households and businesses. Once purchased, they are yours permanently with no rental costs."
  },

  // 🚿 ABLUTION
  {
    patterns: ["ablution", "toilet", "toilets", "bathroom", "bathrooms"],
    answer: "Our ablution units are built for demanding environments like construction sites and mines, with plumbing, toilets, sinks, and electrical systems included."
  },

  // 🧩 CUSTOM SOLUTIONS
  {
    patterns: ["custom", "bespoke", "special", "different"],
    answer: "We offer fully custom modular solutions tailored to your needs, including offices, retail spaces, multi-unit setups, and site-specific builds."
  },

  // ⚙️ SERVICES
  {
    patterns: ["services", "what do you offer", "process"],
    answer: "We offer full turnkey services including manufacturing, electrical and plumbing, interior fit-out, delivery, and site placement."
  },

   // ⚙️ SIZES
  {
    patterns: ["sizes", "lengths", "width", "sizing", "space"],
    answer: "3 sizes of containers:\n3m (L) x 2.4m (W) x 2.6m (H)\n6m (L) x 2.4m (W) x 2.6m (H)\n12m (L) x 2.4m (W) x 2.6m (H)."
  },

  //Greeting
  {
    patterns: ["Hi", "Hello", "Good day"],
    answer: "Hi there! Welcome to Keromi Space Solutions. We are so happy to hear from you. How can we help?"
  },

  // 🚚 DELIVERY
  {
    patterns: ["delivery", "transport", "logistics"],
    answer: "We handle delivery and placement across South Africa. Costs depend on your location and unit type. Please contact us directly. "
  },

  // 💰 PRICING / SALES ENTRY
  {
    patterns: ["price", "cost", "quote", "how much"],
    answer: "Pricing depends on the unit type, size, and delivery location. I can help you with a quote — what are you looking for?"
  }

];

let chatState = {
  askedType: false,
  collectingLead: false
};

function getResponse(userInput) {
  const input = userInput.toLowerCase();

  let bestMatch = null;
  let highestScore = 0;

  knowledgeBase.forEach(item => {
    let score = 0;

    item.patterns.forEach(pattern => {
      if (input.includes(pattern)) score++;
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  });

  if (bestMatch) return bestMatch.answer;

  return "Hi there! Welcome to Keromi Space Solutions. We are so happy to hear from you. How can we help?";
}

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.innerHTML = text; // IMPORTANT (was innerText)
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleBot(userText) {
  const input = userText.toLowerCase();

  // 🎯 Quote / serious enquiry detection
  if (
    input.includes("quote") ||
    input.includes("Quote") ||
    input.includes("price") ||
    input.includes("Price") ||
    input.includes("how much") ||
    input.includes("How much") ||
    input.includes("cost") ||
    input.includes("Cost") ||
    input.includes("costing") ||
    input.includes("contact") ||
    input.includes("speak to someone") ||
    input.includes("speak") ||
    input.includes("consultant")
  ) {
    return `I can definitely assist with that 👌  
For detailed enquiries and quotes, please submit your requirements here:<br><br>
<a href="${CONTACT_URL}" target="_blank" class="contact-link">Contact Us</a>`;
  }

  // fallback to knowledge base
  return getResponse(userText);
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");

  setTimeout(() => {
    const reply = handleBot(text);
    addMessage(reply, "bot");
  }, 400);

  input.value = "";
}

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});